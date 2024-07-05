import { createUserController, signInController, getUserDetailController, signOutController, forgotPasswordController, resetPasswordController, resetPasswordVerificationController } from "../controller/userController";
import { verifyToken } from "../../middleware/authjwt";
import { Router } from "express";

const user_router = Router();

user_router.post("/signup", createUserController);
user_router.post('/signin', signInController);
user_router.get('/userdetail', verifyToken, getUserDetailController);
user_router.post('/signout', verifyToken, signOutController);
user_router.post('/forgotpassword', forgotPasswordController);
user_router.post('/resetpassword', resetPasswordController);
user_router.post('/resetpasswordverification', resetPasswordVerificationController);

export default user_router;