const Book = require("../models/book");
const Author= require("../models/author");
const Bookinstance= require("../models/bookinstance");
const Genre=require("../models/genre");
const mongoose=require("mongoose");
const async=require("async");
const validation= require("express-validator");
const check=validation.body;
const validatorResult=validation.validationResult;

exports.index = (req, res) => {
    // will reture count of collection entry.
   async.parallel(
    {
        book_count(collback){
            Book.countDocuments({},collback);
        },
        Bookinstance_count(collback){
            Bookinstance.countDocuments({},collback);
        },
        author_count(collback){
            Author.countDocuments({},collback);
        },
        genre_count(collback){
            Genre.countDocuments({},collback);
        }

    }, (err,reslt)=>{
        res.setHeader('Content-Type','text/JSON');
        res.status(200).send(reslt);
        res.end();
    }
   )
};


exports.book_list = (req, res) => {
  Book.find({},'title author')
  .sort({title:1})
  .populate('author')
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


exports.book_detail = (req, res) => {
  const id= mongoose.Types.ObjectId(req.params.id);
  async.parallel({
    detail(callback){
      Book.findById(id)
      .populate('author')
      .populate('genre')
      .exec(callback);
    },
    instance(callback){
      Bookinstance.find({book:id})
      .exec(callback)
    }

  },(err,reslt)=>{
    if(err){
      return next(err);
    }else{
      if(reslt==null){
        res.status(404)
        res.end();
        
      }else{
        res.setHeader('Content-Type','text/JSON');
        res.status(200).send(reslt);
        res.end();
      }
    }
  })
  
};



exports.book_create_post = [

  check("title", "Title must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
check("author", "Author must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
check("summary", "Summary must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
check("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
check("genre.*").escape(),
(req,res,next)=>{
  // Convert the genre to an array.
  console.log(req.body.genre);
  if(!Array.isArray(req.body.genre)){
  
   typeof req.body.genre=="undefined"?[]:[req.body.genre];
  }
  next();
},
(req, res, next) => {
 
  const errors = validatorResult(req);
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: req.body.genre,
  });

  if (!errors.isEmpty()) {
    console.log(errors);  
    res.status(400);
    res.setHeader("Content-Type","text/JSON")
   
    return;
  }
  book.save((err) => {
    if (err) {
      return next(err);
    }

    res.end();
  });
},

]

exports.book_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};


exports.book_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};


exports.book_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update GET");
};


exports.book_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update POST");
};
