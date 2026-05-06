import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true, default: 0},
    vendorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true}
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);