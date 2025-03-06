 // Responsible for verifying user permissions using JWT or another authentication system


const APIError = require('../utils/errors/APIError');
const jwt = require('jsonwebtoken')




// adding protection meddileware to verify user permissions
function protectionMW(req,res,next){
        //check request has a Authorization-Header
        const auth = req.headers.authorization;
        if(!auth){
                return next(new APIError("You are not authorized",401))
        }
        // verify token
        const token = auth.split(' ')[1];
        // after authorization verify we need to decode the token to get payload data
        // if not verify redirct to login

        const payload= jwt.verify(token,process.env.JWT_SECRET);
        console.log(payload ,"form protectionMW");

        req.user= payload;
        next();
}

module.exports = {protectionMW};