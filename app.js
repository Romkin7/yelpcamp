require('dotenv').config();
require('./config/dbConnection');
const express = require('express');
const app = express();
const path = require('path');
const methodOverRide = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// require routes
const campgroundsRoutes = require('./routes/campgrounds.routes');
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
app.use(morgan('tiny'));
app.use(methodOverRide('_method'));
app.locals.appTitle = 'YelpCamp';
// use routes
app.use(campgroundsRoutes);
/** Swagger api docs */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Not found error handler
app.use('*', (request, response) => {
    return response.status(404).render('404');
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
