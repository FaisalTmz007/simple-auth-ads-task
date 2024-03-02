const bcrypt = require('bcryptjs')

const saltRounds = 10;

const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
}


module.exports = { hashPassword };