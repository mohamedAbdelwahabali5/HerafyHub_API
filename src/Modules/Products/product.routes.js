// Defines API routes for Products and connects them to the Controller

const express = require("express");

const router = express.Router();
const productController = require("../Products/product.controller");

// Place specific routes before parameter routes
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/search", productController.searchProductsByTitle);
router.post("/all", productController.insertMenyProducts);

// Then place parameter routes
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
