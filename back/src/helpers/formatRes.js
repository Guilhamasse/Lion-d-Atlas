module.exports = (status = '', data = [], message = null, pagination = {}) => {
    const response = {
        status,
        message,
        data
    };

    if (pagination && Object.keys(pagination).length > 0) {
        response.pagination = pagination;
    }

    return response;
};
