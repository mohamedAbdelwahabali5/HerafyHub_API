const Joi = require("joi");

exports.contactSchemaValidation = Joi.object({
  firstName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/),
  email: Joi.string().required().email(),
  subject: Joi.string().required().max(100),
  message: Joi.string().required().max(1000),
});
