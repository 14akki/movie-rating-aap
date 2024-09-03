const { getByEmail } = require('../business/userMovieRating.business');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
require('dotenv').config();

const verifyPassword = (userInputPassword, hashedPassword) => {
    const convertedInputPassword = md5(userInputPassword);
    return convertedInputPassword == hashedPassword;
}



const verifyLoginController = async (req, res) => {
    const { email, password } = req.body;

    const userInfo = await getByEmail(email);
    if (!verifyPassword(password, userInfo.password)) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Authentical successful', token });
}



module.exports = verifyLoginController ;


// const { getByEmail } = require('../business/userMovieRating.business');
// const jwt = require('jsonwebtoken');
// const md5 = require('md5');
// require('dotenv').config();

// // Function to verify password
// const verifyPassword = (userInputPassword, hashedPassword) => {
//     const convertedInputPassword = md5(userInputPassword);
//     return convertedInputPassword === hashedPassword;
// };

// // Controller for verifying login
// const verifyLoginController = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const userInfo = await getByEmail(email);

//         if (!userInfo) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         if (!verifyPassword(password, userInfo.password)) {
//             return res.status(401).json({ message: 'Authentication failed' });
//         }

//         const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
//         res.json({ message: 'Authentication successful', token });
//     } catch (error) {
//         console.error('Error during authentication:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// module.exports = verifyLoginController // Correct export

