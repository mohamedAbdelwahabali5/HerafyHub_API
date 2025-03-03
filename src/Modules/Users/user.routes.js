// Defines API routes for Users and connects them to the Controller

const router = require('express').Router();
const {registerUser, loginUser} = require('./user.controller');
const validateSchema = require('../../utils/validation/validateSchema');
const { userSchemaValidation } = require('../../middlewares/authMiddleware');




router.post('/register',validateSchema(userSchemaValidation), registerUser);
router.post('/login', loginUser);



module.exports = router;