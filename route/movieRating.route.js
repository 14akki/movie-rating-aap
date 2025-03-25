const express = require('express');
const router = express.Router();


const { createContollerMovieRating, getAllControllerMovieRating, getByIdControllerMovieRating,
    updateContollerMovieRating, deleteControllerMovieRating, getByNameController, ExportMovingRatingController,
    importMovieRatingController} = require('../controller/movieRating.controller');
    
    const multer= require('multer');
    const fs= require('fs');
    const storage= multer.memoryStorage();
    const upload= multer({storage});
    

router.post('/create', createContollerMovieRating);
router.get('/getallmovie', getAllControllerMovieRating);
router.get('/getmovieby/:id', getByIdControllerMovieRating);
router.put('/updateAllData/:id', updateContollerMovieRating);
router.delete('/deleteDatabyID/:id', deleteControllerMovieRating);
router.get('/getbyname/:name', getByNameController);
router.get('/export', ExportMovingRatingController);
router.post('/import', upload.single('excelData'), importMovieRatingController);


module.exports = router;