const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Zone = sequelize.define('Zone', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: false,
        defaultValue: '#000000',
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    tableName: 'zone',
});

module.exports = Zone;
