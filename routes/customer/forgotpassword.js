
const express = require('express')
const router = express.Router();

const userSchema = require("../../database/models/users.js");
const userModel=userSchema.schema;
const sendMail = require("../../utils/sendMail.js");


router.route("/").get(function (req, res) {
  res.render("forgotPassword.ejs", { err: false, message: "" });
}).post(function (req, res) {
  if (req.body.email) {
    userModel.findOne({ email: req.body.email }).then(function (data) {
      if (data) {
        var html = `<h3>Dear ${data.username}, Reset Your Password Click here <a href="https://u-kart_shopping-3p34g8mlwjl1rej9g5.codequotient.in/reset/user:${data._id}"><button>Reset Password</button></a>!</h3>`;
        sendMail("Reset Your Password", data.email, html, function (err) {
          if (err) {
            console.log(err);
            res.render("forgotPassword.ejs", { err: true, message: err });
          } else {
            res.render("login.ejs", { err: false, success: true, message: " Mail has been sent to your Registered Gmail Account Please reset the password" });
          }

        })
      } else {
        res.render("forgotPassword.ejs", { err: true, message: "No user Found with entered gmail id" });
      }
    })
  } else {
    res.render("forgotPassword.ejs", { err: true, message: "please Enter Something" });
  }
})


module.exports=router;