var mongoose=require('mongoose');

var blogSchema=mongoose.Schema(
{
description:String,
title : String,


});
var Blog=mongoose.model("Blog",blogSchema);
module.exports=Blog;