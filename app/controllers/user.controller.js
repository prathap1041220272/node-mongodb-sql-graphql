const { BaseService } = require('../services/base.service');
const { UserSchema } = require('../models/user.mongodb.schema');
const { userMapperSingle, userMapperMultiple } = require('../mappers/user.mapper');
const { hash } = require('../helpers/password.helper');

exports.Create = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const requestBody = await req.body;
        requestBody.password = await hash(requestBody.password);
        const response = await new BaseService(UserSchema, userContext).create(requestBody);
        next([true, 200, 'User created successfully', userMapperSingle(response, 'limited')]);
    } catch (error) {
        next(error);
    }
};

exports.Update = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(UserSchema, userContext).findByIdAndUpdate(req.params.id, req.body, {});
        next([true, 200, 'User created successfully', userMapperSingle(response, 'limited')]);
    } catch (error) {
        next(error);
    }
};

exports.GetAll = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(UserSchema, userContext).find({});
        next([true, 200, 'Users fetched successfully', userMapperMultiple(response, 'limited')]);
    } catch (error) {
        next(error);
    }
};


exports.DeleteAll = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(UserSchema, userContext).deleteMany({}, {});
        next([true, 200, 'Users deleted successfully', response]);
    } catch (error) {
        next(error);
    }
};

exports.Get = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(UserSchema, userContext).findById({ _id: req.params.id });
        next([true, 200, 'User fetched successfully', userMapperSingle(response, 'limited')]);
    } catch (error) {
        next(error);
    }
};

exports.Delete = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(UserSchema, userContext).findByIdAndDelete({ _id: req.params.id }, {});
        next([true, 200, 'User deleted successfully', userMapperSingle(response, 'limited')]);
    } catch (error) {
        next(error);
    }
};
