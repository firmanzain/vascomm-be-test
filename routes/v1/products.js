var express = require('express');
var router = express.Router();

const validate = require('../../app/middlewares/validate.middleware');

// validations
const ProductValidation = require('../../app/validations/product.validation');

// controllers 
const ProductController = require('../../app/controllers/product.controller')

router.get('/', validate(ProductValidation.getAll), ProductController.getAll);

module.exports = router;
