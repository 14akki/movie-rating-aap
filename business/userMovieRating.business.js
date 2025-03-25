const user = require('../module/userMovieRating.schema');

const createUser = async (userData) => {
    try {
        const newUser = new user(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
}

const getByEmail = async (email) => {
    try {
        const findUserbyEmail = await user.findOne({ email: email });
        return findUserbyEmail;
    } catch (err) {
        throw err;
    }
}


module.exports = { createUser, getByEmail }