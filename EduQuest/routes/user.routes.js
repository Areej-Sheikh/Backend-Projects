var express = require("express");
var router = express.Router();
const UserSchema = require("../models/user.schema");
const { isLoggedIn } = require("../middlewares/auth.middleware");

const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(UserSchema.authenticate()));

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Welcome to User Route");
});
router.get("/register", function (req, res) {
  res.render("registeruser");
});
router.post("/register", async function (req, res, next) {
  try {
    const { username, email, password } = req.body;
    await UserSchema.register({ username, email }, password);
    res.redirect("/user/signin");
  } catch (error) {
    next(error);
  }
});
router.get("/signin", async function (req, res) {
  res.render("loginuser");
});
router.get("/login", function (req, res) {
  res.render("loginuser");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/register",
  }),
  (req, res) => {}
);
router.get("/profile", isLoggedIn, async function (req, res, next) {
  try {
    res.render("profileuser", { user: req.user });
  } catch (error) {
    next(error);
  }
});
router.get("/logout", isLoggedIn,async function (req, res) {
  req.logout(()=>{
    res.redirect("/");

  });
});
module.exports = router;
