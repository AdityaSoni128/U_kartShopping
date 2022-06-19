const express = require('express')
const router = express.Router();

const shopModel = require("../../database/models/shopitems.js");
const cartModel = require("../../database/models/cart.js");

router.route("/").get(function (req, res) {
  shopModel.find({}).then(function (items) {
      var n = req.session.pageItems
      var l = items.length;
      if(n<=l)
      {
        items.splice(n,l-n)
      }
      else{
        items.splice(0,0)
      }
    if (req.session.isLogIn) {
      cartModel.find({user_id:req.session.user._id}).then(function(cartItems){

      // creating the array of all product id  to check at the page1.ejs page which items ar already added. 
        var addcartItems=cartItems.map(function(item){
          return item.product_id;
        })
         
      if(cartItems.length>0){
         res.render("page1.ejs", { data: req.session.user, items: items, err:false,message:"",cartItems:addcartItems });
      }else{
         res.render("page1.ejs", { data: req.session.user, items: items, err:false,message:"", cartItems:[] });
      }
      }) 
    } else {
      res.render("page1.ejs", { data: null, items: items,err:false,message:"",cartItems:[]});
    }
  }).catch(function (err) {
    console.log(err);
    res.end("Error Aya hai /page1 end point par");
  })
})


module.exports=router;