import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

const SignUp = (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
            data: null
        });
    }

    const user = new User({
        email,
        password,
        name
    });

    user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                message: "User created successfully",
                data: null
            });
        }
        )
        .catch(err => {
            if (err.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists",
                    data: null
                });
            } else if (err.errors) {
                if (err.errors.email) {
                    return res.status(400).json({
                        success: false,
                        message: err.errors.email.message,
                        data: null
                    });
                }
                if (err.errors.password) {
                    return res.status(400).json({
                        success: false,
                        message: err.errors.password.message,
                        data: null
                    });
                }
                if (err.errors.name) {
                    return res.status(400).json({
                        success: false,
                        message: err.errors.name.message,
                        data: null
                    });
                }
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Error signing up",
                    data: null
                });
            }
        }
        );
};

const SignIn = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
            data: null
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error signing in",
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

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
                data: null
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        const { _id, name, email } = user;

        return res.json({
            success: true,
            message: "User signed in successfully",
            data: { token, user: { _id, name, email } }
        });
    }
    );
};


export { SignUp, SignIn };