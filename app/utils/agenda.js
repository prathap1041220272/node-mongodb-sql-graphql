/* eslint-disable no-undef */
const { Agenda } = require('agenda');

const configureMongoDBObj = {
    db: {
        address: process.env.MONGO_DB_URL,
        collection: 'Schedule',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
};

const agenda = new Agenda(configureMongoDBObj);

module.exports = { agenda };