
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
const PAYMOB_AUTH_URL = 'https://accept.paymob.com/api/auth/tokens';
const PAYMOB_ORDER_URL = 'https://accept.paymob.com/api/ecommerce/orders';
const PAYMOB_PAYMENT_KEY_URL = 'https://accept.paymob.com/api/acceptance/payment_keys';

// get token from api paymob
const getAuthToken = async () => {
  try {
    const response = await axios.post(PAYMOB_AUTH_URL, { api_key: PAYMOB_API_KEY });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get auth token');
  }
};

// create order in paymob account
const createOrder = async (authToken, amount_cents) => {
  try {
    const response = await axios.post(PAYMOB_ORDER_URL, {
      auth_token: authToken,
      amount_cents,
      currency: 'EGP',
      merchant_order_id: Math.floor(Math.random() * 1000000),
      items: [],
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

// create Payment Key
const getPaymentKey = async (authToken, orderId, amountCents, billingData) => {
  try {
    const response = await axios.post(PAYMOB_PAYMENT_KEY_URL, {
      auth_token: authToken,
      amount_cents: amountCents,
      expiration: 3600,  // 3600 seconds
      order_id: orderId,
      billing_data: billingData,
      currency: 'EGP',
      integration_id: PAYMOB_INTEGRATION_ID,  
      return_url: 'https://herafy-hub.netlify.app/checkout',
      lock_order_when_paid: "true",
      show_save_card: "false"
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get payment key');
  }
};

const verifyPayment = async (transactionId) => {
  try {
    const response = await axios.get(
      `https://accept.paymob.com/api/transaction/${transactionId}`,
      {
        headers: {
          'Authorization': `Bearer ${PAYMOB_API_KEY}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    throw error;
  }
};

const notifyFrontend = (orderId, status) => {
  const eventEmitter = require('../events');
  eventEmitter.emit('paymentUpdate', { 
    orderId, 
    status,
    timestamp: new Date() 
  });
};

module.exports = {
  getAuthToken,
  createOrder,
  getPaymentKey,
  verifyPayment,
  notifyFrontend
};