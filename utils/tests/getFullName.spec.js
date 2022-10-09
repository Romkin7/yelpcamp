const { getFullName } = require('../getFullName');

describe('Tests for function getFullName', () => {
    it('getFullName returns full name of user', () => {
        const user = {
            firstName: 'John',
            lastName: 'Doe',
        };

        const fullName = getFullName(user);

        expect(fullName).toEqual('John Doe');
    });
});
