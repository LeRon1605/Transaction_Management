const express = require('express');
const route = express.Router();
const userRoute = require('./User');
const homeRoute = require('./Home');
const cardRoute = require('./Card');
const transactionRoute = require('./Transaction');
function processRoute(app){
    app.use('/', homeRoute);
    app.use('/user', userRoute);
    app.use('/card', cardRoute);
    app.use('/transaction', transactionRoute);

    // 404 handler
    app.use((req, res, next) => {
        const err = new Error('Not found page');
        err.status = 404;
        next(err);
    })

    app.use((err, req, res, next) => {
        const status = err.status || 500;
        return res.status(status).json({
            message: err.message
        })
    })
}

module.exports = processRoute;