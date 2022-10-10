require('dotenv').config();
require('../config/dbConnection');

const Campground = require('../models/campgrounds.model');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./names');

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const campground = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: Math.floor(Math.random() * 100),
            cover: 'https://source.unsplash.com/random/300×300',
        });
        // eslint-disable-next-line no-await-in-loop
        await campground.save();
    }
};

mongoose.connection.once('open', () => {
    seedDB().then(() => {
        mongoose.connection.close();
    });
});
