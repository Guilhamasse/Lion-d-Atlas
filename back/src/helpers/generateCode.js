module.exports = () => {
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    return resetCode;
}