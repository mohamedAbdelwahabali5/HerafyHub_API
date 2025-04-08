const router = require("express").Router();
const { protectionMW, roleMiddleware } = require("../../middlewares/authMiddleware");
const {createOrder,cancelOrder,getAllOrder,getUserOrders,getOrderDetails} = require("./order.controller");
const validateSchema = require("../../utils/validation/validateSchema");
const { createOrderValidation } = require("./order.schema");


router.use(protectionMW);

router.post("/", 
  validateSchema(createOrderValidation), 
  createOrder
);

router.get("/"/*,roleMiddleware*/, getAllOrder);
router.get("/user", getUserOrders);
router.get('/:id', protectionMW, getOrderDetails);
router.delete("/:id", cancelOrder);

module.exports = router;
