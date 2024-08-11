const { createMovieRating } = require('../business/movieRating.business');
const { format } = require('date-fns');

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


module.exports = {
    createContollerMovieRating,
}
