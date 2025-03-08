const Favorite = require("../../../Database/Models/favorite.model");
const Product = require("../../../Database/Models/product.model");
 
// Add a product to the favorite list
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
 
      // Check if product is already in favorites
      if (favorite.products.includes(productId)) {
          return res.status(400).json({ message: "Product is already in favorites" });
      }
 
      // Add product to favorites
      favorite.products.push(productId);
      await favorite.save();
 
      res.status(200).json({ message: "Product added to favorites", favorite });
 
  } catch (error) {
      next(new APIError(error.message, 500));
  }
};
 
// Remove a product from the favorite list
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
 
      // Remove product
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
 
 
 //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWFpYnJhaGltQGV4YW1wbGUuY29tIiwiaWQiOiI2N2NjMzgwZjRkODBlZWE2Yzc0ODdlMGQiLCJyb2xlIjoidXNlciIsImxvZ2dlZEF0IjoiMjAyNS0wMy0wOFQxMjoyOTozNC43MzRaIiwiaWF0IjoxNzQxNDM2OTc0LCJleHAiOjE3NDE2OTYxNzR9.HJxmlKmhOxJqfzPj66quPWG7nEKU91CQPeRLb8JAWwE