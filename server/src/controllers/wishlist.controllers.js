import User from "../models/userSchema.js";

const AddToWishlist = (req, res) => {
    const userId = req.userId;
    const newItem = req.body;

    // find the user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error adding to wishlist",
                data: null
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        // check if the item is already in the wishlist
        const isExist = user.items.wishlist.some(item => item._id === newItem._id);
        if (isExist) {
            // remove the item from the wishlist
            user.items.wishlist = user.items.wishlist.filter(item => item._id !== newItem._id);
        } else {
            // add the item to the wishlist
            user.items.wishlist.push(newItem);
        }

        // save the user
        user.save((err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error adding to wishlist",
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: "Item added to wishlist",
                data: user.items.wishlist
            });
        });
    });
}

const RemoveFromWishlist = (req, res) => {
    const userId = req.userId;
    const itemId = req.params.id;

    // find the user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error adding to wishlist",
                data: null
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        // remove the item from the wishlist
        const isExist = user.items.wishlist.some(item => item._id === itemId);
        if (!isExist) {
            return res.status(400).json({
                success: false,
                message: "Item not in wishlist",
                data: null
            });
        }

        user.items.wishlist = user.items.wishlist.filter(item => item._id !== itemId);

        // save the user
        user.save((err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error adding to wishlist",
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: "Item removed from wishlist",
                data: user.items.wishlist
            });
        }
        );
    });
}

const WishlistItemList = (req, res) => {
    const userId = req.userId;

    // find the user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error getting wishlist",
                data: null
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Wishlist items",
            data: user.items.wishlist
        });
    });
}


const MooveToWishlist = (req, res) => {
    const userId = req.userId;
    const newItem = req.body;

    // find the user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error adding to wishlist",
                data: null
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        // check if the item is already in the wishlist then remove from cart and add to wishlist
        const isExist = user.items.wishlist.some(item => item._id === newItem._id);
        if (isExist) {
            // remove the item from the cart
            user.items.cart = user.items.cart.filter(item => item._id !== newItem._id);
        } else {
            // add the item to the wishlist
            user.items.wishlist.push(newItem);
            user.items.cart = user.items.cart.filter(item => item._id !== newItem._id);
        }

        // save the user
        user.save((err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error adding to wishlist",
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: "Item added to wishlist",
                data: user.items
            });
        });
    });
}

export { AddToWishlist, RemoveFromWishlist, WishlistItemList, MooveToWishlist };