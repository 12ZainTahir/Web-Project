const express=require("express");
let router=express.Router();
var Blog=require("../../models/blogs");
var app = express();
var cors=require('cors');
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
  
  function somMid(req, res, next) {
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );
  
    next();
  }
router.get("/",async(req,res)=>{
let blogs= await Blog.find();
return res.send(blogs);
});
router.get("/:id",async(req,res)=>{
try{
    let blog=await Blog.findById(req.params.id);
    if(!blog){
    return res.status(400).send("blog with given id is not present");
    }
    return res.send(blog);
}catch{
    return res.status(400).send("Invalid ID");
}



});

router.put("/:id",async(req,res)=>{
    let blog= await Blog.findById(req.params.id);
    blog.title=req.body.title;
    blog.description=req.body.description;
    await blog.save()
    return res.send(blog);
})

router.delete("/:id",async(req,res)=>{
let blog= await Blog.findByIdAndDelete(req.params.id);
return res.send(blog);
});

module.exports=router;

router.post("/",async(req,res)=>{
    let blog= new Blog();
    blog.title=req.body.title;
    blog.description=req.body.description;
    await blog.save()
    return res.send(blog);
});
