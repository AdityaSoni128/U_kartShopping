const mongoose = require("mongoose");

const shopItemSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    unique: true
  },
  productimage:{
    type: String,
    required: true,
    unique: true
  },
  productprice:{
    type: Number,
    required: true
  },
  productdescription: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  } 
},
{ timestamps: true }
);

const shopitemModel = mongoose.model('shopitem', shopItemSchema);

module.exports = shopitemModel;