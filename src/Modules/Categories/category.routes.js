 // Defines API routes for Category and connects them to the Controller

 const express = require("express");
const router = express.Router();
const categoryController = require("../Categories/category.controller");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
