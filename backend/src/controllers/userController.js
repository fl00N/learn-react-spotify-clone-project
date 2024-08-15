import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const loginUser = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await userModel.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.status(200).json({ success: true, token, username: user.username });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        if (!email || !username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        res.status(201).json({ success: true, token });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export { loginUser, registerUser };
