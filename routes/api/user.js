const express=require("express");
let router=express.Router();
let User= require("../../models/users");
var bcrypt=require('bcryptjs');
const _ =require('lodash');
router.post("/registerapi",async(req,res)=>{
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
    return res.send(_.pick(user,["name","email"]));

});





module.exports=router;