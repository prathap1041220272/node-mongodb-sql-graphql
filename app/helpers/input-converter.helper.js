const { removeEmptyProperties
} = require('./remove-empty-properties-from-object.helper');

function inputConverter() {
    return async (req, res, next) => {
        req.body = removeEmptyProperties(req.required_parameters.reduce((acc, curr) => (acc[curr] = req.body[req.body_parameters[curr]], acc), {}));
        next();
    };
}

module.exports = {
    inputConverter
};