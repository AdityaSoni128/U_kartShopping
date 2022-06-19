const express = require('express')
const router = express.Router();


const cartModel = require("../../database/models/cart.js");



router.route("/").post(function(req,res){
  if(req.session.isLogIn){
    var id=req.body.id;
    cartModel.findOne({_id:id}).then(function(data){
      if(data){
         var count=data.quantity;
         cartModel.updateOne({_id:id},{$set:{quantity:count-1}}).then(function(elem){
           res.status(200);
           res.end("hogaya");
         }).catch(function(error){
           res.status(404);
           res.end("error hai");
         })
      }else{
        res.status(400);
        res.end("not found");
      }
    })
  }
  else{
    res.status(401);
    res.end("Unauthorised");
  }
})


module.exports=router;