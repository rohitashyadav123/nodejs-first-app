// import http from "http";
// import {generateLovePercent} from "./features.js";
// import fs from "fs";
// //  const home =fs.readFileSync("./index.html");
// //  console.log(home);
// // console.log(home);
// // import path from "path";
// // console.log(path.dirname("/home/random/index.js"));

//  const server=http.createServer((req,res)=>
// {
//     console.log(req.method);
//     if(req.url==="/about"){
//     res.end(`<h1>love is ${generateLovePercent()}</h1>`);
//     }
//   else if(req.url==="/")
//     {
//         res.end("home");
       
//     }
//   else  if(req.url==="/contact")
//     {
//         res.end("<h1>home page</h1>");
//     }
//     else{
//         res.end("<h1>page not found</h1>");

//     }
// });
// server.listen(5000,()=>
// {
//     console.log("server is working");
// });
import express  from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { render } from "ejs";
import bcrypt from "bcrypt";
mongoose.connect("mongodb://127.0.0.1:27017",{dbName:"backend",}).then(()=>
{
  console.log("database connected");
}).catch((e)=>
{
  console.log(e);
})
const userSchema=new mongoose.Schema({
  name:String,
  email:String,
  password:String,
});
  const user=mongoose.model("user",userSchema)
const app=express(); 
// const users=[];
//using middlewres
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
//setting up view engine
 app.set("view engine","ejs");
// app.get("/",(req,res)=>
// {
//     res.render("index",{name:"abhishek"});
    // res.sendFile("index.html");





  // const pathlocation=path.resolve();
  
  // res.sendFile(path.join(pathlocation," ./index.html"));
    // res.sendStatus(400);
    // res.json({
    //     success:true,
    //     products:[],
    // });
    // res.status(400).sand("meri marzi");
  // const file=  fs.readFileSync("./index.html");
    // res.sendFile("./index.html");

// });

const isAuthenticated=async(req,res,next)=>{
  const {token}=req.cookies;
  
  if(token)
  {
    // 
   const decoded= jwt.verify(token,"qwertyui");
   req.User=await user.findById(decoded._id);
   next();
  }
  else{
    res.redirect("/login");

  }
}


app.get("/",isAuthenticated,(req,res)=>
{
  
  res.render("logout",{name: req.User.name});
  });
  app.get("/login",(req,res)=>{
    res.render("login");
  })
  app.get("/register",(req,res)=>
{
  
  res.render("register");
  });


  app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    let User=await user.findOne({email});
    if(!User)
    {
      return res.redirect("/register");
    }
    const isMatch=await bcrypt.compare(password,User.password);
    if(!isMatch)
    {
      return res.render("login",{email,message:"Incorrect Password"});
    }
    const token =jwt.sign({_id:User._id},"qwertyui"); 

console.log(token);


    res.cookie("token",token ,{
      httpOnly:true,expires:new Date(Date.now()+60*1000)
    });
    res.redirect("/");
  });




  app.post("/register",async(req,res)=>{

   const {name,email,password}=req.body;
   let User=await user.findOne({email})
   if(User)
   {
      return res.redirect("/login");
   }

   const hashedpassword=await bcrypt.hash(password,10);

    User=await user.create({
    name,
    email,
    password:hashedpassword,
  });

   const token =jwt.sign({_id:User._id},"qwertyui"); 

console.log(token);


    res.cookie("token",token ,{
      httpOnly:true,expires:new Date(Date.now()+60*1000)
    });
    res.redirect("/");
  });

  app.get("/logout",(req,res)=>{
    res.cookie("token","null",{
      httpOnly:true,expires:new Date(Date.now()),
    });
    res.redirect("/");
  });
// app.get("/add",async(req,res)=>
// {
//   await Message.create({name:"rao2",email:"pawanyadav2@gmail.com"});
   
//     res.send("nice");
//    });
   
 
// app.get("/success",(req,res)=>
// {
//     res.render("success");
// });
// app.post("/contact",async(req,res)=>
// {
  
// const {name,email}=req.body;
//   await Message.create({ name,email });
//   res.redirect("/success");
// });

//  app.get("/users",(req,res)=>{
//   res.json({
//     users,
//   });
//  })
app.listen(5000,()=>
 {
    console.log("Server is working");
}); 