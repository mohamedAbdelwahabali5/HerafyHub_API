// Defines the Schema and Model for Product


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    oldprice: { type: Number, required: true },
    currentprice: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category',required: true },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0  },
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

