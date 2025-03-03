// Contains logic for handling Product operations like adding, updating, and deleting


const Product = require('../../../Database/Models/product.model');

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

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET method (Read One)

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
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
        const products = await Product.find({ title: searchRegex }).populate('category');

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
exports.insertMenyProducts =  async (req, res) => {
    try {
        const products = req.body.products; // Assuming the request body contains an array of products
        const result = await Product.insertMany(products);
        res.status(201).json({ message: `${result.length} documents inserted`, data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting documents', error: error.message });
    }
};