const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(10);

async function hash(password) {
    if (!password) {
        const error = TypeError('Password Should Not Be Empty');
        error.status = 400;
        throw error;
    }
    return await bcrypt.hashSync(password, saltRounds); // This will return promise..
}

async function match(plainPassword, hashedPassword) {
    if (!plainPassword || !hashedPassword) {
        const error = TypeError('Password/Hash Should Not Be Empty');
        error.status = 400;
        throw error;
    }
    return await bcrypt.compareSync(plainPassword, hashedPassword); // This will return promise..
}

module.exports = {
    hash,
    match
};