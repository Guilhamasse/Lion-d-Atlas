const alertController = require('./controllers/event');
const eventController = require('./controllers/event');
const eventTypeController = require('./controllers/eventType');
const zoneController = require('./controllers/zone');

const express = require('express');
const router = express.Router();

router.get('/alert', alertController.getAllAlerts);
router.get('/alert/:id', alertController.getAlertById);

router.get('/event', eventController.getAllEvents);
router.get('/event/:id', eventController.getEventById);

router.get('/event_type', eventTypeController.getAllEventTypes);
router.get('/event_type/:id', eventTypeController.getEventTypeById);

router.get('/zone', zoneController.getAllZones);
router.get('/zone/:id', zoneController.getZoneById);

module.exports = router;
