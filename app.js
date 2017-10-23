'use strict';

var express = require('express');
var app = express();
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var ejs = require('ejs');
// var expressLayouts = require('express-ejs-layouts');

// init the config params:
if (process.env.NODE_ENV === 'production') {
    return console.error('Production environment is not set');
} else {
    require('./config/development');
}

app.set('view engine', 'ejs');
// app.use(expressLayouts);
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/index')(app);

app.listen(parseInt(process.env.PORT, 10), function() {
    console.log('NodeJS Express Server was started and listen on port', process.env.PORT);
    console.log(process.env.HOSTNAME);
});