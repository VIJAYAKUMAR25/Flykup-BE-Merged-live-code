// controllers/loginLogs.controller.js
import LoginLog from '../models/loginlogs.model.js';
import User from '../models/user.model.js';

export const getLoginLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      os,
      browser,
      country,
      location,
      region,
      status,
      search
    } = req.query;

    // --- Filters for the LoginLog collection itself ---
    const initialMatch = {};
    if (os) initialMatch['os'] = os;
    if (browser) initialMatch['browser'] = browser;
    if (country) initialMatch.country = country;
    if (region) initialMatch.region = region;
    if (status) initialMatch.status = status;

    // --- Filters for the related User collection (after $lookup and $unwind) ---
    const userSearchMatch = {};
    if (search) {
      // Apply $or directly to the fields within the 'user' subdocument
      userSearchMatch.$or = [
        { 'user.userName': { $regex: search, $options: 'i' } },
        { 'user.emailId': { $regex: search, $options: 'i' } },
        { 'user.name': { $regex: search, $options: 'i' } },
        // Add more fields as needed
        { 'os': { $regex: search, $options: 'i' } },
        { 'browser': { $regex: search, $options: 'i' } },
        { 'country': { $regex: search, $options: 'i' } },
        { 'region': { $regex: search, $options: 'i' } },
        { 'status': { $regex: search, $options: 'i' } },
        { 'ip': { $regex: search, $options: 'i' } },

      ];
    }

    // --- Main Aggregation Pipeline for Fetching Data ---
    const logsPipeline = [
      { $match: initialMatch }, // Filter LoginLogs first
      {
        $lookup: {
          from: 'users', // Make sure 'users' is the correct collection name
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' }, // Unwind the user array (handle cases where user might not exist if needed)
      // Conditionally add the user search match stage
      ...(search ? [{ $match: userSearchMatch }] : []),
      {
         $project: { // Select the fields you need
           _id: 1, // Good practice to include _id unless explicitly excluding
           ip: 1,
           country: 1,
           region: 1,
           city: 1,
           location: 1,
           device: 1,
           browser: 1,
           os: 1,
           loginType: 1,
           status: 1,
           lastActivity: 1,
           time: 1,
           'user._id': 1,
           'user.userName': 1,
           'user.name': 1,
           'user.emailId': 1,
           'user.role': 1
         }
       },
      { $sort: { time: -1 } },
      { $skip: (parseInt(page) - 1) * parseInt(limit) },
      { $limit: parseInt(limit) }
    ];

    const logs = await LoginLog.aggregate(logsPipeline);

    // --- Aggregation Pipeline for Counting Total Matching Documents ---
    const countPipeline = [
      { $match: initialMatch },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      // Apply the same user search filter for counting
      ...(search ? [{ $match: userSearchMatch }] : []),
      { $count: "totalCount" } // Count the documents after all filters
    ];

    const countResult = await LoginLog.aggregate(countPipeline);
    const totalLogs = countResult.length > 0 ? countResult[0].totalCount : 0;

    return res.status(200).json({
      status: true,
      message: 'Login logs fetched successfully.',
      data: logs,
      pagination: {
        total: totalLogs,
        currentPage: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalLogs / parseInt(limit)) // Ensure limit is parsed here too
      }
    });
  } catch (error) {
    console.error('Error fetching login logs:', error);
    // Include more error details in logs if possible, but not necessarily in response
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};
