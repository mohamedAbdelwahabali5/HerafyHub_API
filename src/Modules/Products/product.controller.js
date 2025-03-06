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

exports.getAllProducts = async (req, res) => {
    try {
        let products = await Product.find(); 
        let totalProducts = await Product.countDocuments();

        res.json({
            products,
            totalProducts
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};


exports.getProductsCategory = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let skip = (page - 1) * limit;

        let query = {};
        if (req.query.categoryId) {
            query.categoryId = req.query.categoryId; // Changed from categoryId to category to match schema
        }

        let products = await Product.find(query)
            .populate('categoryId')  // Added populate to get category details
            .skip(skip)
            .limit(limit);
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
        const product = await Product.findById(req.params.id).populate('categoryId', 'title description'); 
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
exports.searchProductsByTitleInCategory = async (req, res) => {
    try {
      const { title, categoryId } = req.query;
      
      if (!title) {
        return res.status(400).json({
          success: false,
          message: "Search term is required"
        });
      }
      
      // Build query object
      const query = { title: new RegExp(title, 'i') };
      
      // Add category filter if provided
      if (categoryId) {
        query.categoryId = categoryId;
      }
      
      const products = await Product.find(query).populate('categoryId');
      
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
// exports.searchProductsByTitle = async (req, res) => {
//     try {
//         const { title } = req.query;

//         if (!title) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: "Search term is required" 
//             });
//         }

//         const searchRegex = new RegExp(title, 'i');
//         const products = await Product.find({ title: searchRegex }).populate('categoryId');

//         res.json({
//             success: true,
//             count: products.length,
//             data: products
//         });
//     } catch (err) {
//         res.status(500).json({ 
//             success: false,
//             message: 'Error searching products',
//             error: err.message 
//         });
//     }
// };



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



// get all products by category id 
exports.getProductsByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const products = await Product.find({ categoryId }) // Changed from category to categoryId
            .populate('categoryId', 'title description');  // Changed from category to categoryId

        const totalProducts = await Product.countDocuments({ categoryId });
        const categoryName = products[0]?.categoryId?.title || 'Category not found';

        res.json({
            success: true,
            categoryName,
            totalProducts,
            products
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error fetching products',
            error: error.message 
        });
    }
};



/// count products in each category
exports.countProductsByCategory = async (req, res) => {
    try {
        const categoryCounts = await Product.aggregate([
            {
                $group: {
                    _id: "$categoryId",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    categoryName: { $arrayElemAt: ["$category.title", 0] }
                }
            }
        ]);
        
        res.json({
            success: true,
            categories: categoryCounts
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error counting products',
            error: error.message 
        });
    }
};