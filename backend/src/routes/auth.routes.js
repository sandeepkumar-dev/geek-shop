import SignUp from "../controllers/auth.controllers.js";

const authRoutes = (router) => {
    router.post('/signup', SignUp)
    router.post('/signin')
    router.get('/signout')
}

export default authRoutes;