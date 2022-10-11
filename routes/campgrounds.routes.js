const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
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
        campground.cover = 'https://source.unsplash.com/random/?city,night';
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
        return response.status(404).json({ message: 'Campground not found!' });
    }
});

router.get('/campgrounds/:id/edit', async (request, response) => {
    try {
        const campground = await Campground.findById(request.params.id);
        return response.render('campgrounds/edit', { campground });
    } catch (error) {
        return response.status(404).json({ message: 'Campground not found!' });
    }
});

router.put('/campgrounds/:id', async (request, response) => {
    try {
        const { title, location, price, description } = request.body;
        const campground = await Campground.findById(request.params.id);
        campground.title = title;
        campground.price = price;
        campground.description = description;
        campground.location = location;
        campground.cover = 'https://source.unsplash.com/random/?city,night';
        const updatedCampground = await campground.save();
        return response.redirect(`/campgrounds/${updatedCampground._id}`);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return response.status(422).json({ message: error.message });
        }
        return response.status(404).json({ message: 'Campground not found!' });
    }
});

router.delete('/campgrounds/:id', async (request, response) => {
    try {
        const campground = await Campground.findById(request.params.id);
        await campground.delete();
        return response.redirect('/campgrounds');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return response.status(422).json({ message: error.message });
        }
        return response.status(404).json({ message: 'Campground not found!' });
    }
});

module.exports = router;
