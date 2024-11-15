const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    name: {
        type : String,
        required:true
    },
    email:{
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const Register = mongoose.model('registerdata', registerSchema); // collection name 
module.exports = Register;