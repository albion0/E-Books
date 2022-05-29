// Imports: local files.
const statusCodes = require("./statusCodes");
const emails = require("./emails");

// Bundler object that is used to export all config objects in this folder.
const bundler = { statusCodes, emails };

// Exports of this file.
module.exports = bundler;
