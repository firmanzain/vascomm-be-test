const badRequestResponse = (res, message) => {
    let result = {
        status: false,
        error: {
            type: 'error.message',
            message: message
        }
    }

    return res.status(400).json(result);
}

const notFoundResponse = (res, message) => {
    let result = {
        status: false,
        error: {
            type: 'error.message',
            message: message
        }
    }

    return res.status(404).json(result);
}

const notAuthorizeResponse = (res, message) => {
    let result = {
        status: false,
        error: {
            type: 'error.message',
            message: message
        }
    }

    return res.status(401).json(result);
}

module.exports = {
    badRequestResponse,
    notFoundResponse,
    notAuthorizeResponse,
}