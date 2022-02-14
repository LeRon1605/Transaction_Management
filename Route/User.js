const express = require('express');
const route = express.Router();
const userController = require('../Controller/User');

const passport = require('passport');
const passportConfig = require('../Middleware/passport');
const authorization = require('../Middleware/authorization');

const { schemas, validator } = require('../Middleware/validator');
route
    .get('/', userController.getAllUsers)
    .post('/', validator(schemas.userSchema), userController.createUser)
    .delete('/', userController.removeAll)

route 
    .get('/:id/card', userController.getUserCards)

route
    .get('/:id', userController.getUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)

module.exports = route;