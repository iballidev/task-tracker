const express = require("express");
const router = express.Router();
const signup_controller = require("../controllers/signup.controller");
const auth_controller = require("../controllers/auth.controller");

router.route("/signup").post(signup_controller.handle_signup);
router.route("/auth").post(auth_controller.handle_login);
router.route("/logout").get(auth_controller.handle_logout);

module.exports = {
  routes: router
};
