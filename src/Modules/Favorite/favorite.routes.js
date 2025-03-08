// Defines API routes for Favorites Products and connects them to the Controller
const express = require('express');
const router = express.Router();
const favoriteController = require("../Favorite/favorite.controller");
const authMiddleware = require("../../middlewares/userAuth.Middleware");
 
router.use(authMiddleware);
 
router.post("/add", favoriteController.addToFavorite);  
router.delete("/remove/:productId", favoriteController.removeFromFavorite);
router.get("/", favoriteController.getFavorite);  
 
module.exports = router;
 