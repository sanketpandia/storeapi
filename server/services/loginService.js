'use strict'

const 
    UserModel = require('../models/userModel'),
    bodyParser = require('body-parser'),
        
    //Importing Unique id generator
    uuid = require('uuid/v4'),

    //Linking to data access layer and to external services
    dao = require('../dao/loginDao'),
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
async function initLogin(req,res, next){
    let generatedOtp = parseInt(Math.random() * 1000000);
    let generatedSessionId = uuid();
    var isUserDataUpdated = false;

    //Checks if user is present and updates the entry if the user is present. If not create an user
    isUserDataUpdated =  await dao.checkExistingUser(req.body.phone, generatedOtp, generatedSessionId).then((data) => {
        if(data === true){
            isUserDataUpdated = true
        }
    })
    .catch((err) => {
        console.log(err);
    })
    ;

    //Send otp call
    let otpResponse = await otpService.sendLoginOtp(req.body.phone, generatedOtp)
    console.log(otpResponse)
    if(!typeof otpResponse ==='undefined' && otpResponse.hasOwnProperty(error_code) && otpResponse.error_code === null && isUserDataUpdated){
        res.json(successResponse);
    }
    else if(isUserDataUpdated){
        res.json({
            message : "OTP Sending failed. Check Twilio configuration in appConfig.json"
        });
    }
    else{
        console.log(isUserDataUpdated)
        
        res.json({
            message : "User Data couldn't be uploaded. Check Database connection"
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