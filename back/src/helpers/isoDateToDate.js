module.exports = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : null;
}