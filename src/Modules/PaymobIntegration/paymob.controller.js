
const paymobService = require('../../services/paymob.service');

// get token from api paymob
const getAuthToken = async (req, res) => {
  try {
    const authToken = await paymobService.getAuthToken();
    res.json(authToken);
  } catch (error) {
    res.status(500).json({ message: 'Error getting Auth Token', error });
  }
};

// create order in paymob account
const createOrder = async (req, res) => {
  try {
    const { auth_token, amount_cents } = req.body;
    if (!auth_token || !amount_cents) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const order = await paymobService.createOrder(auth_token, amount_cents);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// getting Payment Key from Paymob
const getPaymentKey = async (req, res) => {
  try {
    console.log("Received request to get Payment Key with data:", req.body);

    const { authToken, orderId, amountCents, billingData } = req.body;

    if (!authToken || !orderId || !amountCents || !billingData) {
      console.error("Missing required fields:", { authToken, orderId, amountCents, billingData });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log("Sending data to Paymob:", { authToken, orderId, amountCents, billingData });

    const paymentKey = await paymobService.getPaymentKey(authToken, orderId, amountCents, billingData);

    console.log("Payment Key received:", paymentKey);
    res.json(paymentKey);

  } catch (error) {
    console.error("Error getting Payment Key:", error.response?.data || error.message);

    res.status(500).json({ 
      message: 'Error getting Payment Key', 
      error: error.response?.data || error.message 
    });
  }
};

const handleWebhook = async (req, res) => {
  try {
    const data = req.body;
    console.log('Webhook Received:', data);

    if (data.type === 'TRANSACTION' && data.obj.success) {
      const orderId = data.obj.order.id;
      const transactionId = data.obj.id;
      const amount = data.obj.amount_cents / 100; 

      const verification = await paymobService.verifyPayment(transactionId);
      
      if (verification.paid) {
        ordersCache.set(orderId, {
          status: 'paid',
          transactionId,
          amount,
          paidAt: new Date()
        });

        paymobService.notifyFrontend(orderId, 'paid');

        console.log('Payment verified and processed for order:', orderId);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error in webhook handler:', error.message);
    res.sendStatus(500);
  }
};

const checkPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!ordersCache.has(orderId)) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = ordersCache.get(orderId);
    res.json({
      orderId,
      status: order.status,
      transactionId: order.transactionId,
      amount: order.amount,
      paidAt: order.paidAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking payment status', error });
  }
};

module.exports = {
  getAuthToken,
  createOrder,
  getPaymentKey,
  handleWebhook,
  checkPaymentStatus
};