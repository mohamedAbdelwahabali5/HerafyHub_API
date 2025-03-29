const router = require("express").Router();
const authMiddleware = require("../../middlewares/userAuth.Middleware");
const protection = require("../../middlewares/authMiddleware");
const orderController = require("./order.controller");


router.use(protection.protectionMW);

router.get("/",protection.protectionMW,orderController.getAllOrders);
router.post("/",protection.protectionMW,orderController.createOrder);
router.get("/:id",protection.protectionMW,orderController.getOrderById);
router.delete("/:id",protection.protectionMW,orderController.deleteOrder);

module.exports = router;
