import mongoose from 'mongoose';
import { createSearchRegex } from './projections.js';

const ObjectId = mongoose.Types.ObjectId;

// <<< Products & Users >>>
export const executePaginatedSearch = async (Model, searchTerm, page, limit, matchCriteria, sortCriteria, projection) => {
    const searchRegex = searchTerm && searchTerm.trim() ? createSearchRegex(searchTerm.trim()) : null;
    let specificMatch = {};

    if (searchRegex && matchCriteria.textSearchFields && matchCriteria.textSearchFields.length > 0) {
        specificMatch.$or = matchCriteria.textSearchFields.map(field => ({ [field]: searchRegex }));
    }
    const finalMatch = {
        ...matchCriteria.baseCriteria, 
        ...specificMatch             
    };

    const pipeline = [
        { $match: finalMatch },
        {
            $facet: {
                data: [
                    { $sort: sortCriteria },
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                    {
                        $lookup: {
                            from: 'sellers',
                            localField: 'sellerId',
                            foreignField: '_id',
                            as: 'sellerDetailsArr'
                        }
                    },
                    {
                
                        $addFields: {
                           sellerDetails: { $ifNull: [ { $first: '$sellerDetailsArr' }, null ] }
                        }
                    },
                    {
                        $lookup: {
                            from: 'users', 
                            localField: 'sellerDetails.userInfo', 
                            foreignField: '_id',
                            as: 'userDetailsArr'
                        }
                    },
                    {
                       $addFields: {
                           userDetails: { $ifNull: [ { $first: '$userDetailsArr' }, null ] }
                       }
                    },
                  
                    { $project: projection }, 
                    { $project: { sellerDetailsArr: 0, userDetailsArr: 0, sellerDetails: 0, userDetails: 0 } } // Optional cleanup
                ],
                totalCount: [
                    { $count: 'count' }
                ]
            }
        }
    ];

    try {
        const results = await Model.aggregate(pipeline);

        const data = results[0]?.data || [];
        const totalCount = results[0]?.totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalCount / limit);
        const hasMore = page < totalPages;

        return { data, totalCount, totalPages, hasMore };
    } catch (error) {
        console.error(`Aggregation error for ${Model.modelName}:`, error);
        throw error; 
    }
};

// <<<For Shows & Videos with Host Logic >>>
export const executePaginatedHostSearch = async (Model, searchTerm, page, limit, matchCriteria, sortCriteria, projection) => {
    // searchTerm is likely null if preliminary search was done, but keep capability
    const searchRegex = searchTerm && searchTerm.trim() ? createSearchRegex(searchTerm.trim()) : null;
    let specificMatch = {};

    if (searchRegex && matchCriteria.textSearchFields && matchCriteria.textSearchFields.length > 0) {
        specificMatch.$or = matchCriteria.textSearchFields.map(field => ({ [field]: searchRegex }));
    }
    const finalMatch = {
        ...matchCriteria.baseCriteria,
        ...specificMatch
    };

    const pipeline = [
        { $match: finalMatch },
        {
            $facet: {
                data: [
                    { $sort: sortCriteria },
                    { $skip: (page - 1) * limit },
                    { $limit: limit },

                    // --- Host-based Lookups START ---
                    // Lookup Seller Details if hostModel is 'sellers'
                     {
                        $lookup: {
                            from: 'sellers',
                            let: { hostId: "$host", modelType: "$hostModel" },
                            pipeline: [
                                { $match: { $expr: { $and: [ { $eq: [ "$_id", "$$hostId" ] }, { $eq: [ "$$modelType", "sellers" ] } ] } } },
                                { $limit: 1 },
                                { $project: { _id: 0, companyName: 1, userInfo: 1 } } // Project needed seller fields
                            ],
                            as: 'sellerHostDetailsArr'
                        }
                    },
                    { $addFields: { sellerHostDetails: { $ifNull: [ { $first: '$sellerHostDetailsArr' }, null ] } } },

                    // Lookup Dropshipper Details if hostModel is 'dropshippers'
                     {
                        $lookup: {
                            from: 'dropshippers', // <<< Verify collection name
                            let: { hostId: "$host", modelType: "$hostModel" },
                            pipeline: [
                                { $match: { $expr: { $and: [ { $eq: [ "$_id", "$$hostId" ] }, { $eq: [ "$$modelType", "dropshippers" ] } ] } } },
                                { $limit: 1 },
                                { $project: { _id: 0, businessName: 1, userInfo: 1 } } // <<< ASSUMPTION: fields 'businessName', 'userInfo'
                            ],
                            as: 'shipperHostDetailsArr'
                        }
                    },
                    { $addFields: { shipperHostDetails: { $ifNull: [ { $first: '$shipperHostDetailsArr' }, null ] } } },

                    // Determine the correct userInfo ID
                    {
                        $addFields: {
                            hostUserInfoId: {
                                $switch: {
                                    branches: [
                                        { case: { $eq: ["$hostModel", "sellers"] }, then: "$sellerHostDetails.userInfo" },
                                        { case: { $eq: ["$hostModel", "dropshippers"] }, then: "$shipperHostDetails.userInfo" } // <<< ASSUMPTION: userInfo field exists
                                    ],
                                    default: null
                                }
                            }
                        }
                    },
                    // Lookup User Details using the determined hostUserInfoId
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'hostUserInfoId',
                            foreignField: '_id',
                            pipeline: [
                                { $limit: 1 },
                                { $project: { _id: 0, userName: 1, profileURL: 1 } } // Project needed user fields
                            ],
                            as: 'userDetailsArr'
                        }
                    },
                    { $addFields: { userDetails: { $ifNull: [ { $first: '$userDetailsArr' }, null ] } } },
                    { $project: projection },
                ],
                totalCount: [
                    { $count: 'count' }
                ]
            }
        }
    ];

     try {
        const results = await Model.aggregate(pipeline);
        const data = results[0]?.data || [];
        const totalCount = results[0]?.totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalCount / limit);
        const hasMore = page < totalPages;

        // Manual cleanup AFTER projection runs, if the $project cleanup stage was removed/insufficient
        const finalData = data.map(item => {
             const newItem = { ...item };
             // Remove intermediate fields ONLY if they are not desired in the final output
             // The projection should have created the final fields (sellerCompanyName etc)
             delete newItem.sellerHostDetails;
             delete newItem.shipperHostDetails;
             delete newItem.userDetails;
             return newItem;
        });


        return { data: finalData, totalCount, totalPages, hasMore };

    } catch (error) {
        console.error(`Host Aggregation error for ${Model.modelName}:`, error);
        throw error;
    }
};