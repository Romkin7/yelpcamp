const Campground = require('../../models/campgrounds.model');
const createCampGrounds = require('../../seeds/createCampgrounds');
const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../../app');

describe('Tests for campgrounds routes', () => {
    let campgroundId;
    beforeAll(async () => {
        await createCampGrounds();
    });
    afterAll(async () => {
        await Campground.deleteMany({});
        mongoose.connection.close();
        server.close();
    });
    it('get request to /campgrounds returns campgrounds array', async () => {
        const response = await request(server).get('/campgrounds');
        expect(response.statusCode).toEqual(200);
        expect(response.text).toBeTruthy();
    });
    it('get request to /campgrounds/new returns page with form', async () => {
        const response = await request(server).get('/campgrounds/new');
        expect(response.statusCode).toEqual(200);
        expect(response.text).toBeTruthy();
    });
    it('post request to /campgrounds returns newely created campground', async () => {
        const response = await request(server)
            .post('/campgrounds')
            .send({
                location: `Toronto, Canada`,
                title: `Windy hollows`,
                price: Math.floor(Math.random() * 100),
                cover: 'https://source.unsplash.com/random/?city,night',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima dolorem ipsa expedita quae quibusdam ipsam ullam amet sunt magni rem. Error vero aperiam hic est delectus facere cumque perspiciatis veritatis.',
            });
        campgroundId = response.header.location.split('/')[2];
        expect(response.statusCode).toEqual(302);
        expect(response.text).toBeTruthy();
    });
    it('post request to /campgrounds with invalid data, does not create a campground', async () => {
        const response = await request(server)
            .post('/campgrounds')
            .send({
                location: `Toronto, Canada`,
                title: undefined,
                price: Math.floor(Math.random() * 100),
                cover: 'https://source.unsplash.com/random/?city,night',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima dolorem ipsa expedita quae quibusdam ipsam ullam amet sunt magni rem. Error vero aperiam hic est delectus facere cumque perspiciatis veritatis.',
            });
        expect(response.statusCode).toEqual(422);
        expect(response.text).toBeTruthy();
    });
    it('get request to /campgrounds/:id returns a campground', async () => {
        const response = await request(server).get(
            `/campgrounds/${campgroundId}`,
        );
        expect(response.statusCode).toEqual(200);
        expect(response.text).toBeTruthy();
    });
    it('get request to /campgrounds/:id with invalid id returns a error', async () => {
        const response = await request(server).get(
            `/campgrounds/${campgroundId}5`,
        );
        expect(response.statusCode).toEqual(404);
        expect(response.body).toStrictEqual({
            message: 'Campground not found!',
        });
    });
    it('get request to /campgrounds/:id/edit returns a campground', async () => {
        const response = await request(server).get(
            `/campgrounds/${campgroundId}/edit`,
        );
        expect(response.statusCode).toEqual(200);
        expect(response.text).toBeTruthy();
    });
    it('get request to /campgrounds/:id/edit with invalid id returns a error', async () => {
        const response = await request(server).get(
            `/campgrounds/${campgroundId}5/edit`,
        );
        expect(response.statusCode).toEqual(404);
        expect(response.body).toStrictEqual({
            message: 'Campground not found!',
        });
    });
    it('put request to /campgrounds/:id updates campground', async () => {
        const response = await request(server)
            .put(`/campgrounds/${campgroundId}`)
            .send({
                location: `Toronto, Canada`,
                title: `Sandy hollows`,
                price: Math.floor(Math.random() * 100),
                cover: 'https://source.unsplash.com/random/?city,night',
                description:
                    'Lorem ipsum dolor sit amet, set consectetur adipisicing elit. Minima dolorem ipsa expedita quae quibusdam ipsam ullam amet sunt magni rem. Error vero aperiam hic est delectus facere cumque perspiciatis veritatis.',
            });
        expect(response.statusCode).toEqual(302);
        expect(response.text).toBeTruthy();
    });
    it('put request to /campgrounds/:id with invalid id returns a error', async () => {
        const response = await request(server)
            .put(`/campgrounds/${campgroundId}5`)
            .send({
                location: `Toronto, Canada`,
                title: `Sandy hollows`,
                price: Math.floor(Math.random() * 100),
                cover: 'https://source.unsplash.com/random/?city,night',
                description:
                    'Lorem ipsum dolor sit amet, set consectetur adipisicing elit. Minima dolorem ipsa expedita quae quibusdam ipsam ullam amet sunt magni rem. Error vero aperiam hic est delectus facere cumque perspiciatis veritatis.',
            });
        expect(response.statusCode).toEqual(400);
        expect(response.body).toStrictEqual({
            message: 'Campground not found!',
        });
    });
    it('put request to /campgrounds/:id with invalid title returns an error', async () => {
        const response = await request(server)
            .put(`/campgrounds/${campgroundId}`)
            .send({
                location: `Toronto, Canada`,
                title: null,
                price: Math.floor(Math.random() * 100),
                cover: 'https://source.unsplash.com/random/?city,night',
                description:
                    'Lorem ipsum dolor sit amet, set consectetur adipisicing elit. Minima dolorem ipsa expedita quae quibusdam ipsam ullam amet sunt magni rem. Error vero aperiam hic est delectus facere cumque perspiciatis veritatis.',
            });
        expect(response.statusCode).toEqual(422);
        expect(response.body).toStrictEqual({
            message:
                'Campground validation failed: title: Path `title` is required.',
        });
    });
    it('delete request to /campgrounds/:id with invalid id returns a error', async () => {
        const response = await request(server).delete(
            `/campgrounds/${campgroundId}5`,
        );
        expect(response.statusCode).toEqual(404);
        expect(response.body).toStrictEqual({
            message: 'Campground not found!',
        });
    });
    it('delete request to /campgrounds/:id deletes a campground', async () => {
        const response = await request(server).delete(
            `/campgrounds/${campgroundId}`,
        );
        expect(response.statusCode).toEqual(302);
        expect(response.text).toBeTruthy();
    });
});
