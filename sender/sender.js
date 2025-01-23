const axios = require("axios");

const backendUrl = "http://localhost:3000/api/data";

// Configuration des capteurs par zone avec IDs uniques
const sensors = [
  { id: null, zone: 1, allowedDisasters: ["séisme"] },
  { id: null, zone: 2, allowedDisasters: ["inondations"] },
  { id: null, zone: 3, allowedDisasters: ["séisme", "inondations"] },
  { id: null, zone: 4, allowedDisasters: ["inondations"] },
  { id: null, zone: 5, allowedDisasters: ["séisme"] },
];

const severityLevels = ["Low", "Medium", "High", "Critical"];

const generateSeismicData = () => {
  const magnitude = Number((Math.random() * 8 + 1).toFixed(1));
  const severity =
    severityLevels[Math.floor(Math.random() * severityLevels.length)];
  return {
    magnitude,
    severity,
  };
};

const generateFloodData = () => {
  const level = Math.floor(Math.random() * 490 + 10);
  const severity =
    severityLevels[Math.floor(Math.random() * severityLevels.length)];
  return {
    level,
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
  if (disasterType === "séisme") {
    disasterData = generateSeismicData();
  } else if (disasterType === "inondation") {
    disasterData = generateFloodData();
  }

  return {
    id: sensor.id,
    zone: sensor.zone,
    type_disaster: disasterType,
    value_disaster: disasterData ? JSON.stringify(disasterData) : null, // Modification ici
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