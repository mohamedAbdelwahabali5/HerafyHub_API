const Order = require("../../../Database/Models/order.model");
const mongoose = require("mongoose");
const APIError = require("../../utils/errors/APIError");

// Place an order

const createOrder = async (req, res, next) => {
  try {
    const orderData = {
      user: req.user.id, // Get user from auth middleware
      products: req.body.products,
      totalPrice: req.body.totalPrice,
    };

    // Validate required fields
    if (!orderData.products || !orderData.products.length || !orderData.totalPrice) {
      throw new APIError("Missing required order data", 400);
    }

    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    // Populate the product details
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate('user', 'firstName lastName email')
      .populate('products.product', 'title currentprice oldprice'); 

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (error) {
    return next(new APIError(error.message, 400));
  }
};

// Update an order

const updateOrder = async (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new APIError("Invalid order ID", 400);
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });

    if (!updatedOrder) {
      throw new APIError("Order not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return next(new APIError(error.message, 500));
  }
};

// Cancel an order

const cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new APIError("Invalid order ID", 400);
  }

  try {
    const canceledOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Canceled" },
      { new: true }
    );

    if (!canceledOrder) {
      throw new APIError("Order not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Order canceled successfully",
      order: canceledOrder,
    });
  } catch (error) {
    return next(new APIError(error.message, 500));
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      throw new APIError("No orders found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    return next(new APIError(error.message, 500));
  }
};

const getOrderById = async (req, res, next) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new APIError("Invalid order ID", 400);
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new APIError("Order not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    return next(new APIError(error.message, 500));
  }
};

module.exports = {
  createOrder,
  updateOrder,
  cancelOrder,
  getAllOrders,
  getOrderById,
};
