// Contains logic for handling User operations like registration, login, and profile updates

const User = require('../../../Database/Models/user.model');
const jwt = require("jsonwebtoken");
const APIError = require('../../utils/errors/APIError');
const bcryptjs = require('bcryptjs');
// const asyncHandler = require("express-async-handler");
const asyncHandler = require('../../middlewares/errorHandler');
const { sendWelcomeEmail, sendPasswordResetEmail } = require('../../services/email.service');
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
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        const error = new APIError("User not found", 404);
        return res.status(404).json(error.toJSON());
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Save reset token
    user.resetToken = hashedToken;
    user.resetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save({ validateBeforeSave: false }); // Skip validation

    try {
        // Send reset email
        await sendPasswordResetEmail(user.email, resetToken);

        res.json({
            success: true,
            message: "Password reset link sent to email"
        });
    } catch (error) {
        // If email fails, clean up the token
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });

        const apiError = new APIError("Error sending reset email", 500);
        return res.status(500).json(apiError.toJSON());
    }
});

// handle reset password
const resetPassword = asyncHandler(async(req, res, next) => {
    const {password, confirmPassword} = req.body;
    const {token} = req.params;

    // Verify passwords match
    if (password !== confirmPassword) {
        const error = new APIError("Passwords do not match", 400);
        return res.status(400).json(error.toJSON());
    }

    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const user = await User.findOne({
        resetToken: hashedToken,  // Changed from passwordResetToken to match model
        resetTokenExpires: { $gt: Date.now() }
    });

    if(!user) {
        const error = new APIError("Invalid token or token expired", 400);
        return res.status(400).json(error.toJSON());
    }

    // Update password
    user.password = password;  // Let the model handle hashing
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();  // This will trigger password validation and hashing

    res.json({
        success: true,
        message: "Password reset successfully"
    });
});



// get user by id 
const getUserById = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        const error = new APIError("User not found", 404);
        return res.status(404).json(error.toJSON());
    }
    res.json({
        success: true,
        user
    });
});






// export all functions
module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    getAllUsers,
    forgotPassword,
    resetPassword,
    getUserById,
}
