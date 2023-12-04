import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String
}, { timestamps: true });

export default mongoose.model('Message', messagesSchema);