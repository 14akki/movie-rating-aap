const express = require('express');
const router = express.Router();

const { createUserController, getByEmailController } = require('../controller/userMovingRating.controller');

router.post('/createuser', createUserController);

router.get('/getbyemail/:email', getByEmailController);


module.exports = router;