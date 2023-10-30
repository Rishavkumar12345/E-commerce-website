const express=require('express');
const { createcategorycontroller, updatecategorycontroller, getallcategory, singlecategory, deletecategory } =require( '../controller/Categorycontroller');
const {requiresignin,isadmin} =require('../middleware/authmiddleware');

const router=express.Router();

//create category
router.post('/create-category',requiresignin,isadmin,createcategorycontroller);

//update category
router.put('/update-category/:id',requiresignin,isadmin,updatecategorycontroller);

//getall category
router.get('/getall-category',getallcategory);

//get single category
router.get('/single-category/:slug',singlecategory);

//delete category
router.delete('/delete-category/:id',requiresignin,isadmin,deletecategory);

module.exports=router;