// Defines API routes for Users and connects them to the Controller

const router = require('express').Router();
const {registerUser, loginUser,updateUserProfile,getAllUsers, forgotPassword, resetPassword, getUserById} = require('./user.controller');
const validateSchema = require('../../utils/validation/validateSchema');
const {  protectionMW } = require('../../middlewares/authMiddleware');
const { userSchemaValidation, userUpdateSchemaValidation, forgotPassSchema, resetPassSchema } = require('./user.schema');




router.post('/register',validateSchema(userSchemaValidation), registerUser);
router.post('/login', loginUser);
router.put('/update-profile',protectionMW,validateSchema(userUpdateSchemaValidation),updateUserProfile  );
router.get('/users', getAllUsers);
router.post('/forgot-password',validateSchema(forgotPassSchema),forgotPassword);
router.post('/reset-password/:token', validateSchema(resetPassSchema), resetPassword);
router.get('/users/:id', getUserById);  


module.exports = router;