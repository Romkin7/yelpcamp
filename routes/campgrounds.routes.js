const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const Campground = require('../models/campgrounds.model');
const configCloudinary = require('../config/cloudinaryConfig');
const cloudinary = require('cloudinary');

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
        let uploadResponse = null;
        if (!request.body.cover) {
            await configCloudinary();
            const fileUrl = request.files.cover.tempFilePath;
            uploadResponse = await cloudinary.v2.uploader.upload(fileUrl);
        }
        const campground = new Campground();
        campground.title = request.body.title;
        campground.price = request.body.price;
        campground.cover.uri = uploadResponse?.secure_url || request.body.cover;
        campground.cover.publicId = uploadResponse?.public_id || null;
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
        let uploadResponse = null;
        if (!request.body.cover) {
            await configCloudinary();
            await cloudinary.v2.uploader.destroy(campground.cover.publicId);
            const fileUrl = request.files.cover.tempFilePath;
            uploadResponse = await cloudinary.v2.uploader.upload(fileUrl);
        }
        campground.title = title;
        campground.price = price;
        campground.description = description;
        campground.location = location;
        campground.cover.uri = uploadResponse?.secure_url
            ? uploadResponse.secure_url
            : request.body.cover;
        campground.cover.publicId = uploadResponse?.public_id || null;
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
        if (campground.cover.publicId) {
            await configCloudinary();
            await cloudinary.v2.uploader.destroy(campground.cover.publicId);
        }
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
