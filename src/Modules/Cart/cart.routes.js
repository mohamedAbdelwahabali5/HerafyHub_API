const express = require("express");
const router = express.Router();
const cartController = require("../Cart/cart.controller");
const authMiddleware = require("../../middlewares/userAuth.Middleware");
const protection=require("../../middlewares/authMiddleware")
 
router.use(authMiddleware);
 
router.get("/",protection.protectionMW,cartController.getCart);
router.post("/add",protection.protectionMW,cartController.addToCart);
router.delete("/clear/",protection.protectionMW,cartController.clearCart);
router.delete("/remove/:productId",protection.protectionMW,cartController.removeFromCart);
 
module.exports = router;
 