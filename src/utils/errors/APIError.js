// handle api errors
class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.message = message;
    }

    toJSON() {
        return {
            success: this.success,
            message: this.message,
            error: {
                statusCode: this.statusCode,
                timestamp: new Date().toISOString()
            }
        };
    }
}

module.exports = APIError;