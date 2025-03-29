const Cart = require("../../../Database/Models/cart.model");
const Product = require("../../../Database/Models/product.model");

// Add a product to the cart
exports.addToCart = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({
          message: "Unauthorized: Please log in to add items to the cart.",
        });
    }
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Validate quantity
    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than zero" });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    // Check if the product is already in the cart
    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity; // Increase quantity
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({
          message: "Unauthorized: Please log in to remove items from the cart.",
        });
    }

    const userId = req.user.id;
    const { productId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if the product exists in the cart before removing
    const productExists = cart.products.some(
      (p) => p.product.toString() === productId
    );
    if (!productExists) {
      return res.status(400).json({ message: "Product not found in cart" });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get the cart with product details
exports.getCart = async (req, res) => {
  try {
    console.log("Request User:", req.user); // Log the user object

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Please log in to view the cart." });
    }

    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const cartItems = cart.products.map((p) => ({
      id: p.product._id,
      name: p.product.title,
      quantity: p.quantity,
      price: p.product.currentprice,
      image: p.product.image,
      total: p.quantity * p.product.currentprice,
    }));

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Clear the entire cart
exports.clearCart = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Please log in to clear the cart." });
    }

    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = []; // Empty the cart
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
