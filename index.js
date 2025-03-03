// The main entry file that starts the server and loads all necessary configurations

const express = require("express");
require('dotenv').config({path:'.env'});
const connectDB = require('./Database/connection');
const categoryRoutes = require("./src/Modules/Categories/category.routes");
const productRoutes = require("./src/Modules/Products/product.routes");
const authRoutes = require("./src/Modules/Users/user.routes");
const app = express();

// database connection
connectDB();
// Middleware
app.use(express.json());

app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use('/auth',authRoutes)



// Start Server
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));