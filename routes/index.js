'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(app) {
    function pageNotFoundErrorHandler(req, res, next) {
        res.status(404).send('Page Not Found');
    }

    function errorHandler(err, req, res, next) {
        var nodeEnv = process.env.NODE_ENV;
        var status = err.status || 500;
        var resJSON = {};

        if (nodeEnv === 'production') {
            resJSON.error = 'Internal Server Error!';
        } else {
            resJSON.error = err.message || 'Something went wrong!';
            resJSON.stack = err.stack || '';
        }
        res.status(status).send(resJSON);
    }

    router.get('/', function(req, res) {
        res.render('index', {title: 'Hello World!'});
    });

    app.use(router);
    app.use(pageNotFoundErrorHandler);
    app.use(errorHandler)
};