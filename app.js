require('dotenv').config();
require('./config/dbConnection');
const express = require('express');
const app = express();
const path = require('path');
const { formatDistance } = require('date-fns');
const expressFileUpload = require('express-fileupload');
const methodOverRide = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const pkg = require('./package.json');
// require routes
const campgroundsRoutes = require('./routes/campgrounds.routes');
const AppError = require('./utils/AppError');
//Set ip and port
app.set('port', process.env.PORT || 8080);
app.set('ip', process.env.IP || '127.0.0.1');
//Set up static folder
app.use(express.static(path.join(__dirname + '/public'), { maxAge: 0 }));
// set view engine to be ejs & enable views folder to be accessible from any location.
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    expressFileUpload({ useTempFiles: true, safeFileNames: true, debug: true }),
);
app.use(morgan('tiny'));
app.use(methodOverRide('_method'));
app.locals.getDaysAgo = function (inputDate) {
    return formatDistance(new Date(inputDate), new Date(), {
        addSuffix: true,
    });
};
app.locals.appTitle = 'YelpCamp';
app.locals.appAuthor = pkg.author;
// use routes
app.use(campgroundsRoutes);
// homepage route
app.get('/', (req, res) => {
    res.render('home');
});
// Not found error handler
app.all('*', (req, res, next) => {
    return next(new AppError(`Page ${req.baseUrl} not found!`, 404));
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, _next) => {
    const { statusCode = 500 } = error;
    if (!error.message) error.message = 'Oh No, Something Went Wrong!';
    return response.status(statusCode).render('errorPage', { error });
});
// Listen on port 8080
const server = app.listen(8080, () => {
    // eslint-disable-next-line no-console
    console.info(
        `YelpCamp server staarted on ip ${app.get('ip')} and port ${app.get(
            'port',
        )}...`,
    );
});

module.exports = server;
