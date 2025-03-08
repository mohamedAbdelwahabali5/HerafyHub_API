const APIError = require('../utils/errors/APIError');

const globalErrorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`); // Logs the error for debugging

    if (err instanceof APIError) {
        return res.status(err.statusCode).json(err.toJSON());
    }

    // Default handling for unexpected errors
    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: {
            statusCode: err.statusCode || 500,
            timestamp: new Date().toISOString()
        }
    });
};

module.exports = globalErrorHandler;
