const express = require('express')
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../../database/models/users.js");
const shopModel = require("../../database/models/shopitems.js");


const userModel = userSchema.schema;
const userRoleEnums = userSchema.role;

router.route("/login").get(function (req, res) {

  res.render("admin/adminLogin.ejs", { err: false, success: false, message: "" });

}).post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email, password)
  bcrypt.hash(password, 10, function (err, hash) {
    console.log(hash);
    if (err) {
      console.log("error in hashing at admin side");
    } else {
      if (email && password) {
        userModel.findOne({ email: email, password: hash, role: userRoleEnums.admin }).then(function (data) {
          var user = data;
          if (data === null) {
            res.render("admin/adminLogin.ejs", { err: true, success: false, message: "Only Admin can Access This Page" });
          } else if (user.verifyMail) {
            req.session.isLogIn = true;
            req.session.user = user;
            req.session.pageItems = 6;
            res.redirect("/admin/adminpage1");
          } else {
            res.render("admin/adminLogin.ejs", { err: true, success: false, message: "Please Verify Your Account First go to registered email id" });
          }
        }).catch(function (err) {
          res.render("login.ejs", { err: true, success: false, message: err });
          // console.log(err);
        })
      } else {
        res.render("admin/adminLogin.ejs", { err: true, success: false, message: "please Enter Details to Login" });
      }
    }
  });

})


router.get("/adminpage1", function (req, res) {

  shopModel.find({}).then(function (items) {
    res.render("admin/adminPage1.ejs", { data: req.session.user, items: items, err: false, message: "", cartItems: [] });
  })
})


router.route("/addProduct").get(function (req, res) {
  res.render("admin/addProduct.ejs", { data: "Aditya Login hai" });
}).post(function (req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var price = parseInt(req.body.price);
  var quantity = parseInt(req.body.quantity);
  var image = req.file.filename;
  if (name && description && price && quantity && image) {
    shopModel.create({
      productname: name,
      productimage: image,
      productprice: price,
      productdescription: description,
      stock: quantity
    }).then(function (item) {
      console.log(item);
      res.redirect("/admin/adminpage1");
    })
  } else {
    res.render("admin/addProduct.ejs", { data: "Kuch error hai" });

  }
})


router.route("/delete").post(function (req, res) {
  var id = req.body.id;
  shopModel.deleteOne({ _id: id }).then(function (item) {
    console.log(item);
    res.status(200);
    res.end("Item Is deleted");
  }).catch(function (error) {
    console.log("error aaya hai delete karne me", error)
    res.status(404);
    res.end("Error in deleting");
  })
})

router.route("/updateProduct").post(function (req, res) {
  var id = req.body.id;
  console.log(id);
  req.session.updateId = id;
  res.status(200);
  res.end("ok kar di id set session me");
})
router.route("/updateItem").get(function (req, res) {
  var id = req.session.updateId;
  shopModel.findOne({ _id: id }).then(function (item) {
    res.render("admin/updateProduct.ejs", { data: item });
  })

}).post(function (req, res) {
  var id = req.session.updateId;
  var name = req.body.name;
  var description = req.body.description;
  var price = parseInt(req.body.price);
  var quantity = parseInt(req.body.quantity);
  if (req.file) {
    var image = req.file.filename;
    shopModel.updateOne({ _id: id }, {
      $set: {
        productname: name,
        productimage: image,
        productprice: price,
        productdescription: description,
        stock: quantity
      }
    }).then(function (item) {
      console.log(item);
      res.redirect("/admin/adminpage1")
    }).catch(function (error) {
      console.log(error);
      res.render("admin/adminPage1.ejs", { data: req.session.user, items: items, err: true, message: "Not able to Update Item", cartItems: [] });
    })
  } else {
    shopModel.updateOne({ _id: id }, {
      $set: {
        productname: name,
        productprice: price,
        productdescription: description,
        stock: quantity
      }
    }).then(function (item) {
      console.log(item);
      res.redirect("/admin/adminpage1")
    }).catch(function (error) {
      console.log(error);
      res.render("admin/adminPage1.ejs", { data: req.session.user, items: items, err: true, message: "Not able to Update Item", cartItems: [] });
    })
  }


})

module.exports = router;
