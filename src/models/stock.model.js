import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StockSchema = new Schema(
    {
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: "sellers",
        },
        productListingId: {
            type: Schema.Types.ObjectId,
            ref: "productlistings",
        },
        title: String,
        quantity: {
            type: Number,
            min: 0,
            default: null,
        },
        images: [
            {
                blobName: { type: String, maxLength: 255, default: null },
                azureUrl: { type: String, maxLength: 1024, default: null },
            },
        ],
        mfgDate: {
            type: String,
            default: null,
        },
        expDate: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const Stock = model("stocks", StockSchema);

export default Stock;
