import User from "../model/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { customEmail } from "../../nodemailer/customEmail";
import { CreateUserDto } from "../dto/userdto";

//Regex for email and password
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

//Create a new user
export const createUser = async (createUserDto: CreateUserDto): Promise<String> => {
    try {
        const { firstName, lastName, email, password } = createUserDto;

        // Check if all fields are provided
        if (!firstName || !lastName || !email || !password) {
            return "All_fields_required";
        }

        // Validate email format
        if (!emailRegex.test(email)) {
            return "Invalid_email_format";
        }

        // Validate password format
        if (!passwordRegex.test(password)) {
            return "Invalid_password_format";
        }

        //Check if email already exists
        const exsistinguser = await User.findOne({ email });
        if (exsistinguser) return "User_email_found";

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.save();
        await customEmail(email, "Welcome to Converter Exchange", "Thank you for signing up with Converter Exchange!");
        return "";
    } catch (error) {
        console.error('Error creating user:', (error as Error).message);
        return "Error";
    }
};

//signin
export const signIn = async (email: String, password: any) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return "User_not_found";

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return "Invalid_credentials";

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.secret, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ email: user.email, id: user._id }, process.env.refreshtoken, { expiresIn: '10h' });

        user.token = token;
        user.refreshtoken = refreshToken;
        await user.save();

        return { result: user };
    } catch (error) {
        return "Something_went_wrong";
    }
};

//get user details by email
export const getUserByEmail = async (email: String) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return "User_not_found";
        return { result: user };
    } catch (error) {
        return "Something_went_wrong";
    }
};

//signout
export const signOut = async (email: String) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return "User_not_found";

        user.token = "";
        user.refreshtoken = "";
        await user.save();
        return "Signout_success";
    } catch (error) {
        return "Something_went_wrong";
    }
};