// const path=require("path");
// const express=require("express");  
// const mongoose=require("mongoose");  //head ejs some functions ko store krne ke liye
// const cookieparser=require("cookie-parser");
// const userRoute=require("./routes/user");
// const blogRoute=require("./routes/blog");
// const { cheakForAuthCookie } = require("./middlewares/auth");
// const app=express();
// const PORT=8007;

// mongoose.connect("mongodb://localhost:27017/blogify").then(()=>console.log("mongo connected"));

// app.set("view engine","ejs");
// app.set("views", path.resolve("./views"));

// app.use(express.urlencoded({extended:false}));

// app.use(cookieparser());
// app.use(cheakForAuthCookie("token"));

// app.get("/",(req,res)=>{
//     res.render("home",{
//     user:req.user,
// });
// });

// app.use("/user",userRoute);
// app.use("/blog",blogRoute);

// app.listen(PORT,()=> console.log(`server has been started at:${PORT},lets grind`));

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const blog=require("./models/blog");
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const { checkForAuthCookie } = require('./middlewares/auth');
const app = express();
const PORT = 8007;

mongoose.connect('mongodb://localhost:27017/blogify')
.then(() => console.log('MongoDB connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(checkForAuthCookie('token'));
app.use(express.static(path.resolve("./public")))

app.get('/', async (req, res) => {
    const allBlogs=await blog.find({})  //.sort("createdAt",-1);
  res.render('home', {

    
    user: req.user,
    blogs:allBlogs
  });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute); // Ensure this matches the form action path

app.listen(PORT, () => console.log(`Server has been started at: ${PORT}, let's grind`));
