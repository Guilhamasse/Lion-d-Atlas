const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    connectionToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    validateEmailToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetPasswordCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    hasValidatedEmail: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'en-US',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastLogin: {
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
    tableName: 'user',
});

module.exports = User;
