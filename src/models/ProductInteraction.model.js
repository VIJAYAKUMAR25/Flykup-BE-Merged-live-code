import mongoose from 'mongoose';

const productInteractionSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    location: {
        city: String,
        region: String,
        country: String
    },
    device: { type: String, enum: ['mobile', 'desktop', 'tablet', 'other'] },
    browser: String,
    os: String,
    ip: { type: String, required: true },
    isIndianRegion: { type: Boolean, default: false }
}, { timestamps: true });

// Ensures a user's view is counted only once per product
productInteractionSchema.index({ product: 1, user: 1 }, { unique: true, partialFilterExpression: { user: { $exists: true } } });

// Additional indexes for performance
productInteractionSchema.index({ createdAt: -1 });

const ProductInteraction = mongoose.model('ProductInteraction', productInteractionSchema);

export default ProductInteraction;