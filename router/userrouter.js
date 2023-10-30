const express=require("express");
const {registercontroller,logincontroller,testcontroller, forgotpasswodcontroller}=require("../controller/usercontroller");
const { requiresignin, isadmin } = require("../middleware/authmiddleware");

//router object
const router=express.Router();

//routing
//Register and Method post
router.post('/register',registercontroller)

//Login and Method post
router.post('/login',logincontroller)

//forgot password and Method Post
router.post('/forgot-password',forgotpasswodcontroller);

//Test Routing
router.get('/test',requiresignin,isadmin,testcontroller)

//protected user route auth
router.get('/userauth',requiresignin,(req,res)=>{
    res.status(200).send({ok:true});
})

//protected admin route auth
router.get('/adminauth',requiresignin,isadmin,(req,res)=>{
    res.status(200).send({ok:true});
})

module.exports=router;