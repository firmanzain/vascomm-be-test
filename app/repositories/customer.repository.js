const { Customer } = require('../models');
const config = require('../../config/config');

const getAll = async() => {
    const path = config.appurl + config.publicPath.pathCustomer
    const results = await Customer.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    results.forEach(result => {
        result.profile_picture = path + result.profile_picture
    });

    return results;
};

const getUserById = async(id) => {
    const option = {
        attributes: {
            exclude: ['password']
        },
        where: {
            customer_id: id
        }
    }
    return Customer.findOne(option);
}

const updateStatus = async(id, status) => {
    const option = {
        where: {
            customer_id: id
        }
    }

    return Customer.update({status: status}, option);
}

const getUserByEmail = async(email) => {
    const option = {
        where: {
            email: email
        }
    }
    return Customer.findOne(option);
}

const insertData = async (body) => {
    const result = await Customer.create(body);
    return result;
};

module.exports = {
    getAll,
    getUserById,
    updateStatus,
    getUserByEmail,
    insertData,
}