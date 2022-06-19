module.exports.init = function()
{
  const mongoose = require('mongoose');
  mongoose.connect("mongodb+srv://rootapp:1234567890@cluster0.u5pka.mongodb.net/EcomUsers?retryWrites=true&w=majority")
  .then(function()
  {
    console.log("db is live")
  })
  .catch(function()
  {
    console.log("error in db connection")
  })
}