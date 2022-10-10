const Campground = require('../../models/campgrounds.model');
const createCampGrounds = require('../../seeds/createCampgrounds');
const mongoose = require('mongoose');

beforeAll(async () => {
    await createCampGrounds();
});

describe('Tests for campgrounds routes', () => {
    it('get all campgrounds returns 10 latest campgrounds', async () => {
        const campgrounds = await Campground.find({})
            .sort({ createdAt: -1 })
            .limit(10);

        expect(campgrounds).toHaveLength(10);
    });
});

afterAll(async () => {
    await Campground.deleteMany({});
    mongoose.connection.close();
});
