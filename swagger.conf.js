require('dotenv').config();
const swaggerAutogen = require('swagger-autogen');
const pkg = require('./package.json');
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/*.js'];

const doc = {
    info: {
        version: pkg.version,
        title: pkg.name,
        description: pkg.description,
    },
    host: 'localhost:8080',
    basePath: '/',
    schemes: ['http', 'https'],
    consumes: ['application/x-www-form-urlencoded', 'multipart/form-data'],
    produces: ['application/json', 'text/html'],
    tags: [
        {
            name: 'YelpCamp REST API',
            description: 'Endpoints',
        },
    ],
    securityDefinitions: {
        AccessToken: {
            type: 'jwt', // JWT type
            in: 'header', // can be "header"
            name: 'Authorization', // name of the header
            description: 'Bearer accessKey',
        },
    },
    definitions: {
        Campground: {
            title: 'Blueberry Hills',
            price: 23,
            cover: 'https://source.unsplash.com/random/?city,night',
            location: 'Kearny, New Jersey',
            slug: 'blueberry-hills-kearny-new-jersey',
            keywords: ['Blueberry', 'Hills', 'Kearny', 'New Jersey'],
        },
    },
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
