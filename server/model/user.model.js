
const mongoose = require('mongoose');
var validator = require("email-validator");


const userLoginSchema = new mongoose.Schema({

    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.validate(value),
            message: "Invalid Email Address"
        } //  email validator
    },

    password: {
        type: String,  
        minlength: 8,
        maxlength: 15,
        required: true  
      }
  

});  //  userLoginSchema

const UserModel = mongoose.model("Login_Credential", userLoginSchema);

module.exports = UserModel;