import Admin from "../../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createAdmin = async (req, res) => {
    try {
        const { name, email, mobileNumber, password, profilePicture, contentAccess } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            name,
            email,
            mobileNumber,
            password: hashedPassword,
            // profilePicture,
            contentAccess,
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: admin._id, role: admin.role, contentAccess: admin.contentAccess },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Remove password before sending the response
        const { password: _, ...adminData } = admin.toObject();

        res.json({ token, admin: adminData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = { ...req.body };

        // Remove profilePicture from the payload
        delete updatedData.profilePicture;

        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        } else {
            delete updatedData.password;
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (admin.role === "superAdmin") {
            return res.status(403).json({ message: "Cannot delete a super admin" });
        }

        await Admin.findByIdAndDelete(id);
        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
