// Contains logic for handling User operations like registration, login, and profile updates

const User = require('../../../Database/Models/user.model');
const jwt = require("jsonwebtoken");
const APIError = require('../../utils/errors/APIError');
const bcryptjs = require('bcryptjs');


// our auth 

// user registration ==> creation of user account
const registerUser = async (req, res, next) => {
    const createUser = {...req.body};

    try {
        // check user already registered ==> email is already existing
        const existingUser = await User.findOne({ email: createUser.email})
        if(existingUser) {
            return next( new APIError('Email already exists',400));

        }
        const createdUser = new User(createUser);
        const user = await createdUser.save();

        // so after that we need to response on request success
        res.json({
            success: true,
            message:'User Register successfully',
            user
        })
    

    }catch (err){
        return next(new APIError(err.message,400));
    }
}



