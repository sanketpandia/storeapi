'use strict'

const { patch } = require('../controllers/loginController');

const
    
    //Importing file service
    fs = require('fs'),
    path = require('path'),
    configFilePath = path.join(__dirname,'../../appConfig.json');

//Loading and parsing the config file
let configFileRawData = fs.readFileSync(configFilePath)
let configs = JSON.parse(configFileRawData);

//Importing twilio client
const twilio = require('twilio')(configs.TwilioAccountSID, configs.TwilioAuthToken)


//Function to send login otp
async function sendLoginOtp(phoneNumber, otp) {
    let responseObj = await twilio.messages
            .create({
                body : "Your OTP for login to the Mo Market App is " + String(otp),
                from : configs.TwilioPhoneNumber,
                to: String(phoneNumber)
            });
    return responseObj;
}

module.exports = {
    sendLoginOtp : sendLoginOtp
}