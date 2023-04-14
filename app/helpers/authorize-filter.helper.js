const { verify } = require('./jwt.helper');

function authorize() {
    return async (req, res, next) => {
        req.userContext = {};
        req.userContext.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress
            || (req.connection.socket ? req.connection.socket.remoteAddress : null);
        req.userContext.locale = req.headers.locale ? req.headers.locale : 'en';

        const token = (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
        /*
         * If Token Not Exist Unauthorized Error;
         */
        if (!token) {
            const error = new Error('Unauthorized');
            error.status = 401;
            return next(error);
        }
        try {
            const decodedData = await verify(token);
            req.tokenData = decodedData;
            next();
        } catch (error) {
            next(error);
        }
    };
}


module.exports = {
    authorize
};