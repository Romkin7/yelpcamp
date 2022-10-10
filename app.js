require('dotenv').config();
require('./config/dbConnection');
const express = require('express');
const app = express();
const path = require('path');
const methodOverRide = require('method-override');
// require routes
const campgroundsRoutes = require('./routes/campgrounds.routes');
//Set ip and port
app.set('port', process.env.PORT || 8080);
app.set('ip', process.env.IP || '127.0.0.1');
//Set up static folder
app.use(express.static(path.join(__dirname + '/public'), { maxAge: 0 }));
// set view engine to be ejs & enable views folder to be accessible from any location.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverRide('_method'));
app.locals.appTitle = 'YelpCamp';
// use routes
app.use(campgroundsRoutes);
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
