import User from "../models/userSchema.js";

const AddToCart = (req, res) => {
    const userId = req.userId;
    const newItem = req.body;

    // find the user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error adding to cart",
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

        // check if the item is already in the cart
        const itemIndex = user.items.cart.findIndex(
            item => item._id === newItem._id
        );

        if (itemIndex !== -1) {
            return res.status(400).json({
                success: false,
                message: "Item already in cart",
                data: null
            });
        }
        // add the item to the cart
        user.items.cart.push(newItem);

        // save the user
        user.save((err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error adding to cart",
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: "Item added to cart",
                // send the current item
                data: user.items.cart
            });
        });
    });
}

const RemoveFromCart = (req, res) => {
    const userId = req.userId;
    const itemId = req.params.id;

    // find the user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error removing from cart",
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

        // remove the item from the cart
        const itemIndex = user.items.cart.findIndex(
            item => item._id === itemId
        );

        if (itemIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Item not in cart",
                data: null
            });
        }

        user.items.cart.splice(itemIndex, 1);

        // save the user
        user.save((err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error removing from cart",
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: "Item removed from cart",
                data: user.items.cart
            });
        });
    });
}

const IncreaseQuantity = (req, res) => {
    const userId = req.userId;
    const itemId = req.params.id;

    // find the user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error increasing quantity",
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

        // increase the quantity of the item
        const itemIndex = user.items.cart.findIndex(
            item => item._id === itemId
        );

        if (itemIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Item not in cart",
                data: null
            });
        }

        user.items.cart[itemIndex].quantity++;

        // save the user
        user.save((err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error increasing quantity",
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: "Item quantity increased",
                data: user.items.cart
            });
        });
    });
}

const DecreaseQuantity = (req, res) => {
    const userId = req.userId;
    const itemId = req.params.id;

    // find the user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error decreasing quantity",
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

        // decrease the quantity of the item
        const itemIndex = user.items.cart.findIndex(
            item => item._id === itemId
        );

        if (itemIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Item not in cart",
                data: null
            });
        }

        if (user.items.cart[itemIndex].quantity === 1) {
            return res.status(400).json({
                success: false,
                message: "Item quantity cannot be decreased less than 1",
                data: null
            });
        }
        user.items.cart[itemIndex].quantity--;

        // save the user
        user.save((err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error decreasing quantity",
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: "Item quantity decreased",
                data: user.items.cart
            });
        });
    });
}

const CartItemList = (req, res) => {
    const userId = req.userId;

    // find the user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error getting cart items",
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
            message: "Cart items retrieved",
            data: user.items.cart
        });
    });
}

const MoveToCart = (req, res) => {
    const userId = req.userId;
    const newItem = req.body;

    // find the user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error adding to cart",
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

        // check if the item is already in the cart
        const itemIndex = user.items.cart.findIndex(
            item => item._id === newItem._id
        );
        if (itemIndex !== -1) {
            user.items.cart[itemIndex].quantity++;
            user.items.wishlist = user.items.wishlist.filter(item => item._id !== newItem._id);
        } else {
            // add the item to the cart
            user.items.cart.push(newItem);
            user.items.wishlist = user.items.wishlist.filter(item => item._id !== newItem._id);
        }

        // save the user
        user.save((err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error adding to cart",
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: "Item added to cart",
                // send the current item
                data: user.items
            });
        });
    });
}

export { AddToCart, RemoveFromCart, IncreaseQuantity, DecreaseQuantity, CartItemList, MoveToCart }