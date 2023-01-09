const Book = require("../models/book");
const Author= require("../models/author");
const Bookinstance= require("../models/bookinstance");
const Genre=require("../models/genre");

const async=require("async");
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
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};


exports.book_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create GET");
};


exports.book_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create POST");
};


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
