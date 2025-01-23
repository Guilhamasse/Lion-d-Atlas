module.exports = (msg, type = 'log') => {
    if (!msg) return;

    msg = `[app] ${msg}`;

    if (type === 'error') console.error(msg);
    else console.log(msg);
}