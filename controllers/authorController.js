const Author= require("../models/author");
const async=require('async');
const  Book= require('../models/book');
const mongoose=require('mongoose');
exports.author_list=(req,res,next)=>{
    Author.find()
    .sort([['first_name','ascending']])
    .exec((err,reslt)=>{
        if(err){
            return next(err);
        }else{
            res.setHeader('Content-Type','text/JSON');
            res.status(200).send(reslt);
            res.end();
        
        }
    })
}
exports.author_detail=(req,res,next)=>{
    const id= mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        authorDetail(collback){
            Author.findById(id)
            .exec(collback);
        },
        books(collback){
            Book.find({author:id})
            .exec(collback)
        }
    },(err,reslt)=>{
        if(err){
            return next(err);
        }else{
            if(reslt.authorDetail==null){
                res.status(404);
                res.end();
            }else{
                res.setHeader('Content-Type','text/JSON');
                res.status(200).send(reslt);
                res.end();
            }
        }
    })
}
exports.author_create_get=(req,res,next)=>{
    
}
exports.author_create_post=(req,res,next)=>{
    
}
exports.author_delete_get=(req,res,next)=>{
    
}
exports.author_delete_post=(req,res,next)=>{
    
}
exports.author_update_get=(req,res,next)=>{
    
}
exports.author_update_post=(req,res,next)=>{
    
}