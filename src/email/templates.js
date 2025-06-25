export const OTP_EMAIL = `
<!DOCTYPE html>
<html lang="en" style="color:#333; font-family:Arial, sans-serif; margin:0; overflow-x:hidden; padding:0">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  </head>
<body style="color:#333; font-family:Arial, sans-serif; margin:0 auto; overflow-x:hidden; padding:16px; background-color:#f9f9f9; max-width:600px" bgcolor="#f9f9f9">
  
  <div class="header" style="background-color:#2c2c2c; border-top-left-radius:8px; border-top-right-radius:8px; padding:24px; text-align:center" bgcolor="#2c2c2c" align="center">
    <img src="https://d2jp9e7w3mhbvf.cloudfront.net/products/bd654f06-fe3b-4417-b995-2a31a3b25ae2_Logo-Flykup.png" alt="Flykup Logo" style="height: 40px;">
  </div>
 
  <div class="content" style="background-color:white; border-bottom-left-radius:8px; border-bottom-right-radius:8px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1); padding:24px" bgcolor="white">
    <div>
      <p style="font-size: 16px; font-weight: 500; margin: 0 0 16px;">Hello, {userName}</p>
    </div>
  
    <p style="font-size: 16px; margin-bottom: 12px; font-weight:600;">Thank you for signing up in Flykup</p>
   
    <div style="text-align: center; margin: 18px 0;">
      <div class="otp-text" style="color:#333; font-size:18px; font-weight:bold; text-align:center" align="center">Your OTP</div>
      <p class="otp-code" style="background-color:#2c2c2c; border:none; border-radius:4px; color:#FFD700; display:inline-block; font-size:16px; font-weight:600; padding:12px 24px; text-align:center" bgcolor="#2c2c2c" align="center">{verificationCode}</p>
    </div>
   
    <p style="font-size: 14px; margin-bottom: 8px;">Enter this code on the verification page to complete your registration.</p>
    <p style="font-size: 12px; color: #333; margin-bottom: 8px;">This code will expire in <span style="font-weight:600;">10 minutes</span> for security reasons.</p>
    <p style="font-size: 12px; color: #333; margin-bottom: 8px;">If you didn't create an account with us, please ignore this email.</p>
   
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 18px;">
      <p style="font-size: 12px; color: #333; margin: 0;">
        Best regards,<br>
        <span class="flykup" style="color:#333; font-size:14px; font-weight:bold">Flykup</span>
      </p>
    </div>
  </div>
 
  <div class="footer" style="color:#757575; font-size:12px; margin-top:24px; text-align:center" align="center">
    <p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const FORGOT_PASSWORD_OTP_EMAIL = `
