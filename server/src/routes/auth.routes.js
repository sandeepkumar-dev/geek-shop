import { SignUp, SignIn } from "../controllers/auth.controllers.js";

const authRoutes = (app) => {
    app.post('/signup', SignUp)
    app.post('/signin', SignIn)
    app.get('/signout')
}

export default authRoutes;