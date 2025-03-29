// Defines API routes for Orders and connects them to the Controller
const router = require("express").Router();

const { protectionMW } = require("../../middlewares/authMiddleware");
const orderController = require("./order.controller");

// GET all orders
router.get("/", orderController.getAllOrders);
// POST new order
router.post("/",protectionMW ,orderController.createOrder);
// GET order by ID
router.get("/:orderId", orderController.getOrderById);
// PUT update order by ID
router.put("/:orderId", orderController.updateOrder);
// DELETE order by ID
router.delete("/:orderId", orderController.cancelOrder);

module.exports = router;
