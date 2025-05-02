import Express from 'express';
import { getUserById, createUser, updateUser, deleteUser, getAllUsersAdmin, getUserByIdAdmin, toggleUserAccessAdmin } from '../controllers/user.controller.js';
import { userAuth } from '../middlewares/auth.js';

const userRouter = Express.Router();

userRouter.get("/id", userAuth, getUserById);

//  Admin routes

//  Create a new user from admin end
userRouter.post("/admin/create", createUser);

//  Update user details from admin end
userRouter.put("/admin/update/:id", updateUser);

//  allow or restrict user access 
userRouter.put("/access/:id", toggleUserAccessAdmin);

//  Delete user from admin end
userRouter.delete("/admin/delete/:id", deleteUser);

//  Get all users from admin end
userRouter.get("/admin/get/all", getAllUsersAdmin);

//  Get user by id from admin end
userRouter.get("/admin/get/:id", getUserByIdAdmin);


export default userRouter;