var express = require('express');
var router = express.Router();
var bcrypt=require('bcryptjs');
const _ =require('lodash');

var User = require("../models/users")

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.post('/register', async function(req, res, next) {
  let user = await User.findOne({
    email:req.body.email,
  
  });
  if(user) return res.status(400).send("User Already Exists");
 user = new User();
user.name=req.body.name;
user.email=req.body.email;
user.password=req.body.password;
  let salt=await bcrypt.genSalt(10);
  user.password= await bcrypt.hash(user.password,salt);
await user.save();
_.pick(user,["name","email"]);
res.redirect('/login ');
  // let user = new User(req.body);
  // await user.save();
 
});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', async function(req, res, next) {
  let user = await User.findOne({np
    email:req.body.email,
    password:req.body.password
  });
  if(!user) return res.redirect("/login");
  req.session.user = user;
  return res.redirect("/")

  // res.render('users/login');
});

router.get('/logout', async function(req, res, next) {
  // let user = await User.findOne({email:req.body.email,password:req.body.password});
  
  req.session.user = null;
   res.redirect("/login")

  // res.render('users/login');
});

module.exports = router;