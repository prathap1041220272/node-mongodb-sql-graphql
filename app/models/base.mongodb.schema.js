const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BaseSchema = {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false }
};

module.exports = { BaseSchema };