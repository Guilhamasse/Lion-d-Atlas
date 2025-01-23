const axios = require("axios");

const backendUrl = "http://localhost:3000/api/data";

// Configuration des capteurs par zone
const sensors = [
  { dataId: 1, zoneId: 1, allowedDisasters: ["séisme"] },
  { dataId: 2, zoneId: 2, allowedDisasters: ["inondation"] },
  { dataId: 3, zoneId: 3, allowedDisasters: ["séisme", "inondation"] },
  { dataId: 4, zoneId: 4, allowedDisasters: ["inondation"] },
  { dataId: 5, zoneId: 5, allowedDisasters: ["séisme"] }
];

const generateData = (sensor) => {
  const hasDisaster = Math.random() < 1/10;
  const disasterType = hasDisaster 
    ? sensor.allowedDisasters[Math.floor(Math.random() * sensor.allowedDisasters.length)]
    : null;

  return {
    dataId: sensor.dataId,
    zoneId: sensor.zoneId,
    type_disaster: disasterType,
    value_disaster: hasDisaster ? Math.floor(Math.random() * 100) + 1 : 0,
    updatedAt: null,
    createdAt: new Date(),
  };
};

// Envoyer les données pour tous les capteurs
setInterval(() => {
  sensors.forEach(sensor => {
    const data = generateData(sensor);
    
    axios.post(backendUrl, data)
      .then((response) => {
        console.log(`✅ Données envoyées du capteur ${sensor.dataId} (Zone ${sensor.zoneId}):`, data);
        if (data.type_disaster) {
          console.log(`🚨 ALERTE: ${data.type_disaster} détecté dans la zone ${sensor.zoneId}!`);
        }
      })
      .catch((error) => {
        console.error(`❌ Erreur pour le capteur ${sensor.dataId} (Zone ${sensor.zoneId}):`);
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