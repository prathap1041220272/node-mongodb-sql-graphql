const { requestHandler } = require('../helpers/request-handler.helper');

module.exports = app => {
    app.use('/api/v1/application', require('./application.route'));
    app.use('/api/v1/user', require('./user.route'));
    app.use('/api/v1/authentication', require('./authentication.route'));
    app.use(requestHandler);
};