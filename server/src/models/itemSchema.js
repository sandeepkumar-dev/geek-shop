import mongoose from "mongoose";

export const ItemSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    product_img: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    rating_users: {
        type: Number,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        default: 1
    },
    sold: {
        type: Boolean,
        default: false
    },
    payOnDelivery: {
        type: Boolean,
        default: true
    },
});