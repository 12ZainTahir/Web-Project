var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/liked', function(req, res, next) {
  let liked=req.cookies.liked;
  if(!liked){
    liked=[];
  }
  res.render('liked',{liked});
});
module.exports = router;
