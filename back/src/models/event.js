const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const EventType = require('./eventType');
const Zone = require('./zone');

const Event = sequelize.define('Event', {
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
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    severity: {
        type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
        allowNull: false,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    magnitude: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    event_type_id: {
        type: DataTypes.UUID,
        references: {
            model: EventType,
            key: 'id',
        },
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
    tableName: 'event',
});

module.exports = Event;
