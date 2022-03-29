// Imports: third-party packages.
const mongoose = require("mongoose");

// Function that is used to connect to the database.
const connect = () => {
  return new Promise((resolve, reject) => {
    try {
      const host = process.env.MONGO_HOST;
      const port = process.env.MONGO_PORT;
      const name = process.env.MONGO_NAME;
      const MONGO_URI = `mongodb://${host}:${port}/${name}`;
      mongoose.connect(MONGO_URI, (error) => {
        if (error) {
          console.log(
            `Failed to connect to the database: ${
              error.message || "Internal Error"
            }!`
          );
          resolve({ success: false, data: null, error: null });
        } else {
          console.log(`Succesfully connected to the database: ${MONGO_URI}!`);
          resolve({ success: true, data: null, error: null });
        }
      });
    } catch {
      console.log(
        `Failed to connect to the database: ${
          error.message || "Internal Error"
        }!`
      );
      resolve({ success: false, data: null, error: null });
    }
  });
};

// Exports of this file.
module.exports = { connect };
