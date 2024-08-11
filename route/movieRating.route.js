const express = require('express');
const router = express.Router();

const { createContollerMovieRating } = require('../controller/movieRating.controller');



router.post('/create', createContollerMovieRating);

module.exports = router;