const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const { tokenTypes } = require('../../config/tokens');
const { AuthToken } = require('../models');

const generateAuthTokens = async (id, type) => {
    const accessTokenExpired = moment().add(config.jwt.expiredMinutes, 'minutes');
    const accessToken = generateToken(id, accessTokenExpired, tokenTypes.ACCESS);
    await saveToken(accessToken, id, type, accessTokenExpired);
    let dateExpired = moment(accessTokenExpired).utcOffset('+0700').format('YYYY-MM-DD HH:mm:ss')
  
    return {
      token: accessToken,
      expired: dateExpired,
    };
}

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
}

const saveToken = async (token, userId, type, expired) => {
    const tokenSave = await AuthToken.create({
        token: token,
        user_id: userId,
        expired_at: expired.toDate(),
        type: type,
    });
    return tokenSave;
};

const getToken = async (token) => {
    const option = {
        where: {
            token: token
        }
    }
    return AuthToken.findOne(option);
}

module.exports = {
    generateAuthTokens,
    generateToken,
    getToken,
};