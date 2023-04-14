const { validationResult, check } = require('express-validator');

function userValidator(values, fieldsRequired = false) {
    return async (req, res, next) => {
        req.body_parameters = {
            firstName: 'first_name',
            lastName: 'last_name',
            email: 'mail',
            password: 'password',
            confirmPassword: 'confirmPassword',
            phone: 'mobile',
            locked: 'lock',
            accepted: 'accepted'
        };
        req.required_parameters = values;
        if(values.includes('firstName')) {
            await check('first_name', 'First Name is required!').notEmpty().run(req);
        }
        if(values.includes('lastName')) {
            await check('last_name', 'Last name is required!').notEmpty().run(req);
        }
        if(values.includes('email')) {
            await check('mail', 'Mail is required!').isEmail().withMessage('Email is not valid!').notEmpty().run(req);
        }
        if(values.includes('password')) {
            await check('password', 'Password is required!').notEmpty().run(req);
        }
        if(values.includes('confirmPassword')) {
            await check('confirmPassword', 'Confirm Password is required!').notEmpty().run(req);
        }
        if(values.includes('phone')) {
            await check('mobile', 'Mobile number is required!').notEmpty().run(req);
        }
        if(values.includes('locked')) {
            await check('lock', 'Lock type is required!').notEmpty().run(req);
        }
        if(values.includes('accepted')) {
            await check('accept', 'Accepted is required!').notEmpty().run(req);
        }
        if(values.length !== (Object.keys(req.body)).length && fieldsRequired) {
            const error = new Error('Fields are missing!');
            error.status = 400;
            next(error);
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
    userValidator
};
