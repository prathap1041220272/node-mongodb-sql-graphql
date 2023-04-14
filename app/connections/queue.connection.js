/* eslint-disable no-undef */
const client = require('amqplib');
const { Configurations } = require('../config/configurations');
const connection$ = client.connect(Configurations.cloudAmqpapikey.uri);

async function getConnection() {
    try {
        const connection = await connection$;
        console.log('Connected To Q Server');
        return connection;
    } catch (error) {
        console.error('Rabbit MQ Not Connected');
        console.log(error);
        setTimeout(1000, getConnection());
        process.exit(1);
    }
}

module.exports = {
    getConnection
};