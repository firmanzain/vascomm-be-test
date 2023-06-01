const Joi = require("joi");

const getAll = {
    body: Joi.object().keys({
    }),
}

module.exports = {
    getAll,
}