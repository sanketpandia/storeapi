'use strict'


const 
    UserModel = require('../models/userModel'),
    bodyParser = require('body-parser'),
        
    //Importing Unique id generator
    uuid = require('uuid/v4'),

    //Linking to data access layer and to external services
    dao = require('../dao/partnerLoginDao'),
    otpService = require('../externalServices/otpService'),

    //Enable for instantiating body parser only for JSON parsing
    //jsonParser = bodyParser.json(),

    //Enable for url parsing usage
   // urlEncodedParser = bodyParser.urlEncoded({extended : false}),

   //Basic success response object
    successResponse = [{
    status: 'Successfully updated user credentials and sent OTP'
}];

/**
 * This function should be called initially. 
 * 
 * Description : This method parses the phone number from the body of the request.
 * Creates an OTP and a session ID which are to be matched later to authenticate the session
 * Sends OTP to user device. Makes calls to Twilio service and loginDao to update database
 */
async function initLogin(req,res){
    let generatedOtp = parseInt(Math.random() * 1000000);
    let generatedSessionId = uuid();
    var isUserDataUpdated = false;
    var otpResponse, errorMessage;

    //Calling the OTP service and the mongo service to update the login credentials
    await Promise.all([
        dao.checkExistingUser(req.body.phone, generatedOtp, generatedSessionId),
        otpService.sendLoginOtp(req.body.phone, generatedOtp)
    ]).then((results) =>{
        isUserDataUpdated = results[0];
        otpResponse = JSON.stringify(results[1]);
        
    }).catch(err => {
        console.log(err);
    })
    otpResponse = JSON.parse(otpResponse);

    if(!(typeof otpResponse ==='undefined') && otpResponse.hasOwnProperty('errorCode') && otpResponse.errorCode === null && isUserDataUpdated){
        res.status(200);
        res.json(successResponse);
    }
    else if(isUserDataUpdated){
        res.status(500);
        res.json({
            message : "OTP Sending failed. Check Twilio configuration in appConfig.json",
            error : errorMessage
        });
    }
    else{
        console.log(isUserDataUpdated)
        res.status(500);
        res.json({
            message : "User Data couldn't be uploaded. Check Database connection",
            error : errorMessage
        });
    }
}

/**
 * Should be called when user enters the OTP
 * Description : This method verifies the OTP with the phone number and provides the details of the user
 */
async function loginStatus(req,res){
    
    let enteredOtp = req.body.otp;
    let phone = req.body.phone;
    res.json(await dao.getUserDetails(phone, enteredOtp));
    //res.json(successResponse);
}

module.exports = {
    initLogin : initLogin,
    loginStatus : loginStatus
};