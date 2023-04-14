/* eslint-disable no-undef */
const redis = require('redis');
const { Configurations } = require('../config/configurations');

let client;

async function startRedis() {
    try {
        client = redis.createClient({
            url: Configurations.memoryCache.uri
            // port: 19828, // replace with your port
            // host: 'redis-19828.c14.us-east-1-3.ec2.cloud.redislabs.com', // replace with your hostanme or IP address
            // password: 'vh6hG2HIOt30jsPSVWOPsLjEW04NFJtB', // replace with your password
        });
        client.on('connect', () => {
            console.log('Connected To Redis server');
        });
        client.on('error', (err) => {
            console.log('Redis error encountered', err);
            process.exit(3);
        });

        client.on('end', () => {
            console.log('Redis connection closed');
            process.exit(3);
        });
    } catch (error) {
        console.log(error);
        process.exit(3);
    }
}

module.exports = {
    client,
    startRedis
};