<!DOCTYPE html>
<html lang="en" style="color:#333; font-family:Arial, sans-serif; margin:0; overflow-x:hidden; padding:0">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  </head>
<body style="color:#333; font-family:Arial, sans-serif; margin:0 auto; overflow-x:hidden; padding:16px; background-color:#f9f9f9; max-width:600px" bgcolor="#f9f9f9">
  
  <div class="header" style="background-color:#2c2c2c; border-top-left-radius:8px; border-top-right-radius:8px; padding:24px; text-align:center" bgcolor="#2c2c2c" align="center">
    <img src="https://d2jp9e7w3mhbvf.cloudfront.net/products/bd654f06-fe3b-4417-b995-2a31a3b25ae2_Logo-Flykup.png" alt="Flykup Logo" style="height: 40px;">
  </div>
 
  <div class="content" style="background-color:white; border-bottom-left-radius:8px; border-bottom-right-radius:8px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1); padding:24px" bgcolor="white">
    <div>
      <p style="font-size: 16px; font-weight: 500; margin: 0 0 16px;">Hello, {userName}</p>
    </div>
  
    <p style="font-size: 16px; margin-bottom: 12px; font-weight:600;">Here is your OTP for reset password</p>
   
    <div style="text-align: center; margin: 18px 0;">
      <div class="otp-text" style="color:#333; font-size:18px; font-weight:bold; text-align:center" align="center">Your OTP</div>
      <p class="otp-code" style="background-color:#2c2c2c; border:none; border-radius:4px; color:#FFD700; display:inline-block; font-size:16px; font-weight:600; padding:12px 24px; text-align:center" bgcolor="#2c2c2c" align="center">{verificationCode}</p>
    </div>
   
    <p style="font-size: 14px; margin-bottom: 8px;">Enter this code on the verification page to complete your registration.</p>
    <p style="font-size: 12px; color: #333; margin-bottom: 8px;">This code will expire in <span style="font-weight:600;">10 minutes</span> for security reasons.</p>
    <p style="font-size: 12px; color: #333; margin-bottom: 8px;">If you didn't create an account with us, please ignore this email.</p>
   
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 18px;">
      <p style="font-size: 12px; color: #333; margin: 0;">
        Best regards,<br>
        <span class="flykup" style="color:#333; font-size:14px; font-weight:bold">Flykup</span>
      </p>
    </div>
  </div>
 
  <div class="footer" style="color:#757575; font-size:12px; margin-top:24px; text-align:center" align="center">
    <p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL = `
<!DOCTYPE html>
<html lang="en" style="color:#333; font-family:Arial, sans-serif; line-height:1.6; margin:0; overflow-x:hidden; padding:0">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Flykup</title>
  </head>
<body style="color:#333; font-family:Arial, sans-serif; line-height:1.6; margin:0; overflow-x:hidden; padding:0">
  <div class="container" style="background-color:#f9f9f9; margin:0 auto; max-width:600px; padding:16px" bgcolor="#f9f9f9">
    <div class="header" style="background-color:#2c2c2c; border-top-left-radius:8px; border-top-right-radius:8px; padding:24px; text-align:center" bgcolor="#2c2c2c" align="center">
      <img src="https://d2jp9e7w3mhbvf.cloudfront.net/products/bd654f06-fe3b-4417-b995-2a31a3b25ae2_Logo-Flykup.png" alt="Flykup Logo" style="height: 40px;">
    </div>
    
    <div class="content" style="background-color:white; border-bottom-left-radius:8px; border-bottom-right-radius:8px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1); padding:24px" bgcolor="white">
      <div class="welcome-text" style="color:#333; font-size:17px; font-weight:bold; margin-bottom:16px">Welcome to Flykup, {userName}</div>
      <p class="sub-text" style="color:#4c4a4a; font-size:16px; margin-bottom:24px">We're thrilled to have you on board as part of our growing community.</p>
      
      <p style="font-size: 15px; margin-bottom: 12px;">
        Congratulations on taking the first step toward elevating your business with shoppable videos! Whether you're uploading recorded reels or going live to showcase your products, we're here to help you succeed.
      </p>
      
      <!-- Inline styles added with !important to enforce yellow text color -->
      <a href="https://user-vercel-flykup.vercel.app/" target="_blank" rel="noopener noreferrer" style="display: block; background-color: #2c2c2c; color: #FFD700 !important; font-size: 16px; font-weight: 600; padding: 12px 24px; border-radius: 4px; text-decoration: none; text-align: center; margin: 24px auto; width: fit-content;">
        Get Started Now
      </a>
      
      <p style="font-size: 14px; margin-bottom: 8px;">
        We wish you all the best in your journey toward quality purchases and exponential business growth. Your success is our priority!
      </p>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 18px;">
        <p style="font-size: 12px; color: #333; margin: 0;">
          Best regards,<br>
          <span class="flykup" style="color:#333; font-size:14px; font-weight:bold">Flykup</span>
        </p>
      </div>
    </div>

    <div class="footer" style="color:#757575; font-size:12px; margin-top:24px; text-align:center" align="center">
      <p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS = `
