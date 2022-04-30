// Imports: core node modules.
const path = require("path");
const fs = require("fs");

// Imports: third-party packages.
const bcrypt = require("bcryptjs");

// Imports: local files.
const User = require("../../models/User");
const { Admin } = require("../../middlewares/roles");

// Function that is used to create required folders inside the public folder if they dont exist.
const createPublicFoldersIfNeeded = () => {
  const folders = ["books"];

  // Create public folder if missing.
  const pathToPublicFolder = path.join(__dirname, `../../../public`);
  if (!fs.existsSync(pathToPublicFolder)) fs.mkdirSync(pathToPublicFolder);

  folders.forEach((folder) => {
    const pathToFolder = path.join(__dirname, `../../../public/${folder}`);
    if (!fs.existsSync(pathToFolder)) fs.mkdirSync(pathToFolder);
  });
};

// Function that is used to initalize admins located in a json file inside ./src/utils/data/admins.json.
const initializeAdmins = async () => {
  const pathToAdmins = path.join(__dirname, "../data/admins.json");
  const admins = JSON.parse(
    fs.readFileSync(pathToAdmins, { encoding: "utf-8" })
  );

  for (const admin of admins) {
    const adminExists = await User.countDocuments({
      email: admin.email,
      role: Admin,
      isDeleted: false,
    });
    if (adminExists) continue;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(admin.password, salt);

    await User.create({ ...admin, password: hash });
  }
};

// Exports of this file.
module.exports = {
  createPublicFoldersIfNeeded,
  initializeAdmins,
};
