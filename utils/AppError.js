const capgroundErrors = require('../config/errorMessages');

class AppError {
    constructor({ status = 500, key, resourceName = 'Requested', trace }) {
        this.message = capgroundErrors[key].replace(
            'Placeholder',
            resourceName,
        );
        this.status = status;
        this.trace = trace;
    }
}

module.exports = AppError;
