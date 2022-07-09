const express=require("express");
let router=express.Router();

var Blog=require("../models/blogs");
var checksessionAuth=require('../middlewares/checksessionAuth')
var app = express();
router.get("/",async(req,res)=>{
    let blog=await Blog.find();
    console.log(req.session.user)

    
    res.render("blogcrud",{title:"BLOGS",blog});
});

    
router.get("/blogcrud",async(req,res)=>{
    res.render("views/blogcrud");
    });


    router.get('/add',checksessionAuth,async function(req, res, next) {

        res.render("add");
      });
    router.post('/add',async function(req, res, next) {
        let blog= new Blog(req.body);
        await blog.save();
      
        res.redirect("/blogcrud");
      })

      router.get('/delete/:id',async(req,res,next)=>{
        let blog=await Blog.findByIdAndDelete(req.params.id);
        res.redirect("/blogcrud");
      });
      router.get('/liked/:id',async(req,res,next)=>{
        let blog=await Blog.findById(req.params.id);
        console.log("add to liked");
        let liked=[];
    if(req.cookies.liked) liked=req.cookies.liked;
    liked.push(blog)
    res.cookie("liked",liked);
        res.redirect("/blogcrud");
      });

     
      router.get("/liked/remove/:id", async function (req, res, next) {
        let liked = [];
        if (req.cookies.liked) liked = req.cookies.liked;
        liked.splice(
          liked.findIndex((c) => c._id == req.params.id),
          1
        );
        res.cookie("liked", liked);
        res.redirect("/liked");
      });



      router.get('/edit/:id',async function(req, res, next) {
        //  res.send("ID from url: "+req.params.id);
          let blog = await Blog.findById(req.params.id);
          // await product.delete();
        
          res.render("edit",{blog});
        });
        router.post('/edit/:id',async function(req, res, next) {
          //  res.send("ID from url: "+req.params.id);
            let blog = await Blog.findById(req.params.id);
            // await product.delete();
            blog.title = req.body.title;
            blog.description=req.body.description;
            await blog.save()
            res.redirect("/blogcrud");
          }); 

module.exports=router;