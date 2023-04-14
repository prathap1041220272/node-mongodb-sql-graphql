const BaseResponse = (success, status, message, data) => {
    return {
        success, status, message, data
    };
};

module.exports = { BaseResponse };