<!DOCTYPE html>
<html lang="en" style="color:#333; font-family:Arial, sans-serif; line-height:1.6; margin:0; overflow-x:hidden; padding:0">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Changed Successfully</title>
</head>
<body style="color:#333; font-family:Arial, sans-serif; line-height:1.6; margin:0; overflow-x:hidden; padding:0">
  <div class="container" style="background-color:#f9f9f9; margin:0 auto; max-width:600px; padding:16px" bgcolor="#f9f9f9">
    <div class="header" style="background-color:#2c2c2c; border-top-left-radius:8px; border-top-right-radius:8px; padding:24px; text-align:center" bgcolor="#2c2c2c" align="center">
      <img src="https://d2jp9e7w3mhbvf.cloudfront.net/products/bd654f06-fe3b-4417-b995-2a31a3b25ae2_Logo-Flykup.png" alt="Flykup Logo" style="height: 40px;">
    </div>
    
    <div class="content" style="background-color:white; border-bottom-left-radius:8px; border-bottom-right-radius:8px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1); padding:24px" bgcolor="white">
      <div class="title" style="color:#333; font-size:17px; font-weight:bold; margin-bottom:16px">Your Password Has Been Changed</div>
      <p class="message" style="color:#4c4a4a; font-size:16px; margin-bottom:24px">
        <span style="font-weight: 600;">Hello {userName},</span> we want to inform you that your password has been updated successfully.  
        If you did not make this change, please contact our support team immediately.
      </p>
      
      <p style="font-size: 14px; margin-bottom: 8px;">
        Keeping your account secure is our top priority. Thank you for being a part of Flykup.
      </p>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 18px;">
        <p style="font-size: 12px; color: #333; margin: 0;">
          Best regards,<br>
          <span style="color:#333; font-size:14px; font-weight:bold">Flykup</span>
        </p>
      </div>
    </div>

    <div class="footer" style="color:#757575; font-size:12px; margin-top:24px; text-align:center" align="center">
      <p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const RECEIVED_SELLER_APPLICATION = `
<!DOCTYPE html>
<html lang="en" style="color:#333; font-family:Arial, sans-serif; line-height:1.6; margin:0; overflow-x:hidden; padding:0">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seller Application Received</title>
</head>
<body style="color:#333; font-family:Arial, sans-serif; line-height:1.6; margin:0; overflow-x:hidden; padding:0">
  <div class="container" style="background-color:#f9f9f9; margin:0 auto; max-width:600px; padding:16px" bgcolor="#f9f9f9">
    <div class="header" style="background-color:#2c2c2c; border-top-left-radius:8px; border-top-right-radius:8px; padding:24px; text-align:center" bgcolor="#2c2c2c" align="center">
      <img src="https://d2jp9e7w3mhbvf.cloudfront.net/products/bd654f06-fe3b-4417-b995-2a31a3b25ae2_Logo-Flykup.png" alt="Flykup Logo" style="height: 40px;">
    </div>
    
    <div class="content" style="background-color:white; border-bottom-left-radius:8px; border-bottom-right-radius:8px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1); padding:24px" bgcolor="white">
      <div class="title" style="color:#333; font-size:17px; font-weight:bold; margin-bottom:16px">Thank You for Your Application</div>
      <p class="message" style="color:#4c4a4a; font-size:16px; margin-bottom:24px">
        <span style="font-weight: 600;">Hello {userName},</span> we appreciate your interest in becoming a seller on Flykup.  
        Your application has been received, and our team will carefully review it. We will notify you once the evaluation process is complete.
      </p>
      
      <p style="font-size: 14px; margin-bottom: 8px;">
        Thank you for choosing Flykup. We look forward to potentially working together!
      </p>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 18px;">
        <p style="font-size: 12px; color: #333; margin: 0;">
          Best regards,<br>
          <span style="color:#333; font-size:14px; font-weight:bold">Flykup</span>
        </p>
      </div>
    </div>

    <div class="footer" style="color:#757575; font-size:12px; margin-top:24px; text-align:center" align="center">
      <p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;


export const APPLICATION_ACCEPTED = `
<!DOCTYPE html>
<html lang="en" style="color:#333; font-family:Arial, sans-serif; margin:0; padding:0;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Congratulations! Your Seller Application is Approved</title>
</head>
<body style="margin:0; padding:16px; background-color:#f9f9f9; font-family:Arial, sans-serif;">
  <div style="max-width:600px; margin:0 auto; background-color:white; border-radius:8px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background-color:#2c2c2c; padding:24px; text-align:center; border-top-left-radius:8px; border-top-right-radius:8px;">
      <img src="https://d2jp9e7w3mhbvf.cloudfront.net/products/bd654f06-fe3b-4417-b995-2a31a3b25ae2_Logo-Flykup.png" alt="Flykup Logo" style="height:40px;">
    </div>
    <div style="padding:24px; color:#333;">
      <h1 style="font-size:20px; font-weight:bold; margin:0 0 16px;">Congratulations, {userName}!</h1>
      <p style="font-size:16px; line-height:1.6;">
        We are thrilled to inform you that your seller application has been <strong>approved</strong>. Welcome to the Flykup seller community!
      </p>
      <p style="font-size:16px; line-height:1.6;">
        You can now log in to your account and start showcasing your products to a wider audience through shoppable videos.
      </p>
      <div style="text-align:center; margin:24px 0;">
        <a href="https://app.flykup.live" target="_blank" rel="noopener noreferrer" style="background-color:#2c2c2c; color:#FFD700; font-size:16px; font-weight:600; padding:12px 24px; border-radius:4px; text-decoration:none;">
          Go to Your Dashboard
        </a>
      </div>
      <p style="font-size:14px; line-height:1.6;">
        If you have any questions, feel free to contact our support team. We're here to help you succeed.
      </p>
      <p style="font-size:14px; color:#333; margin-top:24px; margin-bottom:0;">
        Best regards,<br>
        <span style="font-weight:bold;">The Flykup Team</span>
      </p>
    </div>
    <div style="color:#757575; font-size:12px; text-align:center; padding:16px;">
      <p style="margin:0;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;


