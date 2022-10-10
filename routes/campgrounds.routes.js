const { Router } = require('express');
const router = Router();
const Campground = require('../models/campgrounds.model');

router.get('/campgrounds', async (request, response) => {
    try {
        const campgrounds = await Campground.find({})
            .sort({ createdAt: -1 })
            .limit(8);
        return response.render('campgrounds/index', { campgrounds });
    } catch (error) {
        return response.send(error);
    }
});

router.get('/campgrounds/new', (request, response) => {
    return response.render('campgrounds/new');
});

router.post('/campgrounds', async (request, response) => {
    try {
        const campground = new Campground();
        campground.title = request.body.title;
        campground.price = request.body.price;
        campground.cover = request.body.cover;
        campground.description = request.body.description;
        campground.location = request.body.location;
        const newCampground = await campground.save();
        return response.redirect(`/campgrounds/${newCampground._id}`);
    } catch (error) {
        return response.status(422).send({ message: error.message });
    }
});

router.get('/campgrounds/:id', async (request, response) => {
    try {
        const campground = await Campground.findById(request.params.id);
        return response.render('campgrounds/show', { campground });
    } catch (error) {
        return response.send(error);
    }
});

module.exports = router;
