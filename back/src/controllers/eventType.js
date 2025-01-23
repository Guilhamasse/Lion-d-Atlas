const formatRes = require('../helpers/formatRes')

const EventType = require('../models/eventType');

exports.getAllEventTypes = async (req, res) => {
    try {
        const eventTypes = await EventType.findAll();
        return res.status(200).json(formatRes('success', eventTypes))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getEventTypeById = async (req, res) => {
    try {
        // Check if eventType exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const eventType = await EventType.findByPk(parseInt(req.params.id));
        if (!eventType) return res.status(404).json(formatRes('error', null, 'No eventType found with this id'));

        return res.status(200).json(formatRes('success', eventType))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};