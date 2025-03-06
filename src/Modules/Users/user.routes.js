// Defines API routes for Users and connects them to the Controller

const router = require('express').Router();
const {registerUser, loginUser,updateUserProfile,getAllUsers} = require('./user.controller');
const validateSchema = require('../../utils/validation/validateSchema');
const {  protectionMW } = require('../../middlewares/authMiddleware');
const { userSchemaValidation, userUpdateSchemaValidation } = require('./user.schema');




router.post('/register',validateSchema(userSchemaValidation), registerUser);
router.post('/login', loginUser);
router.put('/update-profile',protectionMW,validateSchema(userUpdateSchemaValidation),updateUserProfile  )
router.get('/users', getAllUsers)


module.exports = router;