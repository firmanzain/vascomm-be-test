const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const { notAuthorizeResponse } = require('../services/response.service')
const AuthTokenRepository = require('../repositories/auth_token.repository')
const AdminRepository = require('../repositories/admin.repository')
const CustomerRepository = require('../repositories/customer.repository')

const validate = (schema) => async (req, res, next) => {
    let headers = req.headers
    if (!headers.authorization || !headers.authorization.includes('Bearer')) {
        return next(notAuthorizeResponse(res, {default: 'error.unauthorized'}));
    }
    let bearerToken = headers.authorization.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(bearerToken, config.jwt.secret);
        if (decoded.sub != schema) {
            return next(notAuthorizeResponse(res, {default: 'error.unauthorized'}));
        }
    } catch (error) {
        return next(notAuthorizeResponse(res, {default: 'error.unauthorized'}));
    }

    let dataToken = await AuthTokenRepository.getToken(bearerToken)
    if (!dataToken) {
        return next(notAuthorizeResponse(res, {default: 'error.unauthorized'}));
    }

    let userData = {}
    if (dataToken.type == 1) {
        userData = await AdminRepository.getUserById(dataToken.user_id)
        if (!userData) {
            return next(notAuthorizeResponse(res, {default: 'error.unauthorized'}));
        }
    } else {
        userData = await CustomerRepository.getUserById(dataToken.user_id)
        if (!userData) {
            return next(notAuthorizeResponse(res, {default: 'error.unauthorized'}));
        }
    }
    
    req.headers = {
        ...req.headers,
        xdata: JSON.stringify(userData),
    };
    
    return next();
}

module.exports = validate;