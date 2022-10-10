const Campground = require('../../models/campgrounds.model');
const createCampGrounds = require('../../seeds/createCampgrounds');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

describe('Tests for campgrounds routes', () => {
    beforeAll(async () => {
        await createCampGrounds();
    });
    afterAll(async () => {
        await Campground.deleteMany({});
        mongoose.connection.close();
    });
    it('get request to /campgrounds returns campgrounds array', async () => {
        const response = await request(app).get('/campgrounds');
        expect(response.statusCode).toEqual(200);
        expect(response.text).toBeTruthy();
    });
    it('get request to /campgrounds/new returns page with form', async () => {
        const response = await request(app).get('/campgrounds/new');
        expect(response.statusCode).toEqual(200);
        expect(response.text).toBeTruthy();
    });
    it('post request to /campgrounds returns newely created campground', async () => {
        const response = await request(app)
            .post('/campgrounds')
            .send({
                location: `Toronto, Canada`,
                title: `Windy hollows`,
                price: Math.floor(Math.random() * 100),
                cover: 'https://source.unsplash.com/random/?city,night',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima dolorem ipsa expedita quae quibusdam ipsam ullam amet sunt magni rem. Error vero aperiam hic est delectus facere cumque perspiciatis veritatis.',
            });
        expect(response.statusCode).toEqual(302);
        expect(response.text).toBeTruthy();
    });
    it('post request to /campgrounds returns newely created campground', async () => {
        const response = await request(app)
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
        expect(response.body).toStrictEqual({
            message:
                'Campground validation failed: title: Path `title` is required.',
        });
    });
});