export const APPLICATION_REJECTED = `
<!DOCTYPE html>
<html lang="en" style="color:#333; font-family:Arial, sans-serif; margin:0; padding:0;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Update on Your Seller Application</title>
</head>
<body style="margin:0; padding:16px; background-color:#f9f9f9; font-family:Arial, sans-serif;">
  <div style="max-width:600px; margin:0 auto; background-color:white; border-radius:8px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background-color:#2c2c2c; padding:24px; text-align:center; border-top-left-radius:8px; border-top-right-radius:8px;">
      <img src="https://d2jp9e7w3mhbvf.cloudfront.net/products/bd654f06-fe3b-4417-b995-2a31a3b25ae2_Logo-Flykup.png" alt="Flykup Logo" style="height:40px;">
    </div>
    <div style="padding:24px; color:#333;">
      <h1 style="font-size:20px; font-weight:bold; margin:0 0 16px;">Update on Your Seller Application</h1>
      <p style="font-size:16px; line-height:1.6;">
        Hello {userName},
      </p>
      <p style="font-size:16px; line-height:1.6;">
        Thank you for your interest in becoming a seller on Flykup. After a careful review, we regret to inform you that your application could not be approved at this time.
      </p>
      <p style="font-size:16px; font-weight:bold; margin-top:20px; margin-bottom:10px;">Reason for rejection:</p>
      <div style="background-color:#fbeaea; border-left:4px solid #d9534f; padding:12px; font-size:15px; margin-bottom:20px;">
        <p style="margin:0;">{rejectedReason}</p>
      </div>
      <p style="font-size:16px; line-height:1.6;">
        We encourage you to correct the information and re-apply. If you believe this decision was made in error, or if you have any questions, please contact our support team.
      </p>
      <p style="font-size:14px; color:#333; margin-top:24px; margin-bottom:0;">
        Best regards,<br>
        <span style="font-weight:bold;">The Flykup Team</span>
      </p>
    </div>
    <div style="color:#757575; font-size:12px; text-align:center; padding:16px;">
      <p style="margin:0;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;


export const APPLICATION_MANUAL_REVIEW = `
<!DOCTYPE html>
<html lang="en" style="color:#333; font-family:Arial, sans-serif; margin:0; padding:0;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Seller Application is Under Review</title>
</head>
<body style="margin:0; padding:16px; background-color:#f9f9f9; font-family:Arial, sans-serif;">
  <div style="max-width:600px; margin:0 auto; background-color:white; border-radius:8px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background-color:#2c2c2c; padding:24px; text-align:center; border-top-left-radius:8px; border-top-right-radius:8px;">
      <img src="https://d2jp9e7w3mhbvf.cloudfront.net/products/bd654f06-fe3b-4417-b995-2a31a3b25ae2_Logo-Flykup.png" alt="Flykup Logo" style="height:40px;">
    </div>
    <div style="padding:24px; color:#333;">
      <h1 style="font-size:20px; font-weight:bold; margin:0 0 16px;">Your Application is Being Reviewed</h1>
      <p style="font-size:16px; line-height:1.6;">
        Hello {userName},
      </p>
      <p style="font-size:16px; line-height:1.6;">
        Thank you for submitting your seller application. Your submission requires a manual review by our team to ensure all details are correct.
      </p>
      <p style="font-size:16px; line-height:1.6;">
        This process typically takes <strong>2-3 business days</strong>. We will notify you by email as soon as a decision is made. Thank you for your patience.
      </p>
      <p style="font-size:14px; color:#333; margin-top:24px; margin-bottom:0;">
        Best regards,<br>
        <span style="font-weight:bold;">The Flykup Team</span>
      </p>
    </div>
    <div style="color:#757575; font-size:12px; text-align:center; padding:16px;">
      <p style="margin:0;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

