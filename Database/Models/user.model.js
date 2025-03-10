// Defines the Schema and Model for User

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        minLength: [3, 'firstName must be more than 3 characters'],  
        maxLength: [20, 'firstName must be less than 20 characters'],
        required: true 
    },

    lastName: { 
        type: String,
        minLength: [3, 'lastName must be more than 3 characters'],  
        maxLength: [20, 'lastName must be less than 20 characters'],
        required: true 
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        match: [/[a-zA-Z0-9_%+]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/, 'Invalid email format'] , // Regular expression for email validation
    },
    address: { 
        type: String, 
        minLength: [10, 'Address must be more than 10 characters'],  
        maxLength: [50, 'Address must be less than 20 characters'],
        required: true
    },

    city: { 
        type: String,  
        validate: {
            validator: function(v) {
                return !v || (v.length >= 3 && v.length <= 20);
            },
            message: 'City must be between 3 and 20 characters'
        },
        required: false,
        default: undefined
    },
    state: {
        type: String,
        validate: {
            validator: function(v) {
                return !v || (v.length >= 3 && v.length <= 20);
            },
            message: 'State must be between 3 and 20 characters'
        },
        required: false,
        default: undefined
    },
    zipCode: { 
        type: String,
        validate: {
            validator: function(v) {
                return !v || (/^[0-9]{5,10}$/.test(v));
            },
            message: 'Zip code must be between 5 and 10 digits'
        },
        required: false,
        default: undefined
    },


    phone: {
        type: String, 
        required: true ,
        match:[/^[0-9]{10,15}$/,'invalid phone number']

    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{8,}$/, 'Invalid Password format'],
        
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'  // default role is 'user'
    },
    profileImage: { type: String },
    passwordResetToken: String,
    passwordResetExpires: Date
},
{ timestamps: true });


// hashing passwor before saving it to database

userSchema.pre('save', async function(){
    this.password = await bcryptjs.hash(this.password,6);
})


// when you deleteing user you need to delete all attched properties [orders , carts , favorite products]
// to-do  

module.exports = mongoose.model('User', userSchema);

