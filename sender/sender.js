const axios = require("axios");

const backendUrl = "http://localhost:3000/api/data";

const sensors = [
  { id: null, zone: 1, allowedDisasters: ["séisme"] },
  { id: null, zone: 2, allowedDisasters: ["inondations"] },
  { id: null, zone: 3, allowedDisasters: ["séisme", "inondations"] },
  { id: null, zone: 4, allowedDisasters: ["inondations"] },
  { id: null, zone: 5, allowedDisasters: ["séisme"] },
];

const severityConfig = {
  Low: { probability: 0.5, multiplier: 0.5 },      // 50% de chance
  Medium: { probability: 0.3, multiplier: 1 },     // 30% de chance
  High: { probability: 0.15, multiplier: 1.5 },    // 15% de chance
  Critical: { probability: 0.05, multiplier: 2 }   // 5% de chance
};

const getRandomSeverity = () => {
  const rand = Math.random();
  let cumulativeProbability = 0;
  
  for (const [severity, config] of Object.entries(severityConfig)) {
    cumulativeProbability += config.probability;
    if (rand <= cumulativeProbability) {
      return severity;
    }
  }
  return "Low"; // Fallback
};

const generateSeismicData = () => {
  const severity = getRandomSeverity();
  const baseValue = Math.random() * 4 + 1; // Base entre 1 et 5
  const magnitude = Number((baseValue * severityConfig[severity].multiplier).toFixed(1));
  return {
    value: magnitude,
    severity,
  };
};

const generateFloodData = () => {
  const severity = getRandomSeverity();
  const baseValue = Math.random() * 200 + 10; // Base entre 10 et 210
  const level = Number((baseValue * severityConfig[severity].multiplier).toFixed(1));
  return {
    value: level,
    severity,
  };
};

const generateData = (sensor) => {
  const hasDisaster = Math.random() < 1 / 20;
  const disasterType = hasDisaster
    ? sensor.allowedDisasters[
        Math.floor(Math.random() * sensor.allowedDisasters.length)
      ]
    : null;

  let disasterData = null;
  if (disasterType) {
    if (disasterType === "séisme") {
      disasterData = generateSeismicData();
    } else if (disasterType === "inondations") {
      disasterData = generateFloodData();
    }
  }

  return {
    id: sensor.id,
    zone: sensor.zone,
    type_disaster: disasterType,
    value_disaster: disasterData ? disasterData.value : null,
    severity: disasterData ? disasterData.severity : null,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
};

// Envoyer les données pour tous les capteurs
setInterval(() => {
  sensors.forEach((sensor) => {
    const data = generateData(sensor);

    axios
      .post(backendUrl, data)
      .then((response) => {
        console.log(
          `✅ Données envoyées du capteur ${sensor.id} (Zone ${sensor.zone}):`,
          data
        );
        if (data.type_disaster) {
          console.log(
            `🚨 ALERTE: ${data.type_disaster} détecté dans la zone ${sensor.zone}!`
          );
        }
      })
      .catch((error) => {
        console.error(
          `❌ Erreur pour le capteur ${sensor.id} (Zone ${sensor.zone}):`
        );
        console.error("   - Status:", error.response?.status);
        console.error("   - Message:", error.message);
        console.error("   - URL:", backendUrl);
        console.error("   - Données envoyées:", JSON.stringify(data, null, 2));
        if (error.response?.data) {
          console.error("   - Réponse du serveur:", error.response.data);
        }
        console.error("   - Stack:", error.stack);
        process.exit(1);
      });
  });
}, 1000);