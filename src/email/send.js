import { mailOptions, transporter } from "./config.js";
import { APPLICATION_ACCEPTED, APPLICATION_REJECTED, FORGOT_PASSWORD_OTP_EMAIL, OTP_EMAIL, PASSWORD_RESET_SUCCESS, RECEIVED_SELLER_APPLICATION, WELCOME_EMAIL,APPLICATION_MANUAL_REVIEW } from "./templates.js";


export const sendEmailOtp = async (email, otp, userName="user") => {
    try {
        const mailResponse = {
            ...mailOptions,
            to: email,
            subject: "Verification OTP ",
            html: OTP_EMAIL.replace("{verificationCode}", otp).replace("{userName}", userName)
        };

        await transporter.sendMail(mailResponse);
        return true;
    } catch (error) {
        console.error("Error in sendEmailOtp:", error.message);
        return false;
    }
}

export const sendForgotPasswordEmailOtp = async (email, otp, userName="user") => {
    try {
        const mailResponse = {
            ...mailOptions,
            to: email,
            subject: "Verification OTP ",
            html: FORGOT_PASSWORD_OTP_EMAIL.replace("{verificationCode}", otp).replace("{userName}", userName)
        };

        await transporter.sendMail(mailResponse);
        return true;
    } catch (error) {
        console.error("Error in sendEmailOtp:", error.message);
        return false;
    }
}

export const sendWelcomeEmail = async ( email, userName="user") => {
    try {
        const mailResponse = {
            ...mailOptions,
            to: email,
            subject: "Welcome To Flykup ",
            html: WELCOME_EMAIL.replace("{userName}", userName)
        };

        await transporter.sendMail(mailResponse);
        return true;
    } catch (error) {
        console.error("Error in sendWelcomeEmail:" , error.message);
        return false;
    }
}

export const sendPasswordResetSuccess = async ( email , userName="user") => {
    try {
            const mailResponse = {
                ...mailOptions,
                to: email,
                subject: "Password Changed Successfully",
                html: PASSWORD_RESET_SUCCESS.replace("{userName}", userName)
            };
    
            await transporter.sendMail(mailResponse);
            return true;
    } catch (error) {
        console.error("Error in sendPasswordResetSuccess:" , error.message);
        return false;
    }
}

export const sendApplicationReceived = async ( email , userName="user") => {
    try {
            const mailResponse = {
                ...mailOptions,
                to: email,
                subject: "Seller Application Received",
                html: RECEIVED_SELLER_APPLICATION.replace("{userName}", userName)
            };
    
            await transporter.sendMail(mailResponse);
            return true;
    } catch (error) {
        console.error("Error in sendApplicationReceived:" , error.message);
        return false;
    }
}

export const sendApplicationAccepted = async ( email , userName="user") => {
    try {
            const mailResponse = {
                ...mailOptions,
                to: email,
                subject: "Congratulations! Your Seller Application is Approved",
                html: APPLICATION_ACCEPTED.replace("{userName}", userName)
            };
    
            await transporter.sendMail(mailResponse);
            return true;
    } catch (error) {
        console.error("Error in sendApplicationAccepted:" , error.message);
        return false;
    }
}

export const sendApplicationRejected = async ( email , userName="user" , rejectedReason="incorrect details") => {
    try {
            const mailResponse = {
                ...mailOptions,
                to: email,
                subject: "Application rejected",
                html: APPLICATION_REJECTED.replace("{userName}", userName).replace("{rejectedReason}", rejectedReason)
            };
    
            await transporter.sendMail(mailResponse);
            return true;
    } catch (error) {
        console.error("Error in sendApplicationRejected:" , error.message);
        return false;
    }
}


export const sendSellerApplicationReceived = (email, userName) => {
  const mailOptions = {
    from: `"Flykup Seller Team" <${process.env.HOSTINGER_EMAIL}>`,
    to: email,
    subject: 'Your Seller Application Has Been Received',
    html: RECEIVED_SELLER_APPLICATION.replace(/{userName}/g, userName)
  };
  
  return transporter.sendMail(mailOptions);
};

export const sendSellerApplicationApproved = (email, userName) => {
  const mailOptions = {
    from: `"Flykup Seller Team" <${process.env.HOSTINGER_EMAIL}>`,
    to: email,
    subject: 'Congratulations! Your Seller Account is Approved',
    html: APPLICATION_ACCEPTED.replace(/{userName}/g, userName)
  };
  
  return transporter.sendMail(mailOptions);
};

export const sendSellerApplicationRejected = (email, userName, reason) => {
  let html = APPLICATION_REJECTED.replace(/{userName}/g, userName);
  html = html.replace(/{rejectedReason}/g, reason);
  
  const mailOptions = {
    from: `"Flykup Seller Team" <${process.env.HOSTINGER_EMAIL}>`,
    to: email,
    subject: 'Update on Your Seller Application',
    html: html
  };
  
  return transporter.sendMail(mailOptions);
};

export const sendSellerApplicationManualReview = (email, userName) => {
  const mailOptions = {
    from: `"Flykup Seller Team" <${process.env.HOSTINGER_EMAIL}>`,
    to: email,
    subject: 'Your Seller Application is Under Review',
    html: APPLICATION_MANUAL_REVIEW.replace(/{userName}/g, userName)
  };

  return transporter.sendMail(mailOptions);
};