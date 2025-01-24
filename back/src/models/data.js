const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Data = sequelize.define('Data', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    zone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type_disaster: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    value_disaster: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    severity: {
        type: DataTypes.STRING(50),
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
    }
}, {
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    tableName: 'data',
});

module.exports = Data;