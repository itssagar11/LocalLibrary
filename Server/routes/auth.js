
require('dotenv').config()

var express = require('express');
var router = express.Router();

const mongoose= require("mongoose");
const user= require("../models/user");
const validation= require("express-validator");
const async=require("async");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const passport=require("passport");
const JWTStrategy=require("passport-jwt").Strategy; 
const {ExtractJwt}=require("passport-jwt");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
let usermail;

const check=validation.body;
const validateResult= validation.validationResult;

passport.use(new JWTStrategy({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.SECRET_KEY,
  },(jwtPayload,cb)=>{
  
    return cb(null, jwtPayload);
  }));
  passport.use(new GoogleStrategy({
    clientID: "476135258480-5cgk4es5klc1pe5el26savevb0hj568l.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
        let usermail= profile.emails[0].value;
    
        console.log(profile);
        user.findOne({email:usermail},(err,reslt)=>{
            if(reslt){
                return cb(null, user);
            }else{
                return cb(null,false );
            }
        })
  }
));
  

router.post("/signup", [
    check('first_name','First Name Required').trim().isLength({min:1}).escape(),
    check('last_name','Last Name Required').trim().isLength({min:1}).escape(),
    check('username','Username Required').trim().isLength({min:1}).escape(),
    check('email','email Required').trim().isEmail().escape(),
    check('password','Password  Required').trim().isLength({min:6}).withMessage("Minimum Password Length is 6").escape(),
    (req,res,next)=>{
        const errors= validateResult(req);

        if(!errors.isEmpty()){
            res.status(400).send(errors);
            return;
        }else{
           async.parallel({
            userExist(callback){
                user.findOne({username:req.body.username}).exec(callback);
            },

            emailExist(callback){
                user.findOne({email:req.body.email}).exec(callback);
            }
           }, (err,reslt)=>{
                if(err){
                    return next(err);
                }else{
                    if(reslt.userExist!=null){
                       
                        res.status(409).json({message:"Usernane Already Exist"});
                        return
                    }
                    else if(reslt.emailExist!=null){
                        res.status(409).json({message:"Email Already Exist"});
                       return
                    }
                    else{
                        const obj= new user({
                            first_name:req.body.first_name  ,
                            last_name:req.body.last_name ,
                            username:req.body.username ,
                            email:req.body.email ,
                            password:req.body.password
                        });
                        obj.save((err)=>{
                            if(err){
                                res.status(500).json({message:err.message});
                                res.end();
                            }else{
                                res.status(200).json({message:'User Registered'});
                                res.end();
                            }
                        })
                    }
                }
           })
        }
    }



]);

router.post("/signin" ,[
    check('username','Username Required').trim().isLength({min:1}).escape(),
    check('password','Password  Required').trim().escape(),
    async (req,res,next)=>{
        const err= validateResult(req);
        if(!err.isEmpty()){
            res.status(400).send(errors);
            return;
        }
        const u=   await user.findOne({username:req.body.username});
        if(u==null){
            res.status(409).json({message:"Credential Invalid"});
            return
        }else{
            let hash= await bcrypt.compare(req.body.password,u.password);
            if(hash){
                // user verified
                const payload={
                    sub:u.id,
                    iat:Date.now()
                }
                const token=  await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: "2h",});
                // res.setHeader("Set-Cookie",cookie.serialize('access-token',token,{
                //     // httpOnly:true // disable for testing
                //     sameSite:'strict',
                //     maxAge:180000
                // })) //vulnulrable 
                return res.status(200).send({
                    message:"Successfully Login",
                    user:u.username,
                    token
                })

            }else{
                res.status(409).json({message:"Credential Invalid"});
                return;
            }
        }

           
    
    }
])
router.get('/google',passport.authenticate('google', { scope: ['email'] }));



router.get("/google/callback",passport.authenticate('google', { session:false }), (req,res)=>{
    const payload={
        sub:usermail,
        iat:Date.now()
    }
    const token=   jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: "2h",});
    // res.setHeader("Set-Cookie",cookie.serialize('access-token',token,{
    //     // httpOnly:true // disable for testing
    //     sameSite:'strict',
    //     maxAge:180000
    // })) //vulnulrable 
    return res.status(200).send({
        message:"Successfully Login",
        user:usermail,
        token
    })
}
)

module.exports=router;