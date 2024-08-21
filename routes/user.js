const { Router } = require('express');
const User = require('../models/user');
const router = Router();

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.post("/signin",async (req,res)=>{
    const {email, password } = req.body;
    try {
     
    console.log(email,password);
    const token= await User.matchPasswordAndGenerateToken(email,password);

    return res.cookie("token",token).redirect("/");    
    } catch (error) {
        return res.render("login",{
            error:"Incorrect email or password"
        });
    }
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})
router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    
    // Check if fullName and password are provided
    if (!fullName || !password) {
        return res.status(400).send('Full name and password are required.');
    }

    try {
        // Create a new user document
        const newUser = await User.create({
            fullName,
            email,
            password,
        });

        return res.redirect("/");
    } catch (error) {
        // Handle error
        console.error('Error creating user:', error);
        return res.status(500).send('An error occurred while creating the user.');
    }
});

module.exports = router;
