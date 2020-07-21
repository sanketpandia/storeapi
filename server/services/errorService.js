'use strict'

const { model } = require("mongoose");

const getErrorReponse = [{
    status: 'error',
    message : 'invalid get endpoint'
}];

function getError(req,res){
    res.json(getErrorReponse)
}

module.exports = {
    getError : getError
};;