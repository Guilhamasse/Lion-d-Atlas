const formatRes = require('../helpers/formatRes')

const Category = require('../models/category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json(formatRes('success', categories))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        // Check if category exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const category = await Category.findByPk(parseInt(req.params.id));
        if (!category) return res.status(404).json(formatRes('error', null, 'No category found with this id'));

        return res.status(200).json(formatRes('success', category))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};