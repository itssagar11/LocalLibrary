const async  = require("async");
const Genre = require("../models/genre");
const Book=require("../models/book");
const mongoose = require("mongoose");
const genre = require("../models/genre");
const validator= require("express-validator");

const check= validator.body;
const validatorResult= validator.validationResult;

exports.genre_list = (req, res) => {
  Genre.find()
  .sort([['sort','ascending']])
  .exec((err,reslt)=>{
    if(err){
      return next(err);
    }else{
      res.setHeader('Content-Type','text/JSON');
      res.status(200).send(reslt);
      res.end();
    }
  })
};
exports.genre_detail = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  async.parallel(
    {
      genre(callback){
        Genre.findById(id)
        .exec(callback);
      },
      genre_book(callback){
        Book.find({genre:id})
        .exec(callback);
      }


    },
    (err,reslt)=>{
      if(err){
        return next(err);
      }else{
        if(reslt.genre==null){
          res.status(404);
          return next(new Error('Genre Not Found'));
        }else{
          res.setHeader('Content-type','text/JSON');
          res.status(200).send(reslt);
          res.end();
        }
      }
    }
  )
};

exports.genre_create_post = [
  check("name","Genre name Required").trim().isLength({min:1}).escape(),

  (req, res,next) => {
    // console.log(req.body)
      const errors= validatorResult(req);
      const obj=new Genre({name:req.body.name});
      if(!errors.isEmpty()){
        console.log(errors);  
        res.status(400);
        res.end();

      }else{
        Genre.findOne({name:req.body.name})
        .exec((err,found)=>{
          if(err){
            return next(err);
          }
          if(found){
            // genre already present provide it url.
            res.send(found.url);
            res.end()
          }else{
            obj.save((err)=>{
              if(err){
                return next(err);
              }
              res.setHeader("Content-Type","text/JSON");
              res.send("{status:1,'message':'Genre Created Successfully'  ");
              res.end();
            })

          }

        })
      }
  }
]
exports.genre_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};
exports.genre_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};
exports.genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
};
exports.genre_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
};
