// Defines the Schema and Model for Favorite Product
const mongoose = require("mongoose");
 
const FavoriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }] // should be objectID
});
 
module.exports = mongoose.model("Favorite", FavoriteSchema);
 
 