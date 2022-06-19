const express = require('express')
const router = express.Router();


const userModel = require("../../database/models/users.js");

router.route("/user:usermail").get(function (req, res) {
  var id = req.params.usermail.split(":")[1];
  userModel.findOne({ _id: id }).then(function (user) {
    if (user) {
      res.render("resetPassword.ejs", { err: false, message: "", id: id });
    } else {
      res.render("resetPassword.ejs", { err: true, message: "bhai  hack karne ki koshish na kare", id: null });
    }
  }).catch(function (err) {
    console.log("techiqal error");
    res.end(err);
  })
  // 
}).post(function (req, res) {
  var id = req.params.usermail.split(":")[1];
  var newPassword = req.body.password;
  var confirmPassword = req.body.cpassword;
  //  console.log(email,newPassword,confirmPassword);
  if (newPassword === confirmPassword) {
    userModel.findOneAndUpdate({ _id: id }, { password: newPassword }).then(function (data) {
      if (data) {  // by defalut gives old data of the user
        res.render("login.ejs", { err: false, success: true, message: "Reset Password SuccessFully Please Login below " });
      } else {
        res.render("login.ejs", { err: true, success: false, message: " No User Found hacking mat karo bhai" });
      }
    }).catch(function (error) {
      console.log(error);
      res.end("techniqal error");
    })
  } else {
    res.render("resetPassword.ejs", { err: true, message: "PassWord and New Password are Not Matching", id: id });
  }

})


module.exports=router;

