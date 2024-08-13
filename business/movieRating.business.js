const Item = require('../module/movie.schema');

//Create-
const createMovieRating = async (MovieData) => {
    try {
        const newMovieRating = new Item(MovieData);
        await newMovieRating.save();
        return newMovieRating;
    } catch (err) {
        throw err;
    }
}

//get ALL-
const getAllMovieRating = async () => {
    try {
        const allMovieRating = await Item.find();
        return allMovieRating;
    } catch (err) {
        throw err;
    }
}

//get by ID-
const getByIDMovieRating = async (id) => {
    try {
        const ByIdMovieRating = await Item.findById(id);
        return ByIdMovieRating;
    } catch (err) {
        throw err;
    }
}


//Update the movie earning by 50cr by finding it by its name ;
const updateEarningMovieRating = async (id, updateEarningMovie) => {
    try {
        const updatedMovieRating = await Item.findByIdAndUpdate(id, updateEarningMovie, { new: true });
        if (!updatedMovieRating) {
            throw new Error("Item not found");
        }
        return updatedMovieRating;
    } catch (err) {
        console.error('Error updating item:', err);
        throw new Error('Unable to update Item');
    }
}

//Delelte

module.exports = {
    createMovieRating,
    getAllMovieRating,
    getByIDMovieRating,
    updateEarningMovieRating,
}