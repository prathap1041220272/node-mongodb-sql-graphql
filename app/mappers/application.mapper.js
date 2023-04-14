function applicationMapperSingle(data, type) {
    if (type === 'all') {
        return {
            id: data._id,
            name: data.name,
            description: data.description,
            client: data.clientId,
            secret: data.clientSecret
        };
    } else {
        return {
            id: data._id,
            name: data.name,
            description: data.description
        };
    }
}

function applicationMapperMultiple(data, type) {
    const result = data.map((obj) => {
        return applicationMapperSingle(obj, type);
    });
    return result;
}

module.exports = {
    applicationMapperSingle,
    applicationMapperMultiple
};