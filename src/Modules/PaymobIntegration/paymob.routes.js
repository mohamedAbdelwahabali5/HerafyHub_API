const express = require('express');
const router = express.Router();
const paymobController = require('./paymob.controller');

// get Auth Token
router.post('/get-token', paymobController.getAuthToken);

// create paymob Order 
router.post('/create-order', paymobController.createOrder);

// getting Payment Key from Paymob
router.post('/get-payment-key', paymobController.getPaymentKey);  

// Webhook endpoint from Paymob
router.post('/webhook', paymobController.handleWebhook);

router.get('/check-status/:orderId', paymobController.checkPaymentStatus);

module.exports = router;
