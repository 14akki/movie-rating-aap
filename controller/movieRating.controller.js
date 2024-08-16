const { createMovieRating, getAllMovieRating, getByIDMovieRating, updateMovieRating } = require('../business/movieRating.business');
const { format } = require('date-fns');

//Create 
const createContollerMovieRating = async (req, res) => {
    const newItem = {
        moviename: req.body.moviename,
        releasedata: req.body.releasedata,
        review: req.body.review,
        directoryname: req.body.directoryname,
        productionhouse: req.body.productionhouse,
        earning: req.body.earning,
        budget: req.body.budget,
        movieid: req.body.movieid,
        createdat: format(new Date(), 'yyy-MM-dd HH:mm')
    };
    const Item = await createMovieRating(newItem);
    res.status(200).json(Item);
}

//get ALL
const getAllControllerMovieRating = async (req, res) => {
    const Item = await getAllMovieRating();
    res.status(200).json(Item);
}


// Get by ID
const getByIdControllerMovieRating = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await getByIDMovieRating(id);
        if (!item) {
            res.status(404).json({ message: 'Given ID not found!!' });
        } else {
            res.status(200).json(item);
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the data.', error: error.message });
    }
}

//Update moving rating;
const updateContollerMovieRating = async (req, res) => {
    try {
        const { id } = req.params;
        let movieRatingData = await getItemById(id);

        if (!movieRatingData) {
            return res.status(404).json({ message: "Movie rating not found" });
        }

        // to update particular field;
        // movieRatingData.earning = req.body.earning;

        //  Iterate over the keys in the request body and update the corresponding fields
        Item.keys(req.body).forEach(key => {
            movieRatingData[key] = req.body[key];
        });

        const updatedItem = await updateMovieRating(id, movieRatingData);
        return res.status(200).json(updatedItem);
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }

}


module.exports = {
    createContollerMovieRating,
    getAllControllerMovieRating,
    getByIdControllerMovieRating,
    updateContollerMovieRating,
}
