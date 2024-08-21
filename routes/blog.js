// const { Router } = require('express');
// const multer=require("multer");
// const path=require("path");
// const router = Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve(`./public/uploads/`))
//     },
//     filename: function (req, file, cb) {
//       const filename=`${Date.now()}-${file.originalname}`;
//       cb(null,filename);
//     }
//   })
  
//   const upload = multer({ storage: storage })

// router.get("/add-new",(req,res)=>{
//     return res.render("addblog",{
// user:req.user,
//     });
// });

// router.post("/",(req,res)=>{
//     console.log(req.body);
//         return res.redirect("/",{
//     });
// });

// module.exports=router;


const { Router } = require('express');
const multer = require("multer");
const path = require("path");

const blog=require("../models/blog");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads/'));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addblog", {
    user: req.user,
  });
});

//console.log(req.body);
  //console.log(req.file); // This will log the uploaded file details
  // Add logic to handle the form data and the uploaded file

  router.post('/add', upload.single('coverImage'), async (req,res) => {
    try {
        const { title, body } = req.body;
        const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

        // Validate if the body is present
        if (!body) {
            return res.status(400).json({ message: "Body is required" });
        }

        const newBlog = new blog({
            title,
            body,
            coverImage,
        });

        await newBlog.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
