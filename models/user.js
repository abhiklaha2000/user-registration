const mongoose = require("mongoose");
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    mobile:{
        type:Number,
        required:true,
        min:6000000000,
        max:9999999999,
    },
    image:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    bio:{
    type:String,
    required:true
    },
    is_admin:{
        type:Number,
        required:false
    },
    type:{
        type:String,
        required:true,
        default:'public'
    },
});

const user = new mongoose.model("User",userSchema);

module.exports = user;