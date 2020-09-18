const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  brand: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    min: 0,
  },
  numReviews: {
    type: Number,
    min: 0,
  },
  stock: {
    type: Number,
    min: 0,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Product", productSchema);
