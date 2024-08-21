// const { validateToken } = require("../services/auth");

// function cheakForAuthCookie(cookieName){
//     return (req,res,next)=>{

// const tokenCookieValue=req.cookies[cookieName];
// if(!tokenCookieValue){
//    return next();
// }
// try {
//     const userPayload=validateToken(tokenCookieValue);
//     req.user=userPayload;
    
// } catch (error) {
//     return next();
// }


//     };
// }

// module.exports={
//     cheakForAuthCookie,
// }
// middlewares/auth.js

function checkForAuthCookie(tokenName) {
    return function (req, res, next) {
      const token = req.cookies[tokenName];
      if (token) {
        // Assuming some verification logic here
        req.user = { id: 'user_id', name: 'User Name' }; // Example user object
      }
      next();
    };
  }
  
  module.exports = { checkForAuthCookie };
  