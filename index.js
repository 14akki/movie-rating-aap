//All call -
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//movie router;
const movieRatingRouter = require('./route/movieRating.route');

const userRouter = require('./route/userMovieRating.route')

const verifylogin = require('./controller/login.controller');

const { validateJWT } = require('./middleware/verifyJWT');

//Global mount(trigger);
app.use(express.json());


app.use('/movieRating', validateJWT, movieRatingRouter);



app.use('/user', userRouter);



app.use('/auth', verifylogin)



//MongoDB connection-
require('dotenv').config();
const database_Url = process.env.DATABASE_URL;
mongoose.connect(database_Url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//Port no and listen-
PORT_NO = process.env.PORT_NO;
app.listen(PORT_NO, () => {
    console.log(`Application is running on Port number ${PORT_NO}`);
});
