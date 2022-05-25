import mongoose from "mongoose";
import { ItemSchema } from "./itemSchema.js";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    items: {
        cart: {
            type: [ItemSchema],
            default: []
        },
        wishlist: {
            type: [ItemSchema],
            default: []
        }
    }
});

const User = mongoose.model("User", UserSchema);

export default User;