// Configuration object that holds emails used in our API.
const config = {
  resetPassword: {
    en: (resetURL) => {
      return {
        subject: `Reset your password!`,
        html: `Dear user,<br></br>We received a request to reset your password for your eBooks account.If you didn't make this request, please ignore this email.<br></br>To set a new password, click on this <a href="${resetURL}">link</a>.<br></br>Thanks,<br></br>eBooks Team`,
      };
    },
  },
  contactForm: {
    en: (name, email, body) => {
      return {
        subject: "eBooks - Contact Form!",
        html: `Name: ${name},<br></br>Email: ${email},<br></br><br></br>${body}`,
      };
    },
  },
};

// Exports of this file.
module.exports = config;
