const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function dispatchSignUpConfirmationEmail(user) {
  const signUpTemplate = getSignUpTemplate(user);
  const message = {
    to: user.email,
    from: "ashishchawla6500@gmail.com",
    subject: "Signup Confirmation",
    html: signUpTemplate,
  };

  return sgMail.send(message);
}

function getSignUpTemplate(user) {
  const userName = user?.email.split("@")[0];
  const verificationToken = user?.verificationToken;
  return `<!DOCTYPE html>
<html>
<head>
    <title>Signup Confirmation</title>
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
            background-color: #28a745;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Todoist!</h1>
        <p>Hi ${userName},</p>
        <p>Thank you for signing up. Please click the button below to verify your email address and activate your account.</p>
        <a href="http://localhost:5173/verify-email/${verificationToken}" class="button">Click to Verify Your Email</a>
        <p>If you did not create an account, no further action is required.</p>
        <p>This link will expire after 24 hours.</p>
        <p>Regards,<br>Todoist Team</p>
    </div>
</body>
</html>`;
}

module.exports = dispatchSignUpConfirmationEmail;
