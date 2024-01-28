const express = require("express");
const router = express.Router();
const signup_controller = require("../controllers/signup.controller");
const auth_controller = require("../controllers/auth.controller");
const task_controller = require("../controllers/task.controller");

router.route("/signup").post(signup_controller.handle_signup);
router.route("/auth").post(auth_controller.handle_login);
router.route("/logout").get(auth_controller.handle_logout);
router.route("/tasks").post(task_controller.handle_create_task).get(task_controller.handle_get_all_task_list);
router.route("/tasks/:userId").get(task_controller.handle_get_task_list_by_userId);

module.exports = {
  routes: router
};
