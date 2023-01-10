const { nextTick } = require("async");
const BookInstance = require("../models/bookinstance");
const mongoose=require('mongoose');
exports.bookinstance_list = (req, res) => {
  BookInstance.find({})
  .populate('book')
  // .select('due_date_formatted')
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
exports.bookinstance_detail = (req, res) => {
  const id= mongoose.Types.ObjectId(req.params.id);
  BookInstance.findById(id)
  .exec((err,reslt)=>{
    if(err){
      return next(err);
    }else{

      if(reslt==null){
        const err= new Error('Book Copy Not Available');
        res.status(404);
        res.end();
        return next(err);
      }else{
        res.setHeader('Content-Type','text/JSON');
        res.status(200).send(reslt);
        res.end();
      }
    }
  })
};
exports.bookinstance_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};
exports.bookinstance_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};
exports.bookinstance_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};
exports.bookinstance_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};
exports.bookinstance_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

exports.bookinstance_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};


