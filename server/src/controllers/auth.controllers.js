import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

const SignUp = (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            message: "Missing required fields"
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
                message: "User created successfully"
            });
        }
        )
        .catch(err => {
            return res.status(500).json({
                message: "Error creating user",
                error: err
            });
        }
        );
};

const SignIn = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: "Error signing in",
                error: err
            });
        }

        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: "Incorrect email or password"
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        const { _id, name, email } = user;

        return res.json({
            token,
            user: { _id, name, email }
        });
    }
    );
};


export { SignUp, SignIn };