const EventEmitter = require('events');
class PaymentEmitter extends EventEmitter {}
const paymentEmitter = new PaymentEmitter();

paymentEmitter.on('paymentUpdate', (data) => {
  console.log(`Payment update for order ${data.orderId}:`, data.status);
});

module.exports = paymentEmitter;