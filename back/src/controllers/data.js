const formatRes = require("../helpers/formatRes");
const Data = require("../models/data");
const Event = require("../models/event");
const EventType = require("../models/eventType");
const { v4: uuidv4 } = require('uuid');

const createEventFromDisaster = async (disasterData) => {
  try {
    // Validation des données nécessaires
    if (!disasterData.type_disaster) {
      throw new Error("Type de désastre manquant.");
    }

    const eventType = await EventType.findOne({
      where: { name: disasterData.type_disaster },
    });

    if (!eventType) {
      throw new Error(
        `Type d'événement non trouvé: ${disasterData.type_disaster}`
      );
    }

    const now = new Date();
    const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Déterminer le niveau ou la magnitude
    let level = null;
    let magnitude = null;

    if (disasterData.type_disaster.toLowerCase() === 'inondation') {
      level = parseInt(disasterData.value_disaster) || 1;
    } else if (disasterData.type_disaster.toLowerCase() === 'seisme') {
      magnitude = parseFloat(disasterData.value_disaster) || null;
    }

    // Création de l'événement
    return await Event.create({
      id: uuidv4(),
      name: `${disasterData.type_disaster} Zone ${disasterData.zone}`,
      description: `${disasterData.type_disaster} ${
        magnitude
          ? `de magnitude ${magnitude}`
          : level
          ? `de niveau ${level}`
          : ''
      } détecté dans la Zone ${disasterData.zone}`,
      start_time: now,
      end_time: endTime,
      severity: disasterData.severity || 'Medium',
      level: level,
      magnitude: magnitude,
      event_type_id: eventType.id,
      zone_id: disasterData.zone,
      created_at: now,
      updated_at: now,
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
      return res
        .status(404)
        .json(formatRes("error", null, "Données non trouvées"));
    }

    return res.status(200).json(formatRes("success", data));
  } catch (error) {
    return res.status(500).json(formatRes("error", null, error.message));
  }
};

exports.addData = async (req, res) => {
  try {
    const { zone, type_disaster, value_disaster, severity } = req.body;

    // Valider les champs nécessaires
    if (!zone) {
      return res.status(400).json(formatRes("error", null, "Le champ 'zone' est requis."));
    }

    // Validation conditionnelle pour les désastres
    if (type_disaster && !value_disaster) {
      return res.status(400).json(formatRes(
        "error",
        null,
        "Si un type de désastre est fourni, sa valeur est également requise."
      ));
    }

    // Créez l'entrée dans la table 'Data'
    const data = await Data.create(req.body);

    // Si un type de désastre est défini, créez un événement
    let event = null;
    if (type_disaster) {
      event = await createEventFromDisaster(req.body);
    }

    return res.status(201).json(formatRes("success", { data, event }));
  } catch (error) {
    return res.status(500).json(formatRes("error", null, error.message));
  }
};