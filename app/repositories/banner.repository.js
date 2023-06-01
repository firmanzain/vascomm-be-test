const { Banner } = require('../models');
const config = require('../../config/config');

const getAll = async() => {
    const path = config.appurl + config.publicPath.pathBanner
    const results = await Banner.findAll()
    results.forEach(result => {
        result.image = path + result.image
    });

    return results;
};

module.exports = {
    getAll,
}