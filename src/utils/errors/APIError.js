// handle api errors
class APIError extends Error {
    statusCode;
    constructor(message, statusCode){
        super(message, statusCode);
        this.statusCode=statusCode;
    }
}

module.exports=APIERROR;