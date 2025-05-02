import User from "../../models/user.model.js";


export const verifiedUsersCount = async(req,res) =>{
    try {
      const usersCount = await User.find({role:'user'}).countDocuments();
      return res.status(200).json({status: true, message: 'verified users count fetched successfully!', data: usersCount || 0});
    } catch (error) {
      console.error("Error in verifiedUsersCount:", error.message);
      return res.status(500).json({status: false, message:'Internal server error.'})
    }
  }