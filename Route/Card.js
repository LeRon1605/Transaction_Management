const express = require('express');
const route = express.Router();
const cardController = require('../Controller/Card');

route
    .get('/', cardController.getAll)
    .post('/', cardController.createCard)
    .delete('/', cardController.deleteAll)

route
    .get('/:id/owner', cardController.getOwner)
route
    .get('/:id', cardController.getCard)
    .put('/:id', cardController.updateCard)
    .delete('/:id', cardController.deleteCard)
module.exports = route;