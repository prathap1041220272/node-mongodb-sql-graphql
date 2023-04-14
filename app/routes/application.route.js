const express = require('express');
const router = express.Router();
// const { authorize } = require('../helpers/authorize-filter');
const { applicationValidator } = require('../validators/application.validator');
const { inputConverter } = require('../helpers/input-converter.helper');

const ApplicationController = require('../controllers/application.controller');

router.route('/')
        .post([
                applicationValidator(['name', 'description', 'clientId', 'clientSecret']),
                inputConverter()
        ], ApplicationController.Create)
        .get(ApplicationController.GetAll);

module.exports = router;
