// Defines API routes for Products and connects them to the Controller

const express = require("express");

const router = express.Router();
const productController = require("../Products/product.controller");
const { protectionMW, roleMiddleware } = require("../../middlewares/authMiddleware");




// Place specific routes before parameter routes
router.post("/",roleMiddleware, productController.createProduct);
router.get("/", productController.getProductsCategory);
router.get("/all",productController.getAllProducts);
router.get("/search",productController.searchProductsByTitleInCategory);
router.post("/all", protectionMW,productController.insertManyProducts);
router.get("/categories/count", productController.countProductsByCategory);
//get all product by category id

router.get("/category/:categoryId",productController.getProductsByCategoryId);
 //get product by user id


// Then place parameter routes
router.get("/:id",productController.getProductById);
router.delete("/:id", protectionMW,productController.deleteProduct);

module.exports = router;
