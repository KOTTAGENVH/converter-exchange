import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({


    firstName: {
        type: String,
        required: [true, 'First name is required']
    },

    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        match: [/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must contain at least one letter, one number, and one special character']
    },

    token: {
        type: String,
        required: false,
    },
    refreshtoken: {
        type: String,
        required: false,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
