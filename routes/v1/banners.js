var express = require('express');
var router = express.Router();

const validate = require('../../app/middlewares/validate.middleware');

// validations
const BannerValidation = require('../../app/validations/banner.validation');

// controllers 
const BannerController = require('../../app/controllers/banner.controller')

router.get('/', validate(BannerValidation.getAll), BannerController.getAll);

module.exports = router;
