import mongoose from 'mongoose';

const loginLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    ip: { type: String, required: true },
    country: String,
    region: String,
    city: String,
    location: String,
    device: Object,
    browser: Object,
    os: Object,
    loginType: String,
    status: { type: String, enum: ['active', 'loggedOut'], default: 'active' }, // 🔥 new field
    lastActivity: { type: Date, default: Date.now }, // 🔥 to track token refresh or other actions
    time: { type: Date, default: Date.now }
}, { timestamps: true });

const LoginLog = mongoose.model('LoginLog', loginLogSchema);

export default LoginLog;
