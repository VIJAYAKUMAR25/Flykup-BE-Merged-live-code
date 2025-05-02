import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        role: { type: String, required: true, default: "admin" },
        email: { type: String, required: true, unique: true },
        mobileNumber: { type: String, required: true },
        password: { type: String, required: true },
        profilePicture: { type: String, default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" },

        contentAccess: {
            users: { readOnly: Boolean, edit: Boolean },
            pendingSellers: { readOnly: Boolean, edit: Boolean },
            sellers: { readOnly: Boolean, edit: Boolean },
            orders: { readOnly: Boolean, edit: Boolean },
            category: { readOnly: Boolean, edit: Boolean },
            // settings: { readOnly: Boolean, edit: Boolean },
            // admins: { readOnly: Boolean, edit: Boolean },
        },
        maskingSwitch: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
