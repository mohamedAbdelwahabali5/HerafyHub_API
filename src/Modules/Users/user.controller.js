// Contains logic for handling User operations like registration, login, and profile updates

const User = require('../../../Database/Models/user.model');
const jwt = require("jsonwebtoken");
const APIError = require('../../utils/errors/APIError');
const bcryptjs = require('bcryptjs');
// const asyncHandler = require("express-async-handler");
const asyncHandler = require('../../middlewares/errorHandler');
const { sendWelcomeEmail } = require('../../services/email.service');
const crypto = require('crypto');


// our auth 

// user registration ==> creation of user account
const registerUser = async (req, res, next) => {
    const createUser = {...req.body};

    try {
        // check user already registered ==> email is already existing
        const existingUser = await User.findOne({ email: createUser.email})
        if(existingUser) {
            throw new APIError('Email already exists', 400);

        }
        const createdUser = new User(createUser);
        const user = await createdUser.save();

        // Send welcome email
        await sendWelcomeEmail(user.email, user.firstName);
    
        // so after that we need to response on request success
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
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



// handle forget password

const forgotPassword = asyncHandler(async (req, res, next) => {
    const {email} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return next(new APIError("User not found", 404).toJSON());
    }

    // jwt not best practice
    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Save hashed token to user
    user.passwordResetToken = passwordResetToken;
    user.resetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send unhashed token in email (will be hashed again for verification)
    try {
        await sendResetPasswordEmail(email, resetToken);
        res.json({
            success: true,
            message: "Reset password link sent to email"
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        
         
        return  new APIError("Error sending email", 500).toJSON();
    }
});

// handle reset password
const resetPassword = asyncHandler(async(req,res) => {
    const {password} = req.body;
    const {token} = req.params;

    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken,
        resetTokenExpires: { $gt: Date.now() }
    });
    if(!user){
        return next(new APIError("Invalid token or token expired", 400).toJSON());
    }

    // Hash the new password
    user.password = await bcryptjs.hash(password, 6);
    user.passwordResetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({
        success: true,
        message: "Password reset successfully"
    });

});






// export all functions
module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    getAllUsers,
    forgotPassword,
    resetPassword
}




