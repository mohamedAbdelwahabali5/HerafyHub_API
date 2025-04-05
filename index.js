// The main entry file that starts the server and loads all necessary configurations
const express = require("express");
const cors = require("cors");
// require('dotenv').config();
const connectDB = require("./Database/connection");
const categoryRoutes = require("./src/Modules/Categories/category.routes");
const productRoutes = require("./src/Modules/Products/product.routes");
const paymobRoutes = require('./src/Modules/PaymobIntegration/paymob.routes');

// const cloudinary = require('./cloudinary');

const authRoutes = require("./src/Modules/Users/user.routes");
const favoriteRoutes = require("./src/Modules/Favorite/favorite.routes");
const cartRoutes = require("./src/Modules/Cart/cart.routes");

const orderRoutes = require("./src/Modules/Orders/order.routes");

const contactRoutes = require("./src/Modules/Contact/contact.routes");

const globalErrorHandler = require("./src/middlewares/globalErrorHandler");

const app = express();

// CORS Configuration
const corsOptions = {
origin: ["http://localhost:4200", "http://127.0.0.1:4200" ,process.env.FRONTEND_URL], // adding vercel url  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// database connection
connectDB();

// Middleware
app.use(express.json());

// const testSearch = await Product.find({ title: /cotton/i });
// console.log("Direct test search found:", testSearch.length);
app.use("/contact", contactRoutes);

app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/auth", authRoutes);
app.use("/favorite", favoriteRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use('/paymob', paymobRoutes);

// Global error handler (MUST be placed at the end)
app.use(globalErrorHandler);
// Start Server
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
