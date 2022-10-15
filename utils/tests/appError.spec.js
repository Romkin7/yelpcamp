const AppError = require('../AppError');

describe('Tests for AppError class', () => {
    it('AppError returns new AppError class with status and message', () => {
        const error = {
            status: 404,
            resourceName: 'Misty Lake',
            key: 'notFound',
        };

        const AppErrorObject = new AppError(error);

        expect(AppErrorObject).toMatchObject({
            message: 'Misty Lake campground not found.',
            status: 404,
            trace: undefined,
        });
    });
    it('AppError returns new AppError class with status default status', () => {
        const error = {
            resourceName: 'Misty Lake',
            key: 'notFound',
        };

        const AppErrorObject = new AppError(error);

        expect(AppErrorObject).toMatchObject({
            message: 'Misty Lake campground not found.',
            status: 500,
            trace: undefined,
        });
    });
    it('AppError returns new AppError class with status default status', () => {
        const error = {
            status: 404,
            key: 'notFound',
        };

        const AppErrorObject = new AppError(error);

        expect(AppErrorObject).toMatchObject({
            message: 'Requested campground not found.',
            status: 404,
            trace: undefined,
        });
    });
    it('AppError returns new AppError class with status default status', () => {
        const error = {
            status: 404,
            key: 'notFound',
        };

        const AppErrorObject = new AppError(error);

        expect(AppErrorObject).toMatchObject({
            message: 'Requested campground not found.',
            status: 404,
            trace: undefined,
        });
    });
});
