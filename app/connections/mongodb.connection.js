/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { Configurations } = require('../config/configurations');
// const { errorHandler } = require('../helpers/request-handler.helper');

async function mongodbConnectionDb() {
        try {
                await mongoose.connect(Configurations.db.mongodbURI.uri, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
                console.log('Connected To Mongo DB');
        } catch (error) {
                console.log('Database Connection Failed', error);
                // errorHandler(error);
                process.exit(1);
        }
}

module.exports = { mongodbConnectionDb };