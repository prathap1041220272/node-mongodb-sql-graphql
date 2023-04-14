const { BaseService } = require('../services/base.service');
const { ApplicationSchema } = require('../models/application.mongodb.model');
const { applicationMapperSingle, applicationMapperMultiple } = require('../mappers/application.mapper');

exports.Create = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(ApplicationSchema, userContext).create(req.body);
        next([true, 200, 'Application created successfully', applicationMapperSingle(response, 'all')]);
    } catch (error) {
        next(error);
    }
};

exports.Update = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(ApplicationSchema, userContext).findByIdAndUpdate(req.params.id, req.body, {});
        next([true, 200, 'Application created successfully', applicationMapperSingle(response, 'all')]);
    } catch (error) {
        next(error);
    }
};

exports.GetAll = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(ApplicationSchema, userContext).find({});
        next([true, 200, 'Applications fetched successfully', applicationMapperMultiple(response, 'all')]);
    } catch (error) {
        next(error);
    }
};


exports.DeleteAll = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(ApplicationSchema, userContext).deleteMany({}, {});
        next([true, 200, 'Applications deleted successfully', response]);
    } catch (error) {
        next(error);
    }
};

exports.Get = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(ApplicationSchema, userContext).findById({ _id: req.params.id });
        next([true, 200, 'Application fetched successfully', applicationMapperSingle(response, 'all')]);
    } catch (error) {
        next(error);
    }
};

exports.Delete = async (req, res, next) => {
    try {
        const userContext = req.userContext;
        const response = await new BaseService(ApplicationSchema, userContext).findByIdAndDelete({ _id: req.params.id }, {});
        next([true, 200, 'Application deleted successfully', applicationMapperSingle(response, 'all')]);
    } catch (error) {
        next(error);
    }
};
