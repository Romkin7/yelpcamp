const Campground = require('../models/campgrounds.model');
const cities = require('./cities');
const { places, descriptors } = require('./names');

const sample = (array) => array[Math.floor(Math.random() * array.length)];
async function createCampGrounds() {
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const campground = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: Math.floor(Math.random() * 100),
            cover: { uri: 'https://source.unsplash.com/random/?city,night' },
            description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima dolorem ipsa expedita quae quibusdam ipsam ullam amet sunt magni rem. Error vero aperiam hic est delectus facere cumque perspiciatis veritatis.',
        });
        // eslint-disable-next-line no-await-in-loop
        await campground.save();
    }
}

module.exports = createCampGrounds;
