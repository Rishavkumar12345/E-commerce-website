const { productcontroller, getproductcontroller, singleproductcontroller, productphotocontroller, deleteproductcontroller, updateproductcontroller, productfiltercontroller, productcountcontroller, perpageproductcontroller, searchproductcontroller, relatedproductcontoller, productcategorycontroller } = require("../controller/productcontroller");
const { requiresignin, isadmin } = require("../middleware/authmiddleware");
const formidale =require('express-formidable')

const express=require('express');

const router=express.Router();

//create product
router.post('/create-product',requiresignin,isadmin,formidale(),productcontroller);

//get all product
router.get('/get-product',getproductcontroller);

//single product
router.get('/single-product/:slug',singleproductcontroller);

//product image
router.get('/product-img/:pid',productphotocontroller);

//delete product
router.delete('/delete-product/:pid',deleteproductcontroller);

//update product
router.put('/update-product/:pid',requiresignin,isadmin,formidale(),updateproductcontroller);

//filter product
router.post('/product-filter',productfiltercontroller);

//total count
router.get('/product-count',productcountcontroller);

//product per page
router.get('/product-list/:page',perpageproductcontroller);

//search product
router.get('/search/:keyword',searchproductcontroller);

//Similar product
router.get('/related-product/:pid/:cid',relatedproductcontoller)

//get product by category
router.get('/product-category/:slug',productcategorycontroller);

module.exports=router;