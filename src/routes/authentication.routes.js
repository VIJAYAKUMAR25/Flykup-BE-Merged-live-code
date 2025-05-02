import Express from 'express';

import { loginUser, logoutUser, resendEmailOTP, signupUser, verifySignupOTP, googleAuth, facebookAuth, forgotPasswordRequest, verifyForgotPasswordOtp, resetPassword, getAuthenticatedUser, refreshAccessToken } from '../controllers/authentication.controller.js';
import { userAuth } from '../middlewares/auth.js';

const authRouter = Express.Router();

authRouter.post("/signup", signupUser);
authRouter.post("/google", googleAuth);
authRouter.post("/facebook", facebookAuth);
authRouter.post("/verify-otp",verifySignupOTP);
authRouter.post("/resend-otp",resendEmailOTP);
authRouter.post("/login",loginUser);
authRouter.post("/logout", userAuth, logoutUser);
authRouter.post("/forgot-password",forgotPasswordRequest);
authRouter.post("/forgot-password/verify",verifyForgotPasswordOtp);
authRouter.post("/reset-password",resetPassword);
authRouter.get("/me", getAuthenticatedUser );
authRouter.post("/refresh", refreshAccessToken);



export default authRouter;