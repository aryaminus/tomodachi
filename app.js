const express = require("express"),
  passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  session = require("express-session"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  config = require("./configuration/config"),
  mysql = require("mysql"),
  app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "keyboard cat", key: "sid" }));
app.use(passport.initialize());
app.use(passport.session());

app.listen(4000);
