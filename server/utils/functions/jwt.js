// Imports: third-party packages.
const jwt = require("jsonwebtoken");

// Function that is used to sign tokens in our API.
const sign = (options) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, email, role } = options;
      const payload = { id, email, role };

      const secret = process.env.JWT_SECRET;
      const expire = process.env.JWT_EXPIRES;

      jwt.sign(
        payload,
        secret,
        { expiresIn: remember ? "30d" : expire },
        (error, token) => {
          if (error) {
            resolve({
              success: false,
              data: null,
              error: error.message || "Internal Server Error!",
            });
          } else {
            resolve({ success: true, data: { token }, error: null });
          }
        }
      );
    } catch (error) {
      resolve({
        success: false,
        data: null,
        error: error.message || "Internal Server Error!",
      });
    }
  });
};

// Function that is used to decode tokens in our API.
const decode = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const secret = process.env.JWT_SECRET;

      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          resolve({
            success: false,
            data: null,
            error: error.message || "Internal Server Error!",
          });
        } else {
          resolve({ success: true, data: { decoded }, error: null });
        }
      });
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
module.exports = { sign, decode };
