const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { BaseEntitySchema } = require('./base-entity.mongodb.schema');

const CompanySchema = BaseEntitySchema('Company',
    {
        applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
        companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
        parentId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
        name: { type: String, es_indexed: true },
        description: { type: String },
        poc: { type: Schema.Types.ObjectId, ref: 'User' },
        objectType: { type: String, enum: ['Master', 'Company', 'Brand'], default: 'Company' },
        fTest: { type: Boolean, default: false }
    },
    {
        timestamps: true
    },
    { applicationId: 1, companyId: 1, parentId: 1, name: 1 },
    { elasticSearch: true }
);
module.exports = { CompanySchema };