const Joi = require("joi");

const getAll = {
    body: Joi.object().keys({
    }),
}

const updateStatus = {
    body: Joi.object().keys({
        customer_id: Joi.number().required().messages({
            'any.required': 'customer_id error.required',
            'number.base': 'customer_id error.invalid',
        }),
        status: Joi.string().valid('waiting','approved','inactive').required().messages({
            'any.required': 'status error.required',
            'any.only': 'status error.invalid',
        }),
    }).unknown(true),
}

const login = {
    body: Joi.object().keys({
        email: Joi.string().email().required().messages({
            'any.required': 'email error.required',
            'string.email': 'email error.format',
        }),
        password: Joi.string().min(8).max(20).required().messages({
            'any.required': 'password error.required',
            'string.min': 'password error.min_length',
            'string.max': 'password error.max_length',
        }),
    }).unknown(true),
}

module.exports = {
    getAll,
    updateStatus,
    login,
}