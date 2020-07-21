'use strict'

const
    express = require('express'),
    errorService = require('../services/errorService');

let router = express.Router();

router.get('/', errorService.getError);

module.exports = router;