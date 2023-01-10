const async  = require("async");
const Genre = require("../models/genre");
const Book=require("../models/book");
const mongoose = require("mongoose");

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
        Book.find({id})
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
exports.genre_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
};
exports.genre_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
};
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
