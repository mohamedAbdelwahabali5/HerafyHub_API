// Handles the database connection using Mongoose

require('dotenv').config();
const mongoose = require('mongoose');
console.log('MONGO_URI:', process.env.MONGO_URI);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1);
    }
};


module.exports = connectDB;
