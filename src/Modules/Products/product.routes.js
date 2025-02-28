// Defines API routes for Products and connects them to the Controller

const express = require("express");

const router = express.Router();
const productController = require("../Products/product.controller");


router.post("/", productController.createProduct);

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

// router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

router.post("/search", productController.searchProductsByTitle);

module.exports = router;

// The ProductController is responsible for handling the logic for products,
//  such as creating, reading, updating, and deleting. It interacts with the Product model to perform these operations.