var express = require("express");
var router = express.Router();
var Category = require("../models/category");

/* GET users listing. */
router.get("/", function (req, res, next) {
  Category.find({}).then((data) => {
    res.send(data);
  });
});

module.exports = router;
