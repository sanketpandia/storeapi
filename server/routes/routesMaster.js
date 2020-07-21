'use strict';

const
    apiRoute = require('./apis/apiMaster'),
    errorController = require('../controllers/errorController')

function init(server) {
    server.get('*', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    server.get('/', function (req, res) {
        res.redirect('/error');
    });

    server.use('/api', apiRoute);
    server.use('/error', errorController)
    
}

module.exports = {
    init: init
};