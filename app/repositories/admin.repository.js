const { Admin } = require('../models');

const getUserByUsername = async(username) => {
    const option = {
        where: {
            username: username
        }
    }
    return Admin.findOne(option);
}

const getUserById = async(id) => {
    const option = {
        where: {
            admin_id: id
        }
    }
    return Admin.findOne(option);
}

module.exports = {
    getUserByUsername,
    getUserById,
}