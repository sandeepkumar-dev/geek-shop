import authRoutes from './auth.routes.js';
import CartRoutes from './cart.routes.js';
import WishlistRoutes from './wishlist.routes.js';

const router = (app) => {
    // authentication routes
    authRoutes(app);
    CartRoutes(app);
    WishlistRoutes(app);
}

export default router;