const formatRes = require('../helpers/formatRes')

const Alert = require('../models/alert');

exports.getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.findAll();
        return res.status(200).json(formatRes('success', alerts))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.getAlertById = async (req, res) => {
    try {
        // Check if alert exists
        if (!req.params.id) return res.status(400).json(formatRes('error', null, 'No id provided'));
        const alert = await Alert.findByPk(parseInt(req.params.id));
        if (!alert) return res.status(404).json(formatRes('error', null, 'No alert found with this id'));

        return res.status(200).json(formatRes('success', alert))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};