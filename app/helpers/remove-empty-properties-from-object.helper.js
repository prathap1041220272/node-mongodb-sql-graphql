async function removeEmptyProperties(obj) {
    for (var prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
            delete obj[prop];
        }
    }
    return obj;
}

module.exports = {
    removeEmptyProperties
};