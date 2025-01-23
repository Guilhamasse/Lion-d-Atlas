const categoryController = require('./controllers/category');
const taskController = require('./controllers/task');
const userController = require('./controllers/user');

const checkToken = require('./middleware/checkToken');

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

/**
 * @swagger
 * /api/tasks:
 * get:
 * summary: Retrieve a list of tasks
 */
router.get('/tasks', checkToken, taskController.getAllTasks);

/**
 * @swagger
 * /api/task/{id}:
 * get:
 * summary: Retrieve a task by ID
 */
router.get('/task/:id', checkToken, taskController.getTaskById);

/**
 * @swagger
 * /api/tasks:
 * post:
 * summary: Create a new task
 */
router.post('/tasks', checkToken, taskController.createTask);

/**
 * @swagger
 * /api/tasks:
 * put:
 * summary: Update a task
 */
router.put('/task/:id', checkToken, taskController.updateTask);

/**
 * @swagger
 * /api/task/{id}:
 * delete:
 * summary: Delete a task
 */
router.delete('/task/:id', checkToken, taskController.deleteTask);

/**
 * @swagger
 * /api/register:
 * post:
 * summary: Register a new user
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/login:
 * post:
 * summary: Login a user
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/validation-token:
 * post:
 * summary: Validate a token
 */
router.post('/validate-token', userController.validateToken);

/**
 * @swagger
 * /api/verify-email:
 * post:
 * summary: Verify an email
 */
router.post('/verify-email', userController.verifyEmail);

/**
 * @swagger
 * /api/forgot-password:
 * get:
 * summary: Forgot password
 */
router.get('/forgot-password', checkToken, userController.forgotPassword);

/**
 * @swagger
 * /api/reset-password:
 * post:
 * summary: Reset password
 */
router.post('/reset-password', userController.resetPassword);

/**
 * @swagger
 * /api/user-infos/{id}:
 * get:
 * summary: Retrieve user infos
 */
router.get('/user-infos/:id', checkToken, userController.userInfos);

/**
 * @swagger
 * /api/user-update/{id}:
 * put:
 * summary: Update user
 */
router.put('/user-update/:id', checkToken, userController.userUpdate);

module.exports = router;
