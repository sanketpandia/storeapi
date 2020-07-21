'use strict'

const { model } = require("mongoose");

const successResponse = [{
    success : 'true',
    status: 'working'
}];

function initLogin(req,res){
    res.json(successResponse);
}

function loginStatusCheck(req,res){
    res.json(successResponse);
}

module.exports = {
    initLogin : initLogin,
    loginStatusCheck : loginStatusCheck
};;