module.exports = (msg) => {

    const LOG_PATH = 'logs/log.log';    

    if (!msg) return;

    const fs = require('fs');

    const date = new Date();
    const log = `${date.toISOString()} | ${msg}\n`;

    fs.appendFile(LOG_PATH, log, (err) => {
        if (err) {
            console.error(err);
        }
    });
}