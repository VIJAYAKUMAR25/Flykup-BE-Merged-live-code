import mongoose from 'mongoose';

const productInteractionSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    type: { type: String, enum: ['view', 'review'], required: true },
    location: {
        city: String,
        region: String,
        country: String
    },
    device: { type: String, enum: ['mobile', 'desktop', 'tablet', 'other'] },
    browser: String,
    os: String
}, { timestamps: true });

// Index for duplicate view prevention
productInteractionSchema.index(
    { product: 1, user: 1, createdAt: -1 },
    { name: 'view_deduplication_index' }
);

productInteractionSchema.index(
    { type: 1, createdAt: -1 },
    { name: 'interaction_recency_index' }
);
// Indexes
productInteractionSchema.index({ product: 1, user: 1 });
productInteractionSchema.index({ createdAt: 1 });
productInteractionSchema.index({ type: 1 });
productInteractionSchema.index(
    { product: 1, user: 1, createdAt: -1 },
    { 
        name: 'prevent_rapid_duplicates',
        partialFilterExpression: { 
            type: 'view',
            createdAt: { $gt: new Date(Date.now() - 60 * 1000) } // 1 minute window
        }
    }
);

const ProductInteraction = mongoose.model('ProductInteraction', productInteractionSchema);

export default ProductInteraction;