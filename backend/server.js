﻿
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var appConfig = require('./app/appConfig');

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 9911;

/*******************************
API
*******************************/
var apiRouter = express.Router();

apiRouter.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use('/api_v1', apiRouter);


require('./app/routers/machines').initialize(apiRouter);

app.listen(port);
console.log('Sky server is running on port ' + port);
