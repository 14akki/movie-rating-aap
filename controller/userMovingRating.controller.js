const { createUser, getByEmail } = require('../business/userMovieRating.business');

const { format } = require('date-fns');
const md5 = require('md5');

const createUserController = async (req, res) => {
    const userInfo = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: md5(req.body.password),
        createdat: format(new Date(), 'yyy-MM-dd HH:mm')
    }
    const item = await createUser(userInfo);
    res.status(200).json(item)
}


const getByEmailController = async (req, res) => {
    const { email } = req.params;
    const item = await getByEmail(email);
    if (!item) {
        res.status(404).json({ message: 'given Name not found!!' });
    } else {
        res.status(200).json(item)
    }
}

module.exports = { createUserController, getByEmailController };