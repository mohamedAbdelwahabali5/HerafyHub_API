const Order = require("../../../Database/Models/order.model");
const OrderItem = require("../../../Database/Models/orderItem.model");
const Product = require("../../../Database/Models/product.model");
const User = require("../../../Database/Models/user.model");
const APIError = require("../../utils/errors/APIError");
const asyncHandler = require("../../middlewares/errorHandler");
const mongoose = require("mongoose");

const createOrder = asyncHandler(async (req, res) => {

    // Find the user to get default shipping information
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new APIError("User not found", 404);
    }

    // Prepare shipping address if is empty get it from user model to be as defualt
    const shippingAddress = req.body.shippingAddress || {
      name: `${user.firstName} ${user.lastName}`,
      address: `${user.address} - ${user.city} - ${user.state}`,
      phone: user.phone 
    };

    // Validate input
    if (!req.body.products || req.body.products.length === 0) {
      console.error('No products in order');
      throw new APIError("No products in the order", 400);
    }

    // Prepare order data
    const orderData = {
      user: req.user.id,
      shippingAddress: shippingAddress,
      paymentMethod: req.body.paymentMethod || 'Cash on Delivery',
      totalPrice: 0,
      status:req.body.status,
    };

    // Calculate total price and validate products
    const orderItems = [];
    let totalPrice = 0;

    for (const item of req.body.products) {
      console.log(`Checking product: ${item.productId}`);

      // Validate product ID
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        console.error(`Invalid product ID: ${item.productId}`);
        throw new APIError(`Invalid product ID: ${item.productId}`, 400);
      }

      // Find product
      const product = await Product.findById(item.productId);
      
      if (!product) {
        console.error(`Product not found: ${item.productId}`);
        throw new APIError(`Product ${item.productId} not found`, 404);
      }

      // Calculate price
      const itemPrice = product.currentprice * item.quantity;
      totalPrice += itemPrice;

      orderItems.push({
        product: item.productId,
        quantity: item.quantity,
        price: product.currentprice
      });
    }

    // Set total price
    orderData.totalPrice = totalPrice;

    // Create the order in the database
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    // Create order items
    const savedOrderItems = await OrderItem.insertMany(
      orderItems.map(item => ({
        ...item,
        order: savedOrder._id
      }))
    );

    // Populate the order with full details
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate('user', 'firstName lastName address phone')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          select: 'title currentprice'
        }
      });
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: populatedOrder,
    });


});

const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) {
    throw new APIError("Order not found", 404);
  }

  // Can only cancel orders that are In-Progress
  if (order.status !== "In-Progress") {
    throw new APIError("Cannot cancel order - Order is not in progress", 400);
  }

  order.status = "Cancelled";
  order.IsCancelled = true;
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    order
  });
});

const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'firstName lastName phone address')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        select: 'title currentprice'
      }
    });
  
  res.status(200).json({
    success: true,
    message: "All orders retrieved successfully",
    orders
  });
});

const getUserOrders = asyncHandler(async (req, res) => {
  // Get user orders with population
  const orders = await Order.find({ user: req.user.id })
    .populate('user', 'firstName lastName phone address')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        select: 'title currentprice'
      }
    });

  // Calculate order statistics
  const orderStats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((total, order) => total + order.totalPrice, 0),
    ordersByStatus: {
      inProgress: orders.filter(order => order.status === "In-Progress").length,
      confirmed: orders.filter(order => order.status === "Confirmed").length,
      processing: orders.filter(order => order.status === "Processing").length,
      shipping: orders.filter(order => order.status === "Shipping").length,
      delivered: orders.filter(order => order.status === "Delivered").length,
      cancelled: orders.filter(order => order.status === "Cancelled").length
    }
  };

  // Get recent activity (last 5 orders)
  const recentActivity = orders
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5)
    .map(order => ({
      orderNumber: order.invoiceNumber,
      status: order.status,
      totalPrice: order.totalPrice,
      date: order.createdAt,
      items: order.orderItems.length,
      action: getOrderAction(order.status)
    }));
  
  // Add helper function for order action text
  function getOrderAction(status) {
    switch(status) {
      case 'Delivered':
        return 'completed';
      case 'Shipping':
        return 'shipped';
      case 'In-Progress':
        return 'placed';
      default:
        return status.toLowerCase();
    }
  }

  res.status(200).json({
    success: true,
    message: "User orders retrieved successfully",
    statistics: orderStats,
    recentActivity,
    orders
  });
});

module.exports = {
  createOrder,
  cancelOrder,
  getAllOrder,
  getUserOrders
};
