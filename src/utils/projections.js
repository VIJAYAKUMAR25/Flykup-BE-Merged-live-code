

export const userProjection = {
    _id: 1,
    userName: { $ifNull: ["$userName", null] },
    name: { $ifNull: ["$name", null] },
    profileURL: { $ifNull: ["$profileURL.key", null] },
};


const sellerInfoProjectionPartForProducts = {
    sellerCompanyName: { $ifNull: ["$sellerDetails.companyName", null] },
    sellerUserName: { $ifNull: ["$userDetails.userName", null] },
    sellerProfileURL: { $ifNull: ["$userDetails.profileURL.key", null] },
};

export const productProjection = {
    _id: 1,
    title: { $ifNull: ["$title", null] },
    images: { $ifNull: ["$images", null]}, 
    productPrice: { $ifNull: ["$productPrice", null] },
    MRP: { $ifNull: ["$MRP", null] },
    sellerId: { $ifNull: ["$sellerId", null] }, 
    description: { $ifNull: ["$description", null] },
    category: { $ifNull: ["$category", null] },
    subCategory: { $ifNull: ["$subCategory", null] },
    tags: { $ifNull: ["$tags", null] },
    createdAt: { $ifNull: ["$createdAt", null] },
    ...sellerInfoProjectionPartForProducts,
};

export const videoProjection = {
    _id: 1,
    title: { $ifNull: ["$title", null] },
    thumbnailURL: { $ifNull: ["$thumbnailURL", null] },
        
thumbnailBlobName: { $ifNull: ["$thumbnailBlobName", null] },
    visibility: { $ifNull: ["$visibility", null] },
    createdAt: { $ifNull: ["$createdAt", null] },
    hlsMasterPlaylistUrl: { $ifNull: ["$hlsMasterPlaylistUrl", null] },
    // Include host identifier fields
    host: { $ifNull: ["$host", null] },
    hostModel: { $ifNull: ["$hostModel", null] },

    // --- Define final host/user fields using looked-up data ---
    sellerCompanyName: { // Represents the host's company/business name
        $ifNull: [ 
            { 
                $switch: {
                    branches: [
                        { case: { $eq: ["$hostModel", "sellers"] }, then: "$sellerHostDetails.companyName" },
                        { case: { $eq: ["$hostModel", "dropshippers"] }, then: "$shipperHostDetails.businessName" } // <<< Check field 'businessName'
                    ],
                    default: null // Default if hostModel is neither (or host details missing)
                }
            },
            null // Final fallback if expression is null/undefined
        ]
    },
    sellerUserName: { // Represents the host's user name
        $ifNull: ["$userDetails.userName", null]
    },
    sellerProfileURL: { // Represents the host's profile URL
        $ifNull: ["$userDetails.profileURL.key", null] 
    },

    // --- IMPORTANT: Keep intermediate fields needed above ---
    sellerHostDetails: 1,
    shipperHostDetails: 1,
    userDetails: 1,
};


export const showProjection = {
    _id: 1,
    title: { $ifNull: ["$title", null] },
    thumbnailImage: { $ifNull: ["$thumbnailImage", null] },
    previewVideo: { $ifNull: ["$previewVideo", null] },
    isLive: { $ifNull: ["$isLive", false] },
    showStatus: { $ifNull: ["$showStatus", null] },
    scheduledAt: { $ifNull: ["$scheduledAt", null] },
    liveDrop: { $ifNull: ["$liveDrop", false] }, 
    createdAt: { $ifNull: ["$createdAt", null] },
    // Include host identifier fields
    host: { $ifNull: ["$host", null] },
    hostModel: { $ifNull: ["$hostModel", null] },

    // --- Define final host/user fields using looked-up data ---
    sellerCompanyName: { // Represents the host's company/business name
        $ifNull: [
            {
                $switch: {
                    branches: [
                        { case: { $eq: ["$hostModel", "sellers"] }, then: "$sellerHostDetails.companyName" },
                        { case: { $eq: ["$hostModel", "dropshippers"] }, then: "$shipperHostDetails.businessName" } // <<< Check field 'businessName'
                    ],
                    default: null
                }
            },
            null
        ]
    },
    sellerUserName: { // Represents the host's user name
        $ifNull: ["$userDetails.userName", null]
    },
    sellerProfileURL: { // Represents the host's profile URL
        $ifNull: ["$userDetails.profileURL.key", null] 
    },

    // --- IMPORTANT: Keep intermediate fields needed above ---
    sellerHostDetails: 1,
    shipperHostDetails: 1,
    userDetails: 1,
};

export const createSearchRegex = (term) => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escapedTerm, 'i');
};



// Old code 


// export const videoProjection = {
//     _id: 1,
//     title: { $ifNull: ["$title", null] }, 
//     thumbnailURL: { $ifNull: ["$thumbnailURL", null] },
//     visibility: { $ifNull: ["$visibility", null] },
//     sellerId: { $ifNull: ["$sellerId", null] },
//     createdAt: { $ifNull: ["$createdAt", null] },
//     hlsMasterPlaylistUrl: { $ifNull: ["$hlsMasterPlaylistUrl", null] },
//      ...sellerInfoProjectionPart,

// };

// export const showProjection = {
//     _id: 1,
//     title: { $ifNull: ["$title", null] }, 
//     thumbnailImageURL: { $ifNull: ["$thumbnailImageURL", null] },
//     previewVideoURL: { $ifNull: ["$previewVideoURL", null] },
//     isLive: { $ifNull: ["$isLive", false] }, 
//     showStatus: { $ifNull: ["$showStatus", null] },
//     host: { $ifNull: ["$host", null] },
//     hostModel: { $ifNull: ["$hostModel", null] },
//     scheduledAt: { $ifNull: ["$scheduledAt", null] },
//     liveDrop: { $ifNull: ["$liveDrop", null] },
//     createdAt: { $ifNull: ["$createdAt", null] }, 
//      ...sellerInfoProjectionPart,
   
// };