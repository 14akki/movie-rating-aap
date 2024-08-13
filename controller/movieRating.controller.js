const { createMovieRating, getAllMovieRating, getByIDMovieRating, updateEarningMovieRating } = require('../business/movieRating.business');
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

//Update the movie earning by 50cr by finding it by its name ;

// const updateEarningMovieRatingController = async (req, res) => {
//     const { id } = req.params;
//     try {
//         let itemData = await updateEarningMovieRating(id);
//         itemData.earning = req.body.earning;
//         const item =await  updateItemById(id, itemData);
//         if (!item) {
//             res.status(404).json({ message: "Given Item id not exist" });
//         } else {
//             res.json(item)
//         }
//     } catch (error) {
//         res.status(500).json({ message: "an error  occured while fetching the data", error: error.message });
//     }
// }

const updateEarningMovieRatingController = async (req, res) => {
    const { id } = req.params;
    const { earning } = req.body;  // Extract the new earning value from the request body
    
    try {
        // Get the current item data
        let itemData = await updateEarningMovieRating(id);  // This line should correctly get the current data
        
        if (!itemData) {
            return res.status(404).json({ message: "Given Item ID does not exist" });
        }

        // Update the earning field
        itemData.earning = earning;

        // Save the updated item data back to the database
        const updatedItem = await updateItemById(id, itemData);
        
        // Respond with the updated item
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the data", error: error.message });
    }
}

module.exports = {
    createContollerMovieRating,
    getAllControllerMovieRating,
    getByIdControllerMovieRating,
    updateEarningMovieRatingController,
}
