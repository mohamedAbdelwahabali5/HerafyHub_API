// General middleware for handling errors and sending appropriate responses
const APIError = require('../utils/errors/APIError');

const asyncHandler = (api) => {
    return async (req, res, next) => {
        try {
            await api(req, res, next);
        } catch (err) {
            console.error(`Error: ${err.message}`); // Log for debugging

            if (err instanceof APIError) {
                return res.status(err.statusCode).json(err.toJSON());
            }

            const error = new APIError(err.message || "Internal Server Error", err.statusCode || 500);
            return res.status(error.statusCode).json(error.toJSON());
        }
    };
};

module.exports = asyncHandler;
