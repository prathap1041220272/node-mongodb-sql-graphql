const jwt = require('jsonwebtoken');
const config = require('../config/configurations');

async function generate(payLoad, expiry) {
    payLoad.expiresIn = expiry || config.jwt.tokenExpirePeriod;
    const expiresIn = expiry || config.jwt.tokenExpirePeriod;
    const isObject = (typeof payLoad === 'object');

    if (!payLoad) {
        const error = new TypeError('Token Payload Should Not Be Empty');
        throw error;
    }

    if (!expiry) {
        const error = new TypeError('Token expiry Should Not Be Empty');
        throw error;
    }

    if (!isObject) {
        const error = new TypeError('Token Payload Must Be An Object');
        throw error;
    }
    return new Promise((resolve, reject) => {
        jwt.sign(payLoad, config.jwt.secret, { expiresIn }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
}

async function verifyToken(token) {
    if (!token) {
        const error = new TypeError('Token Should Not Be Empty');
        error.status = 401;
        throw error;
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt.secret, (error, decodedToken) => {
            if (error) {
                error = new TypeError('Invalid Token!');
                error.status = 401;
                reject(error);
            } else {
                resolve(decodedToken);
            }
        });
    });
}

module.exports = {
    generate: generate,
    verify: verifyToken
};