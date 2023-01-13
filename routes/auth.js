
const mongoose= require("mongoose");
const user= require("../models/user");
const validation= require("express-validator");
const check=validation.body;
const validateResult= validation.validationResult;

exports.signup=  [
    check('first_name','First Name Required').trim().isLength({min:1}).escape(),
    check('last_name','Last Name Required').trim().isLength({min:1}).escape(),
    check('username','Username Required').trim().isLength({min:1}).escape(),
    check('email','email Required').trim().isLength({min:10}).escape(),
    check('first_name','First Name Required').trim().isLength({min:1}).escape(),

    




];

exports.signin= [

]


