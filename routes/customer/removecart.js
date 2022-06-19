const express = require('express')
const router = express.Router();


const cartModel = require("../../database/models/cart.js");

router.route("/").post(function (req, res) {
  var id = req.body.id;
  if (req.session.isLogIn) {
    cartModel.deleteOne({ _id: id }).then(function (data) {
      if (data) {
        console.log("this  data is deleted " );
        res.status(200);
        res.end("deleted");
      } else {
        console.log("data is not found");
        res.status(404);
        res.end("not found");
      }
    })
  }
  else {
    res.status(401);
    res.end("user is unauthorised");
  }
})


module.exports=router;