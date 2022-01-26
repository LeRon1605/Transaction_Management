const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoClient = require('mongoose');
const db = require('./DAO/connect');
const routes = require('./Route/index');

db.connect();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

routes(app);

app.listen(3000, () => {
    console.log("success");
})