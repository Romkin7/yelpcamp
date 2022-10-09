const Campground = require('../campgrounds.model');

describe('Tests for campgrounds model', () => {
    it('Campground is created in database', () => {
        // expect that five assertios will be made
        expect.assertions(5);
        // Initialize campground
        const campground = new Campground({
            title: 'Test campground 1',
            cover: 'https://www.unsplash.com/someimageurl',
            price: 34,
            description: 'Some test description of this campground.',
            location: '110 MainStreet, New York',
        });

        expect(campground.title).toEqual('Test campground 1');
        expect(campground.cover).toEqual(
            'https://www.unsplash.com/someimageurl',
        );
        expect(campground.price).toEqual(34);
        expect(campground.description).toEqual(
            'Some test description of this campground.',
        );
        expect(campground.location).toEqual('110 MainStreet, New York');
    });
});
