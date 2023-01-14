var express = require('express');
var router = express.Router();
var auth=require("./auth");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/catalog.js");
});
router.post("/registor",auth.VerifyRequest, auth.signup);
router.post("/login", auth.signin);
module.exports = router;
