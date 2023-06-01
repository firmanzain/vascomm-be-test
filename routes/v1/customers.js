var express = require('express');
var router = express.Router();

const validate = require('../../app/middlewares/validate.middleware');
const auth = require('../../app/middlewares/auth.middleware');

// validations
const CustomerValidation = require('../../app/validations/customer.validation');

// controllers 
const CustomerController = require('../../app/controllers/customer.controller')

router.post('/login', validate(CustomerValidation.login), CustomerController.login);

module.exports = router;
