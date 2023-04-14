const validator = require('validator');

const { BaseEntitySchema } = require('./base-entity.mongodb.schema');

const UserSchema = BaseEntitySchema('User',
    {
        // applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
        // companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
        firstName: { type: String, required: true, es_indexed: true },
        lastName: { type: String, es_indexed: true },
        email: {
            type: String,
            require: [true, 'Enter an email address.'],
            unique: [true, 'That email address is taken.'],
            lowercase: true,
            validate: [validator.isEmail, 'Enter a valid email address.']
        },
        password: { type: String },
        locked: { type: Boolean, default: false, required: true },
        isPasswordConfirm: { type: Boolean, default: false, required: true },
        lastLoginAt: { type: Date },
        accepted: { type: Boolean, default: false, required: true },
        phone: { type: String }
    },
    {
        timestamps: true
    },
    { firstName: 1, lastName: 1, email: 1, phone: 1 },
    { elasticSearch: true }
);
module.exports = { UserSchema };