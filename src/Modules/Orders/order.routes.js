// Defines API routes for Orders and connects them to the Controller
const router = require("express").Router();

const { protectionMW } = require("../../middlewares/authMiddleware");
const orderController = require("./order.controller");

// GET all orders
router.get("/", orderController.getAllOrders);
// POST new order
router.post("/", orderController.createOrder);
// GET order by ID
router.get("/:id", orderController.getOrderById);
// PUT update order by ID
router.put("/:id", orderController.updateOrder);
// DELETE order by ID
router.delete("/:id", orderController.cancelOrder);

module.exports = router;
