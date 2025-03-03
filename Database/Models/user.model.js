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
        minLength: [3, 'City must be more than 3 characters'],  
        maxLength: [20, 'City must be less than 20 characters'],
    },
    state: {
        type: String,
        minLength: [3, 'State must be more than 3 characters'],  
        maxLength: [20, 'State must be less than 20 characters'],
    },
    zipCode: { 
        type: String,
        minLength: [5, 'Zip code must be more than 5 characters'],  
        maxLength: [10, 'Zip code must be less than 10 characters'],
        match:[/^[0-9]{5,10}$/,'Invalid Zip code' ]
    },


    phone: {
        type: String, 
        required: true ,
        match:[/^[0-9]{10,15}$/,'invalid phone number']

    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&#])[A-Za-z\d@$!%?&#]{8,}$/, 'Invalid Password format'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'  // default role is 'user'
    },
    profileImage: { type: String },
},
{ timestamps: true });


// hashing passwor before saving it to database

userSchema.pre('save', async function(){
    this.password = await bcryptjs.hash(this.password,6);
})


// when you deleteing user you need to delete all attched properties [orders , carts , favorite products]
// to-do  

module.exports = mongoose.model('User', userSchema);