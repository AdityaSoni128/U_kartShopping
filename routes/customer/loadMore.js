const express = require('express')
const router = express.Router();



router.get("/",function(req,res){

  req.session.pageItems+=2;
  res.redirect("/page1");
})


module.exports=router;