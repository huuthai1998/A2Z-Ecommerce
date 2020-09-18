var express = require("express");
var router = express.Router();
var Brand = require("../models/brand");

/* GET users listing. */
router.get("/", function (req, res, next) {
  Brand.find({}).then((data) => res.send(data));
});

module.exports = router;
