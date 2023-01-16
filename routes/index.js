var express = require('express');
var router = express.Router();

const passport=require("passport");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/catalog.js");
});



// router.post('/auth/login', auth.google);

module.exports = router;
