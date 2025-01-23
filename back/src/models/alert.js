const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Zone = require('./Zone');

const Alert = sequelize.define('Alert', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    zone_id: {
        type: DataTypes.UUID,
        references: {
            model: Zone,
            key: 'id',
        },
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
    tableName: 'alert',
});

module.exports = Alert;
