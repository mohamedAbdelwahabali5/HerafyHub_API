 // first we want to validate on our schema 
 const {z}  = require('zod');
 const userSchemaValidation = z.object({
    firstName: z.string()
            .min(3 ,"First Name must be at least 3 characters long")
            .max(20,"First Name must be at most 20 characters long"),
    lastName: z.string()
            .min(3 ,"Last Name must be at least 3 characters long")
            .max(20,"Last Name must be at most 20 characters long"),
    email: z.string()
            .email("Invalid email format")
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email does not match required format"),
    address: z.string()
            .min(10,"Address must be at least 10 characters long")
            .max(50,"Address must be at most 50 characters long"),
    city: z.string()
            .min(3,"City must be at least 3 characters long")
            .max(20,"City must be at most 20 characters long")
            .optional(),
    zipCode: z.string()
            .min(5, "Zip code must be more than 5 characters")
            .max(10, "Zip code must be less than 10 characters")
            .regex(/^[0-9]{5,10}$/, "Invalid Zip code")
            .optional(),
    state: z.string()
            .min(3,"State must be at least 3 characters long")
            .max(20,"State must be at most 20 characters long")
            .optional(),
    password: z.string()
            .min(8,"Password must be at least 8 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&#])[A-Za-z\d@$!%?&#]{8,}$/,
                "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
            ),
    phone: z.string()
            .regex(/^[0-9]{10,15}$/, "Invalid phone number"),

    role: z.enum(['user', 'admin'])
            .default("user"),
    profileImage: z.string().optional(),
 })


 // Schema for user updates (all fields optional)
const userUpdateSchemaValidation = userSchemaValidation.partial();


 module.exports = {userSchemaValidation,userUpdateSchemaValidation};