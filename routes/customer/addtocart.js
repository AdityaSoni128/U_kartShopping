
const express = require('express')
const router = express.Router();


const cartModel = require("../../database/models/cart.js");
const shopModel = require("../../database/models/shopitems.js");



router.route("/").post(function (req, res) {
  var id = req.body.id;
  console.log(req.session.user, id);
  if (req.session.isLogIn) {
    shopModel.findOne({ _id: id }).then(function (product) {
      console.log(product);
      cartModel.findOne({ product_id: product._id, user_id: req.session.user._id }).then(function (data) {
        if (!data) {
          if (product) {
            cartModel.create({
              user_id: req.session.user._id,
              product_id: product._id,
              productname: product.productname,
              productimage: product.productimage,
              productprice: product.productprice,
              productdescription: product.productdescription,
              quantity: 1
            }).then(function (cart) {
              console.log(cart);
              res.status(200);
              res.end("Successfully added to cart and created at  cart collection");
            }).catch(function (error) {
              console.log(error);
              res.status(500);
              res.end("error");
            })
          } else {
            res.status(409);
            res.end(" Already Exists");
          }
        }
      })
    })
  } else {
    res.status(401);
    res.end("user is Unauthorised");
  }
})
  .get(function (req, res) {
    if (req.session.isLogIn) {
      cartModel.find({ user_id: req.session.user._id }).then(function (data) {
        if (data.length) {
          res.render("cart.ejs", { data: data, err: false, message: "" });
        } else {
          shopModel.find({}).then(function (items) {
            res.render("page1.ejs", { data: req.session.user, items: items, err: true, message: "Cart is Empty Please Add Some Items", cartItems: data });
          })
        }
      }).catch(function (error) {
        res.render("cart.ejs", { data: [], err: true, message: error });
      })
    }
    else {
      res.render("login.ejs", { err: true, success: false, message: "please login first to access the cart" });

    }
  })

module.exports = router;