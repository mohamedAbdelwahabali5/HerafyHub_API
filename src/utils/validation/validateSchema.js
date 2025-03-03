// generic schema validation using zod

const {z} = require('zod');

const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            const validationResult = schema.safeParse(req.body); 
            if (!validationResult.success) {
                return res.status(400).json({
                    success: false,
                    errors: validationResult.error.format()
                });
            }
            req.body = validationResult.data;  // Use the parsed data
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };
};

module.exports = validateSchema;
