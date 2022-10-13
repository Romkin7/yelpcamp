const { response } = require('express');

class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
    getErrorResponse() {
        return response(this.status).send(this.message);
    }
}

module.exports = AppError;
