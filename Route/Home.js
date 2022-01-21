const express = require('express');
const route = express.Router();
const homeController = require('../Controller/Home');

const passport = require('passport');
const passportConfig = require('../Middleware/passport');

route
    .post('/login', passport.authenticate('local', { session: false }), homeController.Login)
module.exports = route;