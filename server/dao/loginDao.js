'use strict'
const
    userModel = require('../models/userModel');

async function checkExistingUser(phone, otp, sessionId){
    let userFilter = { phone : phone}
    let updateValue = {
        otp: otp,
        isActive : true,
        sessionId : sessionId,
        phone : phone
    };
    
    // Running the find one and update query. If the query doesn't find anything, eit returns null. Hence the null check. And if null checked, new object is entered
    await userModel.findOneAndUpdate(userFilter, updateValue).then((data) => {
        if(data === null){
            let currentUser = new userModel(updateValue)
            console.log(currentUser.save());
        }
        console.log('User updated successfully');
        return true;
    })
    .catch(err => {
       console.log( 'Error in uploading user data to mongo server: ' + err);
       return false;
    });
    return true;
}

async function getUserDetails(phone, otp){
    let searchValue = { 
        phone : phone,
        otp : otp
    }
    return userModel.findOne(searchValue);
}



module.exports = {
    checkExistingUser : checkExistingUser,
    getUserDetails : getUserDetails
};