const express = require('express');
const route = express.Router();
const transactionController = require('../Controller/Transaction');

route  
    .get('/', transactionController.getAll)
    .post('/', transactionController.makeTransaction)
    .delete('/', transactionController.deleteAll)

route
    .get('/:id', transactionController.getTransaction)
    .delete('/:id', transactionController.deleteTransaction)
module.exports = route;