const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const { db } = require("./utils/functions");

// Imports: error handlers.
const errorHandler = require("./middlewares/errorHandler");
const genericErrorHandler = require("./middlewares/genericErrorHandler");

const authRoutes = require("./routes/auth.js");

const app = express();
app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

// User error handling middleware.
app.use(errorHandler);
app.use(genericErrorHandler);

// Load .env variables.
dotenv.config({});

(async () => {
  try {
    const dbResult = await db.connect();
    if (!dbResult.success) process.exit(1);

    // Spin up server & start listening.
    const port = process.env.NODE_PORT;
    const env = process.env.NODE_ENV;

    app.listen(port, () =>
      console.log(`Server running on PORT ${port} on ${env} mode!`)
    );
  } catch (error) {
    console.log(error);
    console.log(`Error while starting up: ${error.message}!`);
    process.exit(1);
  }
})();
