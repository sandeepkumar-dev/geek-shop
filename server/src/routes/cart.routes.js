import { AddToCart, CartItemList, DecreaseQuantity, IncreaseQuantity, MoveToCart, RemoveFromCart } from "../controllers/cart.controllers.js";
import UserAccess from "../middleware/userAccess.js";

const CartRoutes = (app) => {
    app.post('/cart/add', UserAccess, AddToCart)
    app.delete('/cart/remove/:id', UserAccess, RemoveFromCart)
    app.put('/cart/increase-quantity/:id', UserAccess, IncreaseQuantity)
    app.put('/cart/decrease-quantity/:id', UserAccess, DecreaseQuantity)
    app.get('/cart/list', UserAccess, CartItemList)
    app.post('/cart/move', UserAccess, MoveToCart)
}

export default CartRoutes;