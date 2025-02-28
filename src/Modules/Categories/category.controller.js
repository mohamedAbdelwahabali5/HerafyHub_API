 // Contains logic for handling Category operations like adding, updating, and deleting

 const Category = require("../../../Database/Models/category.model");
//post method
exports.createCategory = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const newCategory = new Category({ title, description, image });
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully!", category: newCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// get (Read All)
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ID (Read One)
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found!" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// (Update)
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedCategory) return res.status(404).json({ message: "Category not found!" });
        res.status(200).json({ message: "Category updated successfully!", category: updatedCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// (Delete)
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: "Category not found!" });
        res.status(200).json({ message: "Category deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
