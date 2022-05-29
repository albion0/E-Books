// Imports: third-party packages.
const nodemailer = require("nodemailer");

// Function that is used to send mail around the API.
const mail = (options) => {
  return new Promise(async (resolve, reject) => {
    try {
      let host = null;
      let port = null;
      let user = null;
      let pass = null;

      let transportPayload = {};
      host = process.env.MAIL_DEV_HOST;
      port = process.env.MAIL_DEV_PORT;
      user = process.env.MAIL_DEV_USER;
      pass = process.env.MAIL_DEV_PASS;
      transportPayload = {
        host,
        port,
        auth: {
          user,
          pass,
        },
      };

      const transporter = nodemailer.createTransport(transportPayload);

      await transporter.sendMail(options);
      resolve({ success: true, data: null, error: null });
    } catch (error) {
      resolve({
        success: false,
        data: null,
        error: error.message || "Internal Server Error!",
      });
    }
  });
};

// Exports of this file.
module.exports = mail;
