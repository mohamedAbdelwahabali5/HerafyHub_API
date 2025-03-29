const Order = require("../../../Database/Models/order.model"); // Import Order model
const Product = require("../../../Database/Models/product.model"); // Import Product model

// **1. Create a New Order**
exports.createOrder = async (req, res) => {
  console.log("Create Order Called", req.body);
  try {
    const { products, totalPrice } = req.body;
    if (!products || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      user: req.user.id, 
      products,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};


// **2. Get All Orders**
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("products.product"); // Populate user and product details if needed
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// **2. Get Order by ID**
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email").populate("products.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: "Error fetching order" });
  }
};

// **3. Delete Order**
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Error deleting order" });
  }
};