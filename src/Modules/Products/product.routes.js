// Defines API routes for Products and connects them to the Controller

const express = require("express");

const router = express.Router();
const productController = require("../Products/product.controller");

// Place specific routes before parameter routes
router.post("/", productController.createProduct);
router.get("/", productController.getProductsCategory);
router.get("/all", productController.getAllProducts);
router.get("/search", productController.searchProductsByTitleInCategory);
router.post("/all", productController.insertManyProducts);
router.get("/categories/count", productController.countProductsByCategory);
//get all product by category id

router.get("/category/:categoryId", productController.getProductsByCategoryId);
 //get product by user id


// Then place parameter routes
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
