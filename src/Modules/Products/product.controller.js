// Contains logic for handling Product operations like adding, updating, and deleting


const Product = require('../../../Database/Models/product.model');
const mongoose = require("mongoose");

// POST method

exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, quantity, image, category } = req.body;
        const newProduct = new Product({ title, description, price, quantity, image, category });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully!', product: newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET method (Read All)

// exports.getAllProducts = async (req, res) => {
//     let page = parseInt(req.query.page) || 1;  
//     let limit = parseInt(req.query.limit) || 10; 
//     let skip = (page - 1) * limit; 

//     let products = await Product.find().skip(skip).limit(limit); 
//     let totalProducts = await Product.countDocuments(); // العدد الكلي للمنتجات

//     res.json({
//         products,
//         totalProducts,
//         totalPages: Math.ceil(totalProducts / limit),
//         currentPage: page
//     });
// };

exports.getAllProducts = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let skip = (page - 1) * limit;

        let query = {};
        if (req.query.categoryId) {
            query.category = req.query.categoryId; // تصفية المنتجات بناءً على categoryId
        }

        let products = await Product.find(query).skip(skip).limit(limit);
        let totalProducts = await Product.countDocuments(query);

        res.json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// GET method (Read One)

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'title description'); 
        if (!product) return res.status(404).json({ message: 'Product not found!' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT method (Update One)

// exports.updateProduct = async (req, res) => {
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedProduct) return res.status(404).json({ message: 'Product not found!' });
//         res.json({ message: 'Product updated successfully!', product: updatedProduct });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// DELETE method (Delete One)

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id); //return flase if it is not found
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found!' });
        res.json({ message: 'Product deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// search by title
exports.searchProductsByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({ 
                success: false,
                message: "Search term is required" 
            });
        }

        const searchRegex = new RegExp(title, 'i');
        const products = await Product.find({ title: searchRegex }).populate('categoryId');

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: 'Error searching products',
            error: err.message 
        });
    }
};



// API endpoint to insert products

exports.insertManyProducts = async (req, res) => {
    try {
        const productsToInsert = req.body.map(product => ({
            ...product,
            categoryId: new mongoose.Types.ObjectId(product.categoryId)
        }));

        const savedProducts = await Product.insertMany(productsToInsert);
        
        res.status(201).json(savedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: error.message,
            details: error.errors ? Object.keys(error.errors) : null 
        });
    }

};