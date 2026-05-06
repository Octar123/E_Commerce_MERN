import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    
    items: [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        vendorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        quantity: {type: Number, required: true},
        priceAtPurchase: {type: Number, required: true},
        status: {type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending'}
    }],
    totalAmount: {type: Number, required: true},
    shippingAddress: {type: String, required: true},
    overallStatus: {type: String, enum: ['pending', 'partially_shipped', 'completed', 'cancelled'], default: 'pending'},
    paymentDetails: {
        method: {type: String, enum: ['card', 'upi', 'netbanking', 'cod'], required: true},
        transactionId: String,
        paymentStatus: {type: String, enum:['pending', 'completed', 'failed', 'refunded'], default: 'pending'}
    }
}, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema);