const alertController = require('./controllers/alert');
const eventController = require('./controllers/event');
const eventTypeController = require('./controllers/eventType');
const zoneController = require('./controllers/zone');
const dataController = require('./controllers/data');

const express = require('express');
const router = express.Router();

router.get('/alert', alertController.getAllAlerts);
router.get('/alert/:id', alertController.getAlertById);
router.post('/alert', alertController.createAlert);

router.get('/event', eventController.getAllEvents);
router.get('/event/:id', eventController.getEventById);
router.post('/event', eventController.createEvent);

router.get('/event_type', eventTypeController.getAllEventTypes);
router.get('/event_type/:id', eventTypeController.getEventTypeById);

router.get('/zone', zoneController.getAllZones);
router.get('/zone/:id', zoneController.getZoneById);

router.get('/data', dataController.getAllData);
router.get('/data/:id', dataController.getDataById);
router.post('/data', dataController.addData);

module.exports = router;
