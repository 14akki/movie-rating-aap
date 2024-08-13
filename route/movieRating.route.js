const express = require('express');
const router = express.Router();

const { createContollerMovieRating, getAllControllerMovieRating, getByIdControllerMovieRating,
    updateEarningMovieRatingController} = require('../controller/movieRating.controller');



router.post('/create', createContollerMovieRating);
router.get('/getallmovie', getAllControllerMovieRating);
router.get('/getmovieby/:id', getByIdControllerMovieRating);
router.put('/updateMovieRating/:id', updateEarningMovieRatingController);


module.exports = router;