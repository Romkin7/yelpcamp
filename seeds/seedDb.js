require('dotenv').config();
require('../config/dbConnection');

const mongoose = require('mongoose');
const Campground = require('../models/campgrounds.model');
const createCampGrounds = require('./createCampgrounds');

const seedDB = async () => {
    await Campground.deleteMany({});
    await createCampGrounds();
};

mongoose.connection.once('open', () => {
    seedDB().then(() => {
        mongoose.connection.close();
    });
});
