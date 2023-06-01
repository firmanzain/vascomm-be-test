const { Product } = require('../models');
const config = require('../../config/config');

const getAll = async() => {
    const path = config.appurl + config.publicPath.pathProduct
    const results = await Product.findAll()
    results.forEach(result => {
        result.image = path + result.image
    });

    return results;
};

module.exports = {
    getAll,
}