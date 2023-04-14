/* eslint-disable no-undef */
const elasticsearch = require('elasticsearch');
const { Configurations } = require('../config/configurations');

let elasticsearchConnection;
async function startElasticsearch() {
    try{
        elasticsearchConnection = await new elasticsearch.Client({
            host: Configurations.elasticsearch.uri,
            // log: 'trace'
            log: 'error'
        });
        console.log('Connected To Elastic Search Server');
    } catch(error) {
        console.log(error);
    }
}
// client.indices.delete({
//     index: 'jobsearchengines',
//   }).then(function(resp) {
//     console.log("Successful query!");
//     console.log(JSON.stringify(resp, null, 4));
//   }, function(err) {
//     console.trace(err.message);
//   });
// client.indices.create({  
//     index: 'jobsearchengines'
//   },function(err,resp,status) {
//     if(err) {
//       console.log(err);
//     }
//     else {
//       console.log("create",resp);
//     }
//   });
module.exports = {
    elasticsearchConnection,
    startElasticsearch
};