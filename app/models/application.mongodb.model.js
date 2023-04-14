const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { BaseEntitySchema } = require('./base-entity.mongodb.schema');

const ApplicationSchema = BaseEntitySchema('Application',
  {
    name: {
      type: String,
      required: true,
      unique: [true, 'This name is taken.'],
      index: true
    },
    description: { type: String },
    clientId: { type: Schema.Types.ObjectId, auto: true, unique: [true, 'That already registered!'] },
    clientSecret: { type: Schema.Types.ObjectId, required: true, auto: true },
  },
  {
    timestamps: true
  }
);

module.exports = { ApplicationSchema };