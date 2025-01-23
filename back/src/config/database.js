const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    // logging: console.log // ? Enable logging to see SQL statements
});

module.exports = sequelize;
