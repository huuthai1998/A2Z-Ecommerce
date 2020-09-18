var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var axios = require("axios");
const { isAuthenticate, isAdmin } = require("../utils/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    Product.find({}).then((products) => res.send(products));
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    var id = req.params.id;
    Product.findOne({ _id: id }).then((products) => {
      res.send(products);
    });
  } catch (err) {
    res.send(err);
  }
});

/* POST home page. */
router.post("/", isAuthenticate, isAdmin, async function (req, res, next) {
  try {
    axios.post("", req.body.image);
    const lastProduct = await Product.find().sort({ _id: -1 }).limit(1);
    var _id = parseFloat(lastProduct[0]._id);
    ++_id;
    var addProduct = { ...req.body.product, _id };
    console.log("added", addProduct);
    await Product.create(addProduct).then((data) => {
      res.send(addProduct);
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.put("/:id", isAuthenticate, isAdmin, async function (req, res, next) {
  try {
    var id = req.params.id;
    console.log(req.body.product);
    await Product.findOneAndUpdate({ _id: id }, req.body.product).then(
      (data) => {
        {
          console.log(data);
          res.send(data);
        }
      }
    );
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/rating/:id", isAuthenticate, async function (req, res, next) {
  try {
    var id = req.params.id;
    await Product.findOneAndUpdate({ _id: id }, req.body.product).then(
      (data) => {
        {
          console.log(data);
          res.send(data);
        }
      }
    );
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/stock/:id", isAuthenticate, async function (req, res, next) {
  try {
    var id = req.params.id;
    console.log(req.body.stock);
    await Product.findOneAndUpdate({ _id: id }, { stock: req.body.stock }).then(
      (data) => {
        {
          console.log(data);
          res.send(data);
        }
      }
    );
  } catch (err) {
    res.send(err.message);
  }
});
/* DELETE home page. */
router.delete("/:id", isAuthenticate, isAdmin, function (req, res, next) {
  try {
    const id = req.params.id;
    Product.findByIdAndDelete(id).then((data) =>
      res.send({ message: "Success" })
    );
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
