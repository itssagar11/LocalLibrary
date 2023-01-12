const Author = require("../models/author");
const async = require('async');
const Book = require('../models/book');
const mongoose = require('mongoose');

const validator = require("express-validator");

const check = validator.body;
const validatorResult = validator.validationResult;

exports.author_list = (req, res, next) => {
    Author.find()
        .sort([['first_name', 'ascending']])
        .exec((err, reslt) => {
            if (err) {
                return next(err);
            } else {
                res.setHeader('Content-Type', 'text/JSON');
                res.status(200).send(reslt);
                res.end();

            }
        })
}
exports.author_detail = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        authorDetail(collback) {
            Author.findById(id)
                .exec(collback);
        },
        books(collback) {
            Book.find({ author: id })
                .exec(collback)
        }
    }, (err, reslt) => {
        if (err) {
            return next(err);
        } else {
            if (reslt.authorDetail == null) {
                res.status(404);
                res.end();
            } else {
                res.setHeader('Content-Type', 'text/JSON');
                res.status(200).send(reslt);
                res.end();
            }
        }
    })
}

exports.author_create_post = [
    check("first_name").trim().isLength({ min: 1 }).escape()
        .withMessage("First Name must be specified")
        .isAlphanumeric()
        .withMessage("First Name has non-alphabetic characters"),
    check("last_name").trim().isLength({ min: 1 }).escape()
        .withMessage("Last  Name must be specified")
        .isAlphanumeric()
        .withMessage("Last Name has non-alphabetic characters"),
    check("date_of_birth", "Invalid Date of Birth").optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),
    check("date_of_death", "Invalid Date of Death").optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),

    (req, res, next) => {
        // console.log(req.body)
        const errors = validatorResult(req);
        const obj = new Author({ first_name: req.body.first_name,
            last_name:req.body.last_name,
            date_of_birth:req.body.date_of_birth,
            date_of_death:req.body.date_of_death,
        });
        if (!errors.isEmpty()) {
            res.status(400).send(errors.array);
            res.end();

        } else {
            obj.save((err)=>{
                if(err){
                    return next(err);
                }else{
                    res.status(200).send("Author added Successfully");
                    res.end();
                }
            })
        }
    }
]

exports.author_delete_post = (req, res, next) => {
    // delete the author if no book object is associated with it else  will show the associated books objects.
    const id= mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        author(callback){
            Author.findById(id)
            .exec(callback);
        },
        author_books(callback){
            Book.find({author:id})
            .exec(callback)
        }
    },(err,reslt)=>{

        if(err){
            return next(err)
        }
        if(reslt.author==null){
            res.setHeader("Content-Type","text/JSON");
            res.status(404).send("Author Not Found");
            res.end();
        }else if(reslt.author_books.length>0){
            res.setHeader("Content-Type","text/JSON");
            res.status(200).send("{message:'can'nt delete author '}"+reslt.author_books);
            res.end();
        }else{
            Author.findByIdAndRemove(id,(err)=>{
                res.setHeader("Content-Type","text/JSON");
                res.status(200).send("Author Deleted");
                res.end();
            })
        }
    })
    
}

exports.author_update_post =  [
    check("first_name").trim().isLength({ min: 1 }).escape()
        .withMessage("First Name must be specified")
        .isAlphanumeric()
        .withMessage("First Name has non-alphabetic characters"),
    check("last_name").trim().isLength({ min: 1 }).escape()
        .withMessage("Last  Name must be specified")
        .isAlphanumeric()
        .withMessage("Last Name has non-alphabetic characters"),
    check("date_of_birth", "Invalid Date of Birth").optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),
    check("date_of_death", "Invalid Date of Death").optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),

    (req, res, next) => {
        // console.log(req.body)
        const errors = validatorResult(req);
        const obj ={ first_name: req.body.first_name,
            last_name:req.body.last_name,
            date_of_birth:req.body.date_of_birth,
            date_of_death:req.body.date_of_death,
        };
        if (!errors.isEmpty()) {
            res.status(400).send(errors.array);
            res.end();

        } else {
            const id=mongoose.Types.ObjectId(req.params.id);
            Author.findByIdAndUpdate(id,{ $set: obj},(err,reslt)=>{
                if(err){
                    return next(err);
                }else{
                    res.redirect(rslt.url);
                }
            })
        }
    }
]