const { nextTick } = require("async");
const BookInstance = require("../models/bookinstance");
const mongoose=require('mongoose');
const { body, validationResult } = require("express-validator");

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
exports.bookinstance_create_post = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  (req, res, next) => {
    const errors = validationResult(req);

    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      console.log(errors);  
      res.status(400);
      res.end();
    }
    bookinstance.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(bookinstance.url);
    });
  },
];

exports.bookinstance_delete_post =  (req, res,next) => {
  const id= mongoose.Types.ObjectId(req.params.id);
  BookInstance.find({book:id})
  .exec((err)=>{
    if(err){
      return next(err);
    }
    
    res.setHeader("Content-Type","text/JSON");
    res.status(200).send({status:1,message:'Deleted Successfully'});
    res.end();
  })
     
};

exports.bookinstance_update_post =[
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  (req, res, next) => {
    const errors = validationResult(req);

    const obj={
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    };

    if (!errors.isEmpty()) {
      console.log(errors);  
      res.status(400);
      res.end();
    }
    const id=mongoose.Types.ObjectId(req.params.id)
    BookInstance.findByIdAndUpdate(id,{$set:obj},(err,reslt) => {
      if (err) {
        return next(err);
      }
      res.redirect(reslt.url);
    });
  },
];

