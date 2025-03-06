// Defines API routes for Users and connects them to the Controller

const router = require('express').Router();
const {registerUser, loginUser,updateUserProfile} = require('./user.controller');
const validateSchema = require('../../utils/validation/validateSchema');
const { userSchemaValidation, protectionMW } = require('../../middlewares/authMiddleware');




router.post('/register',validateSchema(userSchemaValidation), registerUser);
router.post('/login', loginUser);
router.put('/update-profile',protectionMW,updateUserProfile  )



module.exports = router;