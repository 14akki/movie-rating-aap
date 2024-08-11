const Item = require('../module/movie.schema');

//Create
const createMovieRating = async (MovieData) => {
    try {
        const newMovieRating = new Item(MovieData);
        await newMovieRating.save();
        return newMovieRating;
    } catch (err) {
        throw err;
    }
}

//get

// const getAllMovieRating = async (MovieData) => {
//     try {
//         const allMovieRating= await Item.find();
//         return allMovieRating;
//     } catch (err) {
//         throw err;
//     }
// }


module.exports = {
    createMovieRating,
}