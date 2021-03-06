const express = require('express');
const route = express.Router();
const cardController = require('../Controller/Card');

const { schemas, validator } = require('../Middleware/validator');
route
    .get('/', cardController.getAll)
    .post('/', validator(schemas.cardSchema), cardController.createCard)
    .delete('/', cardController.deleteAll)

route
    .get('/:id/owner', cardController.getOwner)
route
    .get('/:id', cardController.getCard)
    .put('/:id', cardController.updateCard)
    .delete('/:id', cardController.deleteCard)

route
    .get('/:id/transaction', cardController.getTransaction)
module.exports = route;