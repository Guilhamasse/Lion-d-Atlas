const categoryController = require('./controllers/category');

const express = require('express');
const router = express.Router();

/**
 * @swagger
    * /api/categories:
 * get:
 * summary: Retrieve a list of categories
 */
router.get('/categories', categoryController.getAllCategories);

/**
 * @swagger
 * /api/category/{id}:
 * get:
 * summary: Retrieve a category by ID
 */
router.get('/category/:id', categoryController.getCategoryById);

module.exports = router;
