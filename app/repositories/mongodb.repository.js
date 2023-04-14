class MongoDBRepository {
    constructor(model, context) {
        this.model = model;
        this.context = context;
    }

    find(filter, { lean, sort, populate, exec, skip } = {}) {
        return new Promise((resolve, reject) => {
            try {
                this.model.setDefaultLanguage(this.context && this.context.locale ? this.context.locale : 'en');
                const executeModel = this.model.find(filter);
                const result = executeModel.skip(skip ? (Number(skip.pageNo) - 1) * skip.limit : null)
                    .limit(skip ? skip.limit : null)
                    .sort(sort ? sort : null)
                    .populate(populate ? populate : null)
                    .lean(lean ? true : false)
                    .exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    findById(id, { projection, options, callback, exec } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.findById(id, projection ? projection : '', options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    findOne(conditions, { lean, populate, exec, callback, projection, options } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const executeModel = this.model.findOne(conditions, projection ? projection : '', options ? options : null, callback ? callback : null);
                const result = executeModel.populate(populate ? populate : null)
                    .lean(lean ? true : false)
                    .exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    create(docs) {
        return new Promise((resolve, reject) => {
            try {
                const document = new this.model(docs);
                let result = document.save();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    insertMany(docs, { exec } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const executeModel = this.model.insertMany(docs).exec(exec? exec: null);
                const result = executeModel;
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    bulkWrite(docs){
        return new Promise( (resolve, reject) => {
            try {
                const executeModel = this.model.bulkWrite(docs);
                const result = executeModel;
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    findByIdAndUpdate(id, update, { options, exec, callback } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.findByIdAndUpdate(id, update, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    findByIdAndDelete(id, { options, callback, exec } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.findByIdAndDelete(id, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    findOneAndDelete(conditions = {}, { options, exec, callback } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.findOneAndDelete(conditions, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    aggregate(query, { exec } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const executeModel = this.model.aggregate(query);
                const result = executeModel.exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateMany(conditions = {}, doc = {}, { callback, options, exec } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.updateMany(conditions, doc, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    findOneAndUpdate(conditions, update, { options, exec, callback }) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.findOneAndUpdate(conditions, update, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    countDocuments(conditions, { callback, exec } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.countDocuments(conditions, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    findOneAndRemove(conditions, { options, callback, exec } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.findOneAndRemove(conditions, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteMany(conditions, { options, callback, exec } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.deleteMany(conditions, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteOne(conditions, { options, callback, exec } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.deleteOne(conditions, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    replaceOne(conditions = {}, doc = {}, { callback, exec, options } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.replaceOne(conditions, doc, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    findOneAndReplace(filter = {}, replacement = {}, { callback, exec, options } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.findOneAndReplace(filter, replacement, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateOne(conditions = {}, doc = {}, { callback, options, exec } = {}) {
        return new Promise( (resolve, reject) => {
            try {
                const result = this.model.updateOne(conditions, doc, options ? options : null, callback ? callback : null).exec(exec ? exec : null);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = { MongoDBRepository };