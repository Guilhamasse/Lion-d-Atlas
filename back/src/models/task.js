const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    taskId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'userId'
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category',
            key: 'categoryId'
        },
        allowNull: true,
        onDelete: 'SET NULL',  
        onUpdate: 'CASCADE'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    startAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    tableName: 'task',
});

module.exports = Task;
