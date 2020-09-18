const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  time: { type: String, required: true },
});

const itemSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  product: {
    type: String,
    ref: "Product",
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    items: [itemSchema],
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
    },
    shippingCost: {
      type: Number,
    },
    itemPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    payment: { type: String, required: true },
    shipment: shippingSchema,
    isDelivered: { type: Boolean, default: false },
    deliveredDate: { type: Date },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
