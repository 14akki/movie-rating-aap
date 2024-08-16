const express = require('express');
const router = express.Router();

const { createContollerMovieRating, getAllControllerMovieRating, getByIdControllerMovieRating,
    updateContollerMovieRating } = require('../controller/movieRating.controller');



router.post('/create', createContollerMovieRating);
router.get('/getallmovie', getAllControllerMovieRating);
router.get('/getmovieby/:id', getByIdControllerMovieRating);
router.patch('/updateAllData/:id', updateContollerMovieRating);


module.exports = router;