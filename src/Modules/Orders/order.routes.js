const router = require("express").Router();
const { protectionMW } = require("../../middlewares/authMiddleware");
const {createOrder,cancelOrder,getAllOrder,getUserOrders} = require("./order.controller");
const validateSchema = require("../../utils/validation/validateSchema");
const { createOrderValidation } = require("./order.schema");

// Debug middleware with error logging
// const debugMiddleware = (req, res, next) => {
//   try {
//     console.log('=== Debug Information ===');
//     console.log('Request Body:', JSON.stringify(req.body, null, 2));
//     console.log('User:', req.user);
//     console.log('Headers:', req.headers);
//     console.log('=== End Debug Info ===');
//     next();
//   } catch (error) {
//     console.error('Debug Middleware Error:', error);
//     next(error);
//   }
// };

// // Add error logging middleware
// const errorLogger = (err, req, res, next) => {
//   console.error('Error Details:', {
//     message: err.message,
//     stack: err.stack,
//     body: req.body,
//     user: req.user
//   });
//   next(err);
// };

router.use(protectionMW);

router.post("/", 
  validateSchema(createOrderValidation), 
  createOrder
);

router.get("/", getAllOrder);
router.get("/user", getUserOrders);
router.delete("/:id", cancelOrder);

module.exports = router;
