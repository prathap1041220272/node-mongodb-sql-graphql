function userMapperSingle(data, type) {
    if (type === 'all') {
        return {
            id: data._id,
            first_name: data.firstName,
            last_name: data.lastName,
            mail: data.email,
            password: data.password,
            lock: data.locked,
            accept: data.accepted,
            mobile: data.phone
        };
    } else {
        return {
            id: data._id,
            first_name: data.firstName,
            last_name: data.lastName,
            mail: data.email,
            mobile: data.phone
        };
    }
}

function userMapperMultiple(data, type) {
    const result = data.map((obj) => {
        return userMapperSingle(obj, type);
    });
    return result;
}

module.exports = {
    userMapperSingle,
    userMapperMultiple
};