// Import config
const sequelize = require('./src/config/database');

// Importing models
const Event = require('./src/models/event');
const EventType = require('./src/models/eventType');
const Zone = require('./src/models/zone');
const Alert = require('./src/models/alert');

// Importing helpers
const logConsole = require('./src/helpers/logConsole')

// ? This script is meant to be run only once, to seed the database with sample data just for test purposes. It will drop all existing tables and recreate them, then insert the sample data.

const seedData = async () => {
    try {
        // Check the database connection
        await sequelize.authenticate();

        // Drop database tables (disable and re-enable foreign key checks)
        await sequelize.query('PRAGMA foreign_keys = OFF');
        await Event.drop();
        await EventType.drop();
        await Zone.drop();
        await Alert.drop();
        await sequelize.query('PRAGMA foreign_keys = ON');

        // Synchronize the database (drop all existing tables and recreate them)
        await sequelize.sync({ force: true });

        const sample = require('./src/seed_data/event_type.json');
        await EventType.bulkCreate(sample);
        delete sample;
        const sample = require('./src/seed_data/zone.json');
        await Zone.bulkCreate(sample);
        delete sample;
        const sample = require('./src/seed_data/alert.json');
        await Alert.bulkCreate(sample);
        delete sample;
        const sample = require('./src/seed_data/event.json');
        await Event.bulkCreate(sample);
        delete sample;

        logConsole('Sample data inserted');
    } catch (error) {
        logConsole('❌ Error seeding data ❌');
        logConsole(error, 'error');
        throw error;
    }
};

(async () => {
    try {
        await seedData();
        logConsole('✅ Data seeding completed ✅');
        process.exit(0); // Terminate the script
    } catch (error) {
        logConsole('❌ Error running the script ❌');
        logConsole(error, 'error');
        process.exit(1); // Terminate the script with an error
    } finally {
        await sequelize.close(); // Ensure the connection is closed properly
    }
})();