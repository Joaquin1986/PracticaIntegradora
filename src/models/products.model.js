import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnails: { type: Array, "default": [] },
    code: String,
    status: Boolean,
    stock: Number,
}, { timestamps: true });

export default mongoose.model('Product', productSchema);