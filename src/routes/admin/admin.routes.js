import express from "express";
import { createAdmin, loginAdmin, getAdmins, updateAdmin, deleteAdmin } from "../../controllers/admin/admin.controller.js";

const adminPartnerRouter = express.Router();


adminPartnerRouter.post("/register", createAdmin);

adminPartnerRouter.post("/login", loginAdmin);

adminPartnerRouter.get("/", getAdmins);

adminPartnerRouter.put("/:id", updateAdmin);

adminPartnerRouter.delete("/:id", deleteAdmin);


export default adminPartnerRouter;