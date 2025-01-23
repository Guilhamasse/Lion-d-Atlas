const formatRes = require('../helpers/formatRes')

const Zone = require('../models/zone');

exports.getAllZones = async (req, res) => {
    try {
        const zones = await Zone.findAll();
        return res.status(200).json(formatRes('success', zones))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getZoneById = async (req, res) => {
    try {
        // Check if zone exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const zone = await Zone.findByPk(parseInt(req.params.id));
        if (!zone) return res.status(404).json(formatRes('error', null, 'No zone found with this id'));

        return res.status(200).json(formatRes('success', zone))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};