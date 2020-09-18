var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var productRoute = require("./routes/productRoute");
var brandRoute = require("./routes/brandRoute");
var categoryRoute = require("./routes/categoryRoute");
var usersRoute = require("./routes/usersRoute");
var orderRoute = require("./routes/orderRoute");

var app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/product", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("ok");
});

mongoose.Promise = global.Promise;

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/product", productRoute);
app.use("/user", usersRoute);
app.use("/brand", brandRoute);
app.use("/category", categoryRoute);
app.use("/order", orderRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
