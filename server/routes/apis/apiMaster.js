'use strict';

const
    express = require('express'),
    loginController = require('../../controllers/loginController');

let router = express.Router();

router.use('/login', loginController);

module.exports = router;