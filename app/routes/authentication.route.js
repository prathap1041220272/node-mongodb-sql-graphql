const express = require('express');
const router = express.Router();
const { authorize } = require('../helpers/authorize-filter.helper');
const { authenticationValidator } = require('../validators/authentication.validator');
const { userValidator } = require('../validators/user.validators');
const { inputConverter } = require('../helpers/input-converter.helper');

const authenticationController = require('../controllers/authentication.controller');

router.route('/login')
    .post([
        userValidator(['email', 'password'], true),
        inputConverter()
    ], authenticationController.Login);

router.route('/changePassword')
    .post([
        authorize(),
        userValidator(['password', 'confirmPassword'], true),
        inputConverter(),
        authenticationValidator()
    ], authenticationController.ChangePassword);

module.exports = router;
