//All call -
const express= require('express');
const app= express();
const mongoose= require('mongoose');

//movie router;
const movieRatingRouter= require('./route/movieRating.route');


//Global mount(trigger);
app.use(express.json());

app.use('/movieRating', movieRatingRouter);



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
PORT_NO= process.env.PORT_NO;
app.listen(PORT_NO, () => {
    console.log(`Application is running on Port number ${PORT_NO}`);
});
