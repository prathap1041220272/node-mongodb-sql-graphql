const UserContext = (req, res, next) => {
    const userContext = {};
    userContext.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress
        || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    userContext.locale = req.headers['accept-language'] || 'en';
    userContext.applicationId = req.headers['ApplicationId'] || req.headers['applicationId'] || req.headers['applicationid'];
    userContext.companyId = req.params.companyId;
    userContext.userId = req.tokenData && req.tokenData.userId ? req.tokenData.userId : 'NA';
    req.userContext= userContext;
    next();
};

module.exports = { UserContext };