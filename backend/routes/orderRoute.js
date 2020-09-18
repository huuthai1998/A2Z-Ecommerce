var jwt = require("jsonwebtoken");
var Order = require("../models/order");
var Product = require("../models/product");
var express = require("express");
const { isAuthenticate } = require("../utils/auth");
var router = express.Router();

router.get("/", async function (req, res) {
  try {
    console.log(req.query.user);
    const orders = await Order.find({ buyer: req.query.user });
    res.send(orders);
  } catch (err) {
    res.send({ msg: err.message });
  }
});

router.delete("/:id", isAuthenticate, async function (req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    console.log("deleted: ", order);
    res.send(order);
  } catch (err) {
    res.send({ msg: err.message });
  }
});

router.post("/", isAuthenticate, async (req, res) => {
  try {
    var items = [];
    for (key in req.body.items) {
      const foundItem = await Product.findById(key);
      foundItem.stock -= req.body.items[key];
      foundItem.save();
      var addItem = {
        _id: foundItem._id,
        name: foundItem.name,
        price: foundItem.price,
        quantity: req.body.items[key],
        product: foundItem._id,
      };
      items.push(addItem);
    }
    var shipment = {
      type: req.body.shipment,
      time: req.body.shipment === "standard" ? 7 : 2,
    };
    var order = new Order({
      items,
      buyer: req.body.buyer,
      address: req.body.address,
      shipment,
      totalPrice: req.body.totalPrice,
      payment: "Paypal",
      shippingCost: req.body.shippingCost,
      itemPrice: req.body.itemPrice,
    });
    order.save();
    console.log(order);
    res.status(201).send(order);
  } catch (err) {
    res.send({ msg: err.message });
  }
});

module.exports = router;
