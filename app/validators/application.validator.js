const { validationResult, check } = require('express-validator');

function applicationValidator(values) {
    return async (req, res, next) => {
        req.body_parameters = {
            name: 'name',
            description: 'description',
            clientId: 'client',
            clientSecret: 'secret'
        };
        req.required_parameters = values;
        if(values.includes('name')) {
            await check(req.body_parameters['name'], 'Name is required').notEmpty().run(req);
        }
        if(values.includes('description')) {
            await check(req.body_parameters['description'], 'Description is required').notEmpty().run(req);
        }
        if(values.includes('clientId')) {
            await check(req.body_parameters['clientId'], 'Client is required').notEmpty().run(req);
        }
        if(values.includes('clientSecret')) {
            await check(req.body_parameters['clientSecret'], 'Secret is required').notEmpty().run(req);
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.errors[0].msg);
            error.status = 400;
            next(error);
        }
        next();
    };
}

module.exports = {
    applicationValidator
};