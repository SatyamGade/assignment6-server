const User = require("../models/userModel");
const { Resend } = require('resend');
const resend = new Resend('re_MwLdrVbD_8c7YG1nzd7AQfYzoMyBnwwt4');

const home = async (req, res, next) => {
    try {
        res.status(200).send("Home");
    } catch (error) {
        const message = "Error in authController/home";
        const status = 404;
        next({ message, status });
    }
}

const register = async (req, res, next) => {
    try {
        const { name, username, password, email, isPolicy } = req.body;
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const user = await User.create({ name, username, password, email, isPolicy });

        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: `${email}`,
            subject: '',
            html: '<p>Thank you for Logged In to Dribble!</p>'
        });

        return res.status(201).json({ message: "Registration Success", userId: user._id.toString(), token: await user.generateToken() });

    } catch (error) {
        const message = "Error in authController/register";
        const status = 404;
        next({ message, status });
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const userExists = await User.findOne({ username });

        if (!userExists) {
            return res.status(401).json({ message: "User Not Exists" });
        }

        const isPasswordValid = await userExists.comparePassword(password);

        if (isPasswordValid) {
            return res.status(200).json({ message: "Login Success", userId: userExists._id.toString(), token: await userExists.generateToken() });
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        const message = "Error in authController/login";
        const status = 404;
        next({ message, status });
    }
}

const user = async (req, res, next) => {
    try {
        const userData = req.user;
        return res.status(200).json({ userData });
    } catch (error) {
        const message = "Error in authController/user";
        const status = 404;
        next({ message, status });
    }
}

module.exports = { home, register, login, user };