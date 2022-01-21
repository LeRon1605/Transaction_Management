const User = require('../DAO/User');
const jwt = require('jsonwebtoken');
const encodedToken = (userID) => {
    return jwt.sign({
        iss: 'Ron Le',
        sub: userID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3)
    }, 'LeRon');
}
class HomeController
{
    async Login(req, res, next)
    {
        const token = encodedToken(req.user._id.toString());
        res.cookie('jwt', token);
        return res.status(200).json({
            message: 'Login successful'
        })
    }
}

module.exports = new HomeController();