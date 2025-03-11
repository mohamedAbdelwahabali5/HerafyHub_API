// Defines API routes for Favorites Products and connects them to the Controller
const express = require('express');
const router = express.Router();
const favoriteController = require("../Favorite/favorite.controller");
const authMiddleware = require("../../middlewares/userAuth.Middleware");
const protection=require("../../middlewares/authMiddleware")
 
router.use(authMiddleware);

router.get("/",protection.protectionMW,favoriteController.getFavorite);  
router.post("/add",protection.protectionMW,favoriteController.addToFavorite);  
router.delete("/remove/:productId",protection.protectionMW,favoriteController.removeFromFavorite);
 router.delete("/clear/",protection.protectionMW,favoriteController.clearFavorite); 
 
 
module.exports = router;
 