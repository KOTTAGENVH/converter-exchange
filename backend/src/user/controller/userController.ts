import { createUser, signIn, getUserByEmail, signOut, resetPassword, resetPasswordVerification, forgotPassword } from "../service/userService";
import { CreateUserDto } from "../dto/userdto";
import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const CreateUserDto: CreateUserDto = req.body;
        const userCreated = await createUser(CreateUserDto);
        if (userCreated === "All_fields_required") {
            res.status(400).json({ message: "All fields are required" });
        } else if (userCreated === "Invalid_email_format") {
            res.status(400).json({ message: "Invalid email format" });
        } else if (userCreated === "Invalid_password_format") {
            res.status(400).json({ message: "Invalid password format" });
        } else if (userCreated === "User_email_found") {
            res.status(400).json({ message: "User email already exists" });
        } else if (userCreated === "Error") {
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(201).json({ message: "User created successfully" });
        }
    } catch (error) {
        console.error('Error creating user:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

//signin

export const signInController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await signIn(email, password);
        if (user === "User_not_found") {
            res.status(404).json({ message: "User not found" });
        } else if (user === "Invalid_credentials") {
            res.status(400).json({ message: "Invalid credentials" });
        } else if (user === "Something_went_wrong") {
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error('Error signing in user:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};


//get user details
export const getUserDetailController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);
        if (user === "User_not_found") {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error('Error getting user details:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

//signout
export const signOutController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const user = await signOut(email);
        if (user === "User_not_found") {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ message: "User signed out successfully" });
        }
    } catch (error) {
        console.error('Error signing out user:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

//forgot password
export const forgotPasswordController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const user = await forgotPassword(email);
        if (user === "User_not_found") {
            res.status(404).json({ message: "User not found" });
        } else if (user === "Something_went_wrong") {
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(200).json({ message: "Email sent successfully" });
        }
    } catch (error) {
        console.error('Error sending email:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

//reset password
export const resetPasswordController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await resetPassword(email, password);
        if (user === "User_not_found") {
            res.status(404).json({ message: "User not found" });
        } else if (user === "Invalid_password_format") {
            res.status(400).json({ message: "Invalid password" });
        } else if (user === "Something_went_wrong") {
            res.status(500).json({ message: "Internal server error" });
        } else if (user === "Token_not_verified") {
            res.status(400).json({ message: "Token expired" });
        }
        else {
            res.status(200).json({ message: "Password reset successfully" });
        }
    } catch (error) {
        console.error('Error resetting password:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

//reset password verification
export const resetPasswordVerificationController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.body;
        const user = await resetPasswordVerification(token);
        if (user === "User_not_found") {
            res.status(404).json({ message: "User not found" });
        } else if (user === "Token_expired") {
            res.status(400).json({ message: "Token expired" });
        } else if (user === "Something_went_wrong") {
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(200).json({ message: "Token verified successfully" });
        }
    } catch (error) {
        console.error('Error verifying token:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

