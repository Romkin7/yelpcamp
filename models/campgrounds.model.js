const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: false,
        },
        price: {
            type: Number,
            required: true,
        },
        cover: {
            uri: {
                type: String,
                required: true,
                trim: true,
            },
            publicId: {
                type: String,
                required: false,
                trim: true,
            },
        },
        description: {
            type: String,
            required: false,
            trim: false,
        },
        location: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Campground', CampgroundSchema);
