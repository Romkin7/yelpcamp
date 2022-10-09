const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },
    cover: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: false
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);
