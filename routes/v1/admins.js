var express = require('express');
var router = express.Router();

const validate = require('../../app/middlewares/validate.middleware');
const auth = require('../../app/middlewares/auth.middleware');

// validations
const AdminValidation = require('../../app/validations/admin.validation');
const CustomerValidation = require('../../app/validations/customer.validation');

// controllers 
const AdminController = require('../../app/controllers/admin.controller');
const CustomerController = require('../../app/controllers/customer.controller')

router.post('/login', validate(AdminValidation.login), AdminController.login);
router.get('/customers', auth(1), validate(CustomerValidation.getAll), CustomerController.getAll);
router.post('/customers/update-status', auth(1), validate(CustomerValidation.updateStatus), CustomerController.updateStatus);

module.exports = router;
