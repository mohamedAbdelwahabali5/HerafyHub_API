const { z } = require('zod');

const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            const validationResult = schema.safeParse(req.body);
            
            if (!validationResult.success) {
                const errors = validationResult.error.issues.map(issue => ({
                    message: issue.message,
                    path: issue.path.join('.')
                }));

                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors
                });
            }
            req.body = validationResult.data;  // Use the parsed data
            next();
        } catch (error) {
            console.error('Validation Middleware Error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during validation'
            });
        }
    };
};

module.exports = validateSchema;
