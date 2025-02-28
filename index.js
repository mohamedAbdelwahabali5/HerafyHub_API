// The main entry file that starts the server and loads all necessary configurations

const express = require("express");
// require('dotenv').config();
const connectDB = require('./Database/connection');
const categoryRoutes = require("./src/Modules/Categories/category.routes");
const productRoutes = require("./src/Modules/Products/product.routes");
const app = express();

connectDB();
// Middleware
app.use(express.json());

app.use("/category", categoryRoutes);
app.use("/product", productRoutes);


// Start Server
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));