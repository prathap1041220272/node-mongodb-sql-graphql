/* eslint-disable no-unused-vars */
const { logger } = require('../logger/system.logger');
const { sendEmail } = require('./send-email.helper');
const { BaseResponse } = require('../view-models/base-response.view-model');

// exports.requestHandler = (req, res, next) => {
//     let logs = {
//         platform: req.headers['platform'],
//         userIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
//         method: req.method,
//         userAgent: req.headers['user-agent'],
//         url: req.originalUrl,
//         origin: req.headers.origin
//     };
//     // logger.log({
//     //     level: 'error',
//     //     message: logs
//     // });
//     next();
// };

//handle mongodb duplicates
const handleDuplicateKeyError = (err, req) => {
    let fields = [];
    const keys = Object.keys(err.keyValue).map((field) => {
        return req.body_parameters[field];
    });
    const error = new Error(`A record with the ${keys} already exists.`);
    error.status = 409;
    return error;
};

//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, req) => {
    let fields = Object.values(err.errors).map(el => req.body_parameters[el.path]);
    // let errors = Object.values(err.errors).map(el => el.message);
    // console.log(fields, errors)
    const error = new Error(`Passing Invalid fields "${fields}"!`);
    error.status = 400;
    return error;
};

exports.requestHandler = async (response, req, res, next) => {
    if (response[0]) {
        const [success, status, message, data] = response;
        return res.status(status).json(BaseResponse(success, status, message, data));
    }
    // console.log(error, 'error');
    if (response.name === 'MongoError' && response.code === 11000) {
        response.status = 409;
    }
    if (response.name === 'ValidationError') {
        response = handleValidationError(response, req);
    }
    if (response.code && response.code == 11000) {
        response = handleDuplicateKeyError(response, req);
    }
    const { message = 'Something Went Wrong' } = response;
    const logs = {
        message: response.message,
        status: response.status || 500,
        description: response,
        type: 'error',
        platform: req.headers['platform'],
        userIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        method: req.method,
        userAgent: req.headers['user-agent'],
        url: req.originalUrl,
    };
    if (response.status >= 500) {
        // await sendEmail('sivaprathap.konduru@gmail.com', 'Something went wrong', error);
        logger.log({
            level: 'error',
            message: logs
        });
    } else {
        logger.log({
            level: 'error',
            message: logs
        });
    }
    res.status(response.status).json({ message });
};
