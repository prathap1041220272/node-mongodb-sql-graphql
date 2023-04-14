const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { BaseSchema } = require('./base.mongodb.schema');

const auditSchema = new Schema({
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    schemaName: { type: String, required: true },
    oldValue: { type: String },
    refId: { type: String, required: true },
    newValue: { type: String },
    operation: { type: String, required: true, enum: ['UPDATE', 'CREATE', 'DELETE'] },
    version: { type: Number, required: true },
    ...BaseSchema
}, {
    timestamps: true,
});

const AuditSchema = mongoose.model('Audit', auditSchema);

module.exports = {
    AuditSchema
};