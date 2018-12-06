const path = require('path');

// setup root path. required in main entrypoint js file.
process.env['ROOT_PATHS'] = path.dirname(require.main.filename);

// required for seperate js module to access root path.
const rootPath = process.env['ROOT_PATHS'];

const publicPath = path.join(rootPath, 'public');

const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// create express instance.
var app = express();

// if change favicon.ico required to restart server.
app.use(favicon(path.join(publicPath, 'favicon.ico')));
// logger (morgan).
app.use(logger('dev'));
// helmet.
app.use(helmet());
// body parser.
app.use(bodyParser.json());
// extended must be true. If extended is false, you can not post "nested object".
app.use(bodyParser.urlencoded({ extended: true }));
// cookie parser.
app.use(cookieParser());

// setup port
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res, next) {
    res.send('success!');
});

// start server.
var server = app.listen(app.get('port'), function () {
    var appName = 'node-express-jwt';
    var portName = '3000';
    console.log(appName + ' listening on port ' + portName);
});