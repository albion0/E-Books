// Imports: local files.
const validate = require("./validate");
const jwt = require("./jwt");
const db = require("./db");
const startup = require('./startup')

// Bundler object that is used to export all functions in this folder.
const bundler = { validate, jwt, db, startup };

// Exports of this file.
module.exports = bundler;
