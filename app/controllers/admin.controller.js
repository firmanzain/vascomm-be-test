const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcrypt');

const AdminRepository = require('../repositories/admin.repository')
const AuthTokenRepository = require('../repositories/auth_token.repository')
const { notFoundResponse, notAuthorizeResponse } = require('../services/response.service')

const login = catchAsync(async (req, res, next) => {
    const body = req.body

    let admin = await AdminRepository.getUserByUsername(body.username)
    if (!admin) {
		return next(notFoundResponse(res, {user: 'error.not_found'}));
    }

    const hashedPassword = admin.password
    
    const matchPassword = await bcrypt.compare(body.password, hashedPassword)
    if (!matchPassword) {
        return next(notAuthorizeResponse(res, {default: 'error.invalid'}));
    }
    
    const authToken = await AuthTokenRepository.generateAuthTokens(admin.admin_id, 1)

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

module.exports = {
    login
}