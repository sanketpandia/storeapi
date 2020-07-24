'use strict';

const
    apiRoute = require('./apis/apiMaster'),
    errorController = require('../controllers/errorController'),
    swaggerUi = require('swagger-ui-express'),
    swaggerConfig = require('../swaggerConfig')


function init(server) {
    server.get('*', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    server.get('/', function (req, res) {
        res.redirect('/error');
    });
    /**
     * @swagger
     * /api
     * get:
     * description : IDK
     */
    server.use('/api', apiRoute);
    server.use('/error', errorController)
    server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerDocument))
    
}

module.exports = {
    init: init
};