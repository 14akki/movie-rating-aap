const { createMovieRating, getAllMovieRating, getByIDMovieRating, updateMovieRating, deleteMovingRating, getbyname, ExportMovingRating } = require('../business/movieRating.business');
const { format } = require('date-fns');

const XLSX = require('xlsx');

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

//get by name;
const getByNameController = async (req, res) => {
    const { name } = req.params;
    const item = await getbyname(name);
    if (!item) {
        res.status(400).json({ message: "given Name not found" })
    } else {
        res.status(200).json(item)
    }
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
        let movieRatingData = await getByIDMovieRating(id);

        if (!movieRatingData) {
            return res.status(404).json({ message: "Movie rating not found" });
        }

        // to update particular field;
        // movieRatingData.earning = req.body.earning;

        //  Iterate over the keys in the request body and update the corresponding fields
        Object.keys(req.body).forEach(key => {
            movieRatingData[key] = req.body[key];
        });

        const updatedItem = await updateMovieRating(id, movieRatingData);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

//Delete;
const deleteControllerMovieRating = async (req, res) => {
    const { id } = req.params;
    const delelteData = await deleteMovingRating(id);
    try {
        if (!delelteData) {
            res.status(404).json({ message: "GIven data does not found" })
        } else {
            res.status(200).json({ message: "Data item deleted" })
        }

    } catch (error) {
        return res.status(500).json({ message: "An error occured", error: error.message });
    }
}

// Export in Excel file;

const ExportMovingRatingController = async (req, res) => {
    try {
        const MovingRatingItem = await ExportMovingRating();
        const workbook = XLSX.utils.book_new();

        const worksheet = XLSX.utils.json_to_sheet(MovingRatingItem);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Item');

        const buffer = XLSX.write(workbook, { bookType: "xlsx", type: 'buffer' });

        res.setHeader('Content-Disposition', 'attachment; filename= output.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet');

        res.send(buffer);

        console.log('excel file sent as a response');
    } catch (err) {
        res.send(err);
    }
}

//Import file -

const importMovieRatingController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: " No file uploaded" });
        }
        const workbook = XLSX.read(req.file.buffer);
        const sheetNames = workbook.SheetNames;

        const excelData = [];
        sheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            excelData.push(...jsonData);
        });
        res.json({ message: "Excel file uploaded", data: excelData });
    } catch (err) {
        console.error('Error in parsing Excel file', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    createContollerMovieRating,
    getAllControllerMovieRating,
    getByIdControllerMovieRating,
    updateContollerMovieRating,
    deleteControllerMovieRating,
    getByNameController,
    ExportMovingRatingController,
    importMovieRatingController,
}
