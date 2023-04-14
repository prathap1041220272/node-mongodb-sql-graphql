const { MongoDBRepository } = require('../repositories/mongodb.repository');

class BaseService {
    constructor(model, context) {
        this.model = model;
        this.context = context;
    }

    create(data) {
        return new MongoDBRepository(this.model, this.context).create(data);
    }

    insertMany(docs, options) {
        return new MongoDBRepository(this.model, this.context).insertMany(docs, options);
    }

    bulkWrite(data, options) {
        return new MongoDBRepository(this.model, this.context).bulkWrite(data, options);
    }

    find(query, options) {
        return new MongoDBRepository(this.model, this.context).find(query, options);
    }

    aggregate(query, options) {
        return new MongoDBRepository(this.model, this.context).aggregate(query, options);
    }

    findByIdAndUpdate(id, update, { options, exec, callback }) {
        return new MongoDBRepository(this.model, this.context).findByIdAndUpdate(id, update, { options, exec, callback });
    }

    findByIdAndDelete(conditions, options) {
        return new MongoDBRepository(this.model, this.context).findByIdAndDelete(conditions, options);
    }

    findById(conditions, options) {
        return new MongoDBRepository(this.model, this.context).findById(conditions, options);
    }

    findOne(conditions, options) {
        return new MongoDBRepository(this.model, this.context).findOne(conditions, options);
    }

    updateMany(conditions, replacement, options) {
        return new MongoDBRepository(this.model, this.context).updateMany(conditions, replacement, options);
    }

    deleteMany(conditions, options) {
        return new MongoDBRepository(this.model, this.context).deleteMany(conditions, options);
    }

    findOneAndUpdate(id, update, options) {
        return new MongoDBRepository(this.model, this.context).findOneAndUpdate(id, update, options);
    }

    findOneAndDelete(conditions, options) {
        return new MongoDBRepository(this.model, this.context).findOneAndDelete(conditions, options);
    }

    countDocuments(conditions, options) {
        return new MongoDBRepository(this.model, this.context).countDocuments(conditions, options);
    }
    
    findOneAndRemove(conditions, options) {
        return new MongoDBRepository(this.model, this.context).findOneAndRemove(conditions, options);
    }

    deleteOne(conditions, options) {
        return new MongoDBRepository(this.model, this.context).deleteOne(conditions, options);
    }

    replaceOne(conditions, replacement, options) {
        return new MongoDBRepository(this.model, this.context).replaceOne(conditions, replacement, options);
    }

    findOneAndReplace(conditions, replacement, options) {
        return new MongoDBRepository(this.model, this.context).findOneAndReplace(conditions, replacement, options);
    }

    updateOne(conditions, replacement, options) {
        return new MongoDBRepository(this.model, this.context).updateOne(conditions, replacement, options);
    }
}

module.exports = {
    BaseService,
};