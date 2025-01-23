// Import config
const sequelize = require('./src/config/database');

// Importing models
const Event = require('./src/models/event');
const EventType = require('./src/models/eventType');
const Zone = require('./src/models/zone');

// Importing helpers
const logConsole = require('./src/helpers/logConsole');

// ? This script is meant to be run only once, to seed the database with sample data just for test purposes. It will drop all existing tables and recreate them, then insert the sample data.

const seedData = async () => {
    try {
        await sequelize.authenticate();
        logConsole('🔗 Database connection établie');

        // Synchroniser sans forcer la suppression
        await sequelize.sync();

        // Vérifier si des données existent déjà
        const existingData = await Promise.all([
            EventType.count(),
            Zone.count(),
            Event.count()
        ]);

        if (existingData.reduce((sum, count) => sum + count, 0) === 0) {
            // Définir l'ordre des seeds en respectant les dépendances
            const seedFiles = [
                { model: EventType, file: './src/seed_data/event_type.json' },
                { model: Zone, file: './src/seed_data/zone.json' },
                { model: Event, file: './src/seed_data/event.json' }
            ];

            // Insérer les données
            for (const { model, file } of seedFiles) {
                const data = require(file);
                await model.bulkCreate(data);
                logConsole(`✅ Données insérées dans ${model.name}`);
            }
        } else {
            logConsole('💡 Base de données déjà initialisée');
        }
    } catch (error) {
        logConsole('❌ Erreur : ' + error.message, 'error');
        throw error;
    }
};

(async () => {
    try {
        await seedData();
        logConsole('✅ Data seeding completed successfully ✅');
        process.exit(0); // Terminate the script
    } catch (error) {
        logConsole('❌ Error running the script ❌');
        logConsole(error.message, 'error');
        process.exit(1); // Terminate the script with an error
    } finally {
        await sequelize.close(); // Ensure the connection is closed properly
        logConsole('🔒 Database connection closed');
    }
})();