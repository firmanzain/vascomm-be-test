const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcrypt');
const config = require('../../config/config');

const CustomerRepository = require('../repositories/customer.repository')
const AuthTokenRepository = require('../repositories/auth_token.repository')
const { notFoundResponse, notAuthorizeResponse, badRequestResponse } = require('../services/response.service')

const getAll = catchAsync(async (req, res) => {
    const body = req.body

    let customer = await CustomerRepository.getAll()
    let result = {
        status: true,
        data: customer
    }

    return res.status(200).json(result)
})

const updateStatus = catchAsync(async (req, res, next) => {
    const body = req.body

    let customer = await CustomerRepository.getUserById(body.customer_id)
    if (!customer) {
		return next(notFoundResponse(res, {customer: 'error.not_found'}));
    }
    
    let updateCustomer = await CustomerRepository.updateStatus(customer.customer_id, body.status)
    if (!updateCustomer) {
		return next(badRequestResponse(res, {default: 'error.invalid'}));
    }

    customer = await CustomerRepository.getUserById(body.customer_id)
    
    let result = {
        status: true,
        data: customer
    }

    return res.status(200).json(result)
})

const login = catchAsync(async (req, res, next) => {
    const body = req.body

    let customer = await CustomerRepository.getUserByEmail(body.email)
    if (!customer) {
		return next(notFoundResponse(res, {user: 'error.not_found'}));
    }

    const hashedPassword = customer.password
    
    const matchPassword = await bcrypt.compare(body.password, hashedPassword)
    if (!matchPassword) {
        return next(notAuthorizeResponse(res, {default: 'error.invalid'}));
    }
    
    const authToken = await AuthTokenRepository.generateAuthTokens(customer.customer_id, 2)

    let result = {
        status: true,
        data: {
            accessToken: authToken.token,
            tokenType: 'Bearer',
            expiresIn: authToken.expired
        }
    }
    return res.status(200).json(result)
})

const register = catchAsync(async (req, res, next) => {
    const { body, file } = req;

    let customer = await CustomerRepository.getUserByEmail(body.email)
    if (customer) {
		return next(notFoundResponse(res, {email: 'error.exist'}));
    }

    const saltRounds = 10;
    let reqData = {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, saltRounds),
        profile_picture: file.filename,
        status: 'waiting'
    }
    let insertData = await CustomerRepository.insertData(reqData)

    customer = await CustomerRepository.getUserByEmail(body.email)
    if (!customer) {
		return next(badRequestResponse(res, {default: 'error.invalid'}));
    }

    let result = {
        status: true,
        data: {
            name: customer.name,
            email: customer.email,
            profile_picture: config.appurl + config.publicPath.pathCustomer + customer.profile_picture,
            status: customer.status,
        }
    }

    return res.status(201).json(result)
})

module.exports = {
    getAll,
    updateStatus,
    login,
    register,
}