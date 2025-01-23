const formatRes = require('../helpers/formatRes')

const Event = require('../models/event');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        return res.status(200).json(formatRes('success', events))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getEventById = async (req, res) => {
    try {
        // Check if event exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const event = await Event.findByPk(parseInt(req.params.id));
        if (!event) return res.status(404).json(formatRes('error', null, 'No event found with this id'));

        return res.status(200).json(formatRes('success', event))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};