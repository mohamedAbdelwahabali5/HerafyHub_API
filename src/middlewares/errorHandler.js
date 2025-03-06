// General middleware for handling errors and sending appropriate responses
const APIError = require('../utils/errors/APIError');

const asyncHandler = (api) => {
    return async (req, res, next) => {
        try {
            await api(req, res, next);
        } catch (err) {
            const error = new APIError(err.message, 500);
            return res.status(500).json(error.toJSON());
        }
    }
}

module.exports = asyncHandler;