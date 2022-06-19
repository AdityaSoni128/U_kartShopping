const express = require('express')
const bcrypt = require("bcrypt");
const router = express.Router();

const shopModel = require("../../database/models/shopitems.js");
const userSchema = require("../../database/models/users.js");

const userModel = userSchema.schema;
const userRoleEnums = userSchema.role

router.route("/").get(function (req, res) {
  if (req.session.isLogIn) {
    shopModel.find({}).then(function (items) {
      // console.log(items);
      res.render("page1.ejs", { data: req.session.user, items: items, loadMoreCss: false });
    }).catch(function (err) {
      res.end(err);
    })
  } else {
    res.render("login.ejs", { err: false, success: false, message: "" });
  }
}).post(function (req, res) {
  var email = req.body.email;
  var password = req.body.password;



  if (email.trim() != "" && password.trim() != "") {
    userModel.findOne({ email: email, role: userRoleEnums.customer }).then(function (data) {

      bcrypt.compare(password, data.password, function (err, result) {
        console.log(result);
        if (err) {
           console.log("error in hasing in login")
        } else if (result && data) {
          var user = data;
          if (user.verifyMail) {
            req.session.isLogIn = true;
            req.session.user = user;
            req.session.pageItems = 2;
            res.redirect("/page1")
          } else {
            res.render("login.ejs", { err: true, success: false, message: "Please Verify Your Account First go to registered email id" });
          }
        } else {
          res.render("login.ejs", { err: true, success: false, message: "invalid Username or password" });
        }
      });
      {

      }
    }).catch(function (err) {
      res.render("login.ejs", { err: true, success: false, message: err });
      // console.log(err);
    })
  } else {
    res.render("login.ejs", { err: true, success: false, message: "please Enter Details to Login" });
  }
})


module.exports = router;