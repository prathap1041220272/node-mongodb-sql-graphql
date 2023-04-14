const { BaseService } = require('../services/base.service');
const { UserSchema } = require('../models/user.mongodb.schema');

async function userValidator(userContext, query) {
    const userDetails = await new BaseService(UserSchema, userContext).findOne(query);
    if (!userDetails) {
        const error = new Error('Invalid username or password!');
        error.status = 401;
        throw error;
    }
    if (userDetails.deleted) {
        const error = new Error('You\'re not allowed!');
        error.status = 403;
        throw error;
    }
    if (userDetails.locked) {
        const error = new Error('You don\'t have permissions!');
        error.status = 403;
        throw error;
    }
    if (!userDetails.active) {
        const error = new Error('You\'re account need activation!');
        error.status = 409;
        throw error;
    }
    return userDetails;
}

function authenticationValidator() {
    return async (req, res, next) => {
        const userContext = req.userContext;
        if (!req.tokenData.userId) {
            const error = new Error('Unauthorized!');
            error.status = 401;
            throw error;
        }
        const userDetails = await userValidator(userContext, { _id: req.tokenData.userId });
        req.userDetails = userDetails;
        next();
    };
}

module.exports = {
    authenticationValidator,
    userValidator
};
