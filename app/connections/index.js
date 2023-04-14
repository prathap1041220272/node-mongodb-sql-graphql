const { mongodbConnectionDb } = require('./mongodb.connection');
const { startRedis } = require('./memory-chache.connection');
const { getConnection } = require('./queue.connection');
const { startElasticsearch } = require('./elastic-search.connection');

function loadConnections() {
    mongodbConnectionDb();
    startRedis();
    getConnection();
    startElasticsearch();
}

module.exports = {
    loadConnections
};