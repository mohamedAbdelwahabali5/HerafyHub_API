const router = require("express").Router();
const { protectionMW } = require("../../middlewares/authMiddleware");
const {createOrder,cancelOrder,getAllOrder,getUserOrders} = require("./order.controller");
const validateSchema = require("../../utils/validation/validateSchema");
const { createOrderValidation } = require("./order.schema");


router.use(protectionMW);

router.post("/", 
  validateSchema(createOrderValidation), 
  createOrder
);

router.get("/", getAllOrder);
router.get("/user", getUserOrders);
router.delete("/:id", cancelOrder);

module.exports = router;
