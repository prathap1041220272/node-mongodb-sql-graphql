const { BaseService } = require('../services/base.service');
const { UserSchema } = require('../models/user.mongodb.schema');
const { match, hash } = require('../helpers/password.helper');
const { generate } = require('../helpers/jwt.helper');
const { userValidator } = require('../validators/authentication.validator');

exports.Login = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const request = await req.body;
        const userDetails = await userValidator(userContext, { email: request.email });
        const checkPassword = await match(request.password, userDetails.password);
        if (!checkPassword) {
            const error = new Error('Invalid username or password!');
            error.status = 401;
            throw error;
        }
        const token = await generate({
            userId: userDetails._id
        }, 60 * 60 * 60);
        next([true, 200, 'User created successfully', { token }]);
    } catch (error) {
        next(error);
    }
};

exports.ChangePassword = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const request = await req.body;
        const userDetails = req.userDetails;
        const checkPassword = await match(request.password, userDetails.password);
        if (!checkPassword) {
            const error = new Error('Invalid password!');
            error.status = 401;
            throw error;
        }
        const checkPasswordIsSame = await match(request.confirmPassword, userDetails.password);
        if (checkPasswordIsSame) {
            const error = new Error('Password shouldn\'t be the same!');
            error.status = 401;
            throw error;
        }
        const newPassword = await hash(request.confirmPassword);
        await new BaseService(UserSchema, userContext).findOneAndUpdate({ _id: userDetails._id }, {
            password: newPassword
        }, {
            options: {
                new: true
            }
        });
        next([true, 200, 'Updated password successfully', null]);
    } catch (error) {
        next(error);
    }
};

exports.Register = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const request = await req.body;
        const userDetails = await new BaseService(UserSchema, userContext).findOne({ email: userDetails.email });
        const checkPassword = await match(request.password, userDetails.password);
        if (!checkPassword) {
            const error = new Error('Invalid password!');
            error.status = 401;
            throw error;
        }
        const checkPasswordIsSame = await match(request.confirmPassword, userDetails.password);
        if (checkPasswordIsSame) {
            const error = new Error('Password shouldn\'t be the same!');
            error.status = 401;
            throw error;
        }
        const newPassword = await hash(request.confirmPassword);
        await new BaseService(UserSchema, userContext).findOneAndUpdate({ _id: userDetails._id }, {
            password: newPassword
        }, {
            options: {
                new: true
            }
        });
        next([true, 200, 'Updated password successfully', null]);
    } catch (error) {
        next(error);
    }
};