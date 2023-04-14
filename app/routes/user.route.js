const express = require('express');
const router = express.Router();
// const { authorize } = require('../helpers/authorize-filter');
const { userValidator } = require('../validators/user.validators');
const { inputConverter } = require('../helpers/input-converter.helper');

const UserController = require('../controllers/user.controller');

router.route('/')
    .post([
        userValidator(['firstName', 'lastName', 'email', 'password', 'mobile']),
        inputConverter()
    ], UserController.Create)
    .get(UserController.GetAll);

module.exports = router;
