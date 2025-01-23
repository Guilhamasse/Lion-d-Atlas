const formatRes = require('../helpers/formatRes')

const { Op } = require('sequelize');

const Task = require('../models/task');
const Category = require('../models/category');
const User = require('../models/user');

exports.getAllTasks = async (req, res) => {
    let { userId, sort, page, perPage, search } = req.query;
    try {
        // Check if userId is provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        // Sort
        if (!sort) {
            sort = [
                { order: 'DESC', orderBy: 'startAt' },
                { order: 'ASC', orderBy: 'createdAt' },
            ];
        }

        const order = sort.map(param => [param.orderBy, param.order]);

        // Pagination
        const tasksCount = await Task.count({ where: { userId } });
        const pagination = {
            page: parseInt(page) || 1,
            perPage: parseInt(perPage) || 10,
            total: Math.ceil(tasksCount / (parseInt(perPage) || 10)),
        };
        const offset = (pagination.page - 1) * pagination.perPage;

        // Construct the where clause
        let where = { userId };
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
            ];
        }

        const tasks = await Task.findAll({ where, order, offset, limit: pagination.perPage });

        for (let i = 0; i < tasks.length; i++) {
            // Add category to the task
            if (tasks[i].categoryId) {
                const category = await Category.findByPk(parseInt(tasks[i].categoryId));
                if (category) tasks[i].dataValues.category = category.dataValues;
            }
        }

        return res.status(200).json(formatRes('success', tasks, null, pagination));
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message));
    }
};

exports.getTaskById = async (req, res) => {
    const { userId } = req.query;
    try {
        // Check if all fields are provided
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));

        // Get the task and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const task = await Task.findByPk(parseInt(req.params.id));
        if (!task) return res.status(404).json(formatRes('error', null, 'No task found with this id'));

        // Add category to the task
        if (task.categoryId) {
            const category = await Category.findByPk(parseInt(task.categoryId));
            if (category) task.dataValues.category = category.dataValues;
        }

        return res.status(200).json(formatRes('success', task))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.createTask = async (req, res) => {
    const { userId, categoryId, name, description, done, startAt, endAt} = req.body;
    try {
        // Check if all fields are provided
        if (!userId || !name || !startAt) return res.status(400).json(formatRes('error', null, 'Missing fields: userId, name, startAt'));

        // Check if userId exists
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        if (categoryId) {
            // Check if categoryId exists
            const category = await Category.findByPk(parseInt(categoryId));
            if (!category) return res.status(404).json(formatRes('error', null, 'No category found with this id'));
        }

        const task = await Task.create({userId, categoryId, name, description, done, startAt, endAt});
        if (!task) return res.status(500).json(formatRes('error', null, 'Error creating task'));

        return res.status(201).json(formatRes('success', null, 'Task created'))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.updateTask = async (req, res) => {
    const { userId, categoryId, name, description, done, startAt, endAt} = req.body;
    try {
        // Get the task and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const task = await Task.findByPk(parseInt(req.params.id));
        if (!task) return res.status(404).json(formatRes('error', null, 'No task found with this id'));

        // Check if userId exists
        if (!userId) return res.status(400).json(formatRes('error', null, 'Missing fields: userId'));
        const user = await User.findByPk(parseInt(userId));
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this id'));

        if (categoryId) {
            // Check if categoryId exists
            const category = await Category.findByPk(parseInt(categoryId));
            if (!category) return res.status(404).json(formatRes('error', null, 'No category found with this id'));
        }

        const resp = await task.update({userId, categoryId, name, description, done, startAt, endAt});
        if (!resp) return res.status(500).json(formatRes('error', null, 'Error updating task'));

        return res.status(201).json(formatRes('success', 'Task updated'))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.deleteTask = async (req, res) => {
    try {
        // Get the task and check if it exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const task = await Task.findByPk(parseInt(req.params.id));
        if (!task) return res.status(404).json(formatRes('error', null, 'No task found with this id'));

        const resp = await task.destroy();
        if (!resp) return res.status(404).json(formatRes('error', null, 'Error deleting task'));

        return res.status(200).json(formatRes('success', null, 'Task deleted'))

    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
}
