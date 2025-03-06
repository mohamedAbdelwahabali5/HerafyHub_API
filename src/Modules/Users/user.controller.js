// Contains logic for handling User operations like registration, login, and profile updates

const User = require('../../../Database/Models/user.model');
const jwt = require("jsonwebtoken");
const APIError = require('../../utils/errors/APIError');
const bcryptjs = require('bcryptjs');
// const asyncHandler = require("express-async-handler");
const asyncHandler = require('../../middlewares/errorHandler');


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


// login user --> authenticate user
const loginUser = async (req,res,next)=>{
    // destract email - pass from req body
    const {email , password}=req.body;
    console.log(req.body);
    console.log("email : ", email);

    const user = await User.findOne({email: email});
    if(!user){
        const error = new APIError("Email Or Password are invalid", 401);
        return res.status(401).json(error.toJSON());
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch){
    
        return res.json(new APIError("Email Or Password are invalid", 401).toJSON());
    }

    // generate token for this user --> token 
    // but first we need to get payload  ---> paylaod is object which contains information about user that i nneed to store in token

    const tokenPayload={
        username: user.username,
        email: user.email,
        id: user._id,
        role:user.role,
        loggedAt:new Date().toISOString()
    }
    console.log(tokenPayload);
    // generate token
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
    console.log(token);
    res.json({
        success: true,
        message: "User Login successfully",
        token: token
    });
}

// handle user update try asynchandler metthod

const updateUserProfile = asyncHandler(async(req, res, next) => {
   
        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {new: true}); // { new: true } ==> to return the updated user object in the response
        
        if(!updatedUser){
            return next(new APIError("User not found", 404).toJSON());
        }
        res.json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        })
   
});


// get all users

const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({});
    res.json({
        success: true,
        users
    })
});






// export all functions
module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    getAllUsers
}




