const Favorite = require("../../../Database/Models/favorite.model");
const Product = require("../../../Database/Models/product.model");
 
exports.addToFavorite = async (req, res, next) => {
  try {
      if (!req.user) {
          return res.status(401).json({ message: "Unauthorized: Please log in to add favorites." });
      }
 
      const userId = req.user.id;
      const { productId } = req.body;
 
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }
 
      // Find or create user's favorite list
      let favorite = await Favorite.findOne({ user: userId });
      if (!favorite) {
          favorite = new Favorite({ user: userId, products: [] });
      }
 
      if (favorite.products.includes(productId)) {
          return res.status(400).json({ message: "Product is already in favorites" });
      }
 
      favorite.products.push(productId);
      await favorite.save();
 
      res.status(200).json({ message: "Product added to favorites", favorite });
 
  } catch (error) {
      next(new APIError(error.message, 500));
  }
};
exports.removeFromFavorite = async (req, res, next) => {
  try {
      if (!req.user) {
          return res.status(401).json({ message: "Unauthorized: Please log in to remove favorites." });
      }
      const userId = req.user.id;
      const { productId } = req.params;
      const favorite = await Favorite.findOne({ user: userId });
      if (!favorite) {
          return res.status(404).json({ message: "Favorite list not found" });
      }
      favorite.products = favorite.products.filter(p => p.toString() !== productId);
      await favorite.save();
 
      res.status(200).json({ message: "Product removed from favorites", favorite });
 
  } catch (error) {
      next(new APIError(error.message, 500));
  }
};
// Get the favorite list with updated prices
exports.getFavorite = async (req, res, next) => {
  try {
      if (!req.user) {
          return res.status(401).json({ message: "Unauthorized: Please log in to view favorites." });
      }
      const userId = req.user.id;
      const favorite = await Favorite.findOne({ user: userId }).populate("products");
      if (!favorite || favorite.products.length === 0) {
          return res.status(404).json({ message: "No favorites found" });
      }
 
      res.status(200).json({ favoriteProducts: favorite.products });
 
  } catch (error) {
      next(new APIError(error.message, 500));
  }
};
// Clear the entire favorite list
exports.clearFavorite = async (req, res, next) => {
  try {
      if (!req.user) {
          return res.status(401).json({ message: "Unauthorized: Please log in to clear favorites." });
      }
 
      const userId = req.user.id;
      const favorite = await Favorite.findOne({ user: userId });
 
      if (!favorite) {
          return res.status(404).json({ message: "Favorite list not found" });
      }
 
      // Clear the entire favorite list
      favorite.products = [];
      await favorite.save();
 
      res.status(200).json({ message: "All favorites cleared successfully", favorite });
  } catch (error) {
      next(new APIError(error.message, 500));
  }
};
 
 