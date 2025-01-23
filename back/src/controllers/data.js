const formatRes = require("../helpers/formatRes");
const Data = require("../models/data");
const Event = require("../models/Event");
const EventType = require("../models/eventType");

const createEventFromDisaster = async (disasterData) => {
  try {
    const eventType = await EventType.findOne({
      where: { name: disasterData.type_disaster }
    });

    if (!eventType) {
      throw new Error(`Type d'événement non trouvé: ${disasterData.type_disaster}`);
    }

    return await Event.create({
      name: `${disasterData.type_disaster} en Zone ${disasterData.zone}`,
      description: `${disasterData.type_disaster} détecté avec une valeur de ${JSON.stringify(disasterData.value_disaster)}`,
      start_time: disasterData.createdAt,
      end_time: new Date(Date.now() + 24*60*60*1000),
      severity: disasterData.severity,
      event_type_id: eventType.id,
      zone_id: disasterData.zone,
    });
  } catch (error) {
    throw new Error(`Erreur création événement: ${error.message}`);
  }
};

exports.getAllData = async (req, res) => {
  try {
    const data = await Data.findAll();
    return res.status(200).json(formatRes("success", data));
  } catch (error) {
    return res.status(500).json(formatRes("error", null, error.message));
  }
};

exports.getDataById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json(formatRes("error", null, "ID manquant"));
    }

    const data = await Data.findByPk(parseInt(req.params.id));
    if (!data) {
      return res.status(404).json(formatRes("error", null, "Données non trouvées"));
    }

    return res.status(200).json(formatRes("success", data));
  } catch (error) {
    return res.status(500).json(formatRes("error", null, error.message));
  }
};

exports.addData = async (req, res) => {
  try {
    const data = await Data.create(req.body);
    let event = null;

    if (req.body.type_disaster) {
      event = await createEventFromDisaster(req.body);
    }

    return res.status(201).json(formatRes("success", { data, event }));
  } catch (error) {
    return res.status(500).json(formatRes("error", null, error.message));
  }
};