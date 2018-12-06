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

// seperate route functions.
let errFn = (err, req, res, next) => {
    console.error(err.stack);
    next(err);
      /*
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
    */
};

app.use(errFn); // set error handler.

let fn1 = (req, res, next) => {
    console.log('enter fn1');
    if (!req.p1) {
        console.log('step next route');
        next('route'); // step next route
    }
    console.log('fn1 called.');
    next();
};
let fn2 = (req, res, next) => {
    console.log('enter fn2');
    if (!req.p2) {
        console.log('step next route');
        next('route'); // step next route
    }
    console.log('fn2 called.');
    next();
};


// routes.
app.get('/', fn1, fn2, function(req, res, next) {
    console.log('last method called.');
    res.send('success!');
});

// start server.
var server = app.listen(app.get('port'), function () {
    var appName = 'node-express-jwt';
    var portName = '3000';
    console.log(appName + ' listening on port ' + portName);
});