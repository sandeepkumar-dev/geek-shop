import jwt from "jsonwebtoken";

// middleware for user access
const UserAccess = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token",
                    data: null
                });
            } else {
                // get the user id from the token
                req.userId = decoded._id;
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "No token provided",
            data: null
        });
    }
}

export default UserAccess;