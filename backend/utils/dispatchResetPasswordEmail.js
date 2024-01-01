const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function dispatchResetPasswordEmail(user) {
  const resetPasswordTemplate = getSignUpTemplate(user);
  const message = {
    to: user.email,
    from: "ashishchawla6500@gmail.com",
    subject: "Reset Password",
    html: resetPasswordTemplate,
  };

  return sgMail.send(message);
}

function getSignUpTemplate(user) {
  const userName = user?.email.split("@")[0];
  const resetToken = user?.resetToken;
  return `<!DOCTYPE html>
  <html>
  <head>
      <title>Reset Password</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border: 1px solid #ddd;
              text-align: center;
          }
          h1 {
              color: #333;
          }
          p {
              color: #666;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Reset Your Password</h1>
          <p>Hi ${userName},</p>
          <p>You have requested to reset your password. Please click the button below to set a new password for your account.</p>
          <a href="http://localhost:5173/resetPassword/${resetToken}" class="button">Reset Password</a>
          <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
          <p>This password reset link will expire in 1 hour.</p>
          <p>Regards,<br>todoist</p>
      </div>
  </body>
  </html>`;
}

module.exports = dispatchResetPasswordEmail;
