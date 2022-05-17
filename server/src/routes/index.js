import authRoutes from './auth.routes.js';

const router = (app) => {
    // authentication routes
    authRoutes(app);
}

export default router;