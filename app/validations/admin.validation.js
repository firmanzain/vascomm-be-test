const Joi = require("joi");

const login = {
    body: Joi.object().keys({
        username: Joi.string().min(8).max(20).pattern(/^[a-zA-Z0-9]+$/).required().messages({
            'any.required': 'username error.required',
            'string.min': 'username error.min_length',
            'string.max': 'username error.max_length',
            'string.pattern.base': 'username error.format',
        }),
        password: Joi.string().min(8).max(20).required().messages({
            'any.required': 'password error.required',
            'string.min': 'password error.min_length',
            'string.max': 'password error.max_length',
        }),
    }).unknown(true),
}

module.exports = {
    login,
}