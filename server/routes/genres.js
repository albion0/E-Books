// Imports: third-party packages.
const express = require('express');
const router = express.Router();

// Imports: local files.
const authorize = require('../middlewares/authorizeUser');
const protect = require('../middlewares/protect');
const { Admin } = require('../middlewares/roles');
const { getAll, getOne, create, updateOne, deleteOne } = require('../controllers/genres');
const {
  getAllGenres,
  createGenre,
  updateGenre,
  validateGenreId,
} = require('../validations/genres');
const { validate } = require('../utils/functions');

// Mount routes accordingly.
router.route('/').get(validate(getAllGenres), getAll);
router.route('/').post(authorize, protect(Admin), validate(createGenre), create);

router.route('/:genreId').get(validate(validateGenreId), getOne);
router.route('/:genreId').put(authorize, protect(Admin), validate(updateGenre), updateOne);
router.route('/:genreId').delete(authorize, protect(Admin), validate(validateGenreId), deleteOne);

// Exports of this file.
module.exports = router;
