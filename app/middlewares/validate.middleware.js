const Joi = require('joi');
const pick = require('../utils/pick');
const { badRequestResponse } = require('../services/response.service');

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body', 'file']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'key' }, abortEarly: false })
		.validate(object);

    if (error) {
		let errorResult = {}
		const errorMessage = error.details.map((details) => {
			let message = details.message.split(" ")
			errorResult[message[0]] = message[1]
		});
		console.log("===errorMessage", error);
		return next(badRequestResponse(res, errorResult));
    }
	
	Object.assign(req, value);
	return next();
};

module.exports = validate;
