const  
    mongoose = require('mongoose'),
    { Schema } = mongoose;

var userSchema = new Schema({
    phone : String,
    address : [{
        addressLine1 : String,
        addressLine2 : String, 
        pincode : String, 
        city : String, 
        state : String
    }],
    isActive : Boolean,
    sessionId : String,
    otp:Number,
    orders : [{
        productId : String, 
        quantity : Number, 
        price : Number
    }],
    cart : [{
        productId : String,
        quantity : Number
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;