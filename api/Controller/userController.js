import User from "../Model/userModel.js"
import bcrypt from 'bcryptjs'
import { responseMessages } from "../Config/response.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validate inputs
        if (!name) {
            return res.status(400).json({
                status: 400,
                message: "All fields are required.",
            });
        } 
        const newUser = await User.create({
            name
        });

        if (newUser) {
            return res
                .status(201)
                .json(responseMessages.ACCOUNT_CREATED || { message: "Account created successfully!" });
        }

        return res
            .status(500)
            .json(responseMessages.ACCOUNT_CREATION_FAILED || { message: "Failed to create account." });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: 500,
            message: "Server error: " + error.message,
        });
    }
};
