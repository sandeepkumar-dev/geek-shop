import { Router } from 'express';
import authRoutes from './auth.routes.js';

const router = () => {
    // initialize router
    const router = Router();

    // authentication routes
    authRoutes(router);

    return router;
}

export default router;