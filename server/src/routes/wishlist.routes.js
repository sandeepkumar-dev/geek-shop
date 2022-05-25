import { AddToWishlist, MooveToWishlist, RemoveFromWishlist, WishlistItemList } from "../controllers/wishlist.controllers.js"
import UserAccess from "../middleware/userAccess.js";

const WishlistRoutes = (app) => {
    app.post('/wishlist/add', UserAccess, AddToWishlist)
    app.delete('/wishlist/remove/:id', UserAccess, RemoveFromWishlist)
    app.post('/wishlist/move', UserAccess, MooveToWishlist)
    app.get('/wishlist/list', UserAccess, WishlistItemList)
}

export default WishlistRoutes;