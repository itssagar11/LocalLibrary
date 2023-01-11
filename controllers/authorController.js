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
exports.author_delete_get = (req, res, next) => {

}
exports.author_delete_post = (req, res, next) => {

}
exports.author_update_get = (req, res, next) => {

}
exports.author_update_post = (req, res, next) => {

}