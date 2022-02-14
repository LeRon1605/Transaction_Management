const express = require('express');
const route = express.Router();
const transactionController = require('../Controller/Transaction');

const { validator, schemas } = require('../Middleware/validator');
route  
    .get('/', transactionController.getAll)
    .post('/', validator(schemas.transactionSchema), transactionController.makeTransaction)
    .delete('/', transactionController.deleteAll)

route
    .get('/:id', transactionController.getTransaction)
    .delete('/:id', transactionController.deleteTransaction)
module.exports = route;