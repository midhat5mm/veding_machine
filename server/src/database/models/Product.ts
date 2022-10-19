import mongoose from 'mongoose';

const Product = new mongoose.Schema({
    amountAvailable: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    }
});

export default mongoose.model('Product', Product)