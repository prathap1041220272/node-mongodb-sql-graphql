const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');
const { BaseSchema } = require('./base.mongodb.schema');
const { BaseService } = require('../services/base.service');
const { AuditSchema } = require('./audit.mongodb.schema');
const { elasticsearchConnection } = require('../connections/elastic-search.connection');

mongoose.plugin(mongooseIntl, { languages: ['en', 'ar', 'hi', 'te'], defaultLanguage: 'en' });
const mongoosastic = require('mongoosastic');

function BaseEntitySchema(schemaName, definition, options, index, elasticSearch) {
    return mongoose.model(
        schemaName,
        getSchema(),
        schemaName
    );

    function getSchema() {
        const schema = new mongoose.Schema(
            Object.assign({}, BaseSchema, definition),
            options
        )
            .post('save', (doc, next) => {
                createAudit(doc, 'CREATE', schemaName);
                next();
            })
            .pre('findOneAndUpdate', function (next) {
                this.update({}, { $inc: { __v: 1 } }, next);
            })
            .post('findOneAndUpdate', (doc, next) => {
                createAudit(doc, 'UPDATE', schemaName);
                next();
            })
            .post('findOneAndDelete', (doc, next) => {
                createAudit(doc, 'DELETE', schemaName);
                next();
            })
            .post('findIdAndDelete', (doc, next) => {
                createAudit(doc, 'DELETE', schemaName);
                next();
            });

        if (index) {
            schema.index(index, { unique: true });
        }
        if (elasticSearch) {
            schema.plugin(mongoosastic, {
                esClient: elasticsearchConnection
            });
        }
        return schema;
    }
}

function createAudit(doc, type, schemaName, next) {
    try {
        const data = {
            schemaName,
            refId: doc._id,
            operation: type,
            version: doc.__v,
            oldValue: JSON.stringify(doc),
            newValue: JSON.stringify(doc),
            applicationId: doc.applicationId,
            companyId: doc.applicationId
        };

        data.createdBy = doc.createdBy;
        data.lastModifiedBy = doc.lastModifiedBy;
        if (type === 'CREATE') {
            data.oldValue = '';
        }
        if (type === 'DELETE') {
            data.newValue = '';
        }
        new BaseService(AuditSchema).create(data);
        return;
    } catch (error) {
        next(error);
    }
}

module.exports = { BaseEntitySchema };