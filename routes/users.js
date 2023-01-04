var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool',(req,resp,next)=>{
  resp.send("You're so cool");
  resp.end();
})

module.exports = router;
