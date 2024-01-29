const express = require("express");
const router = express.Router();
const signup_controller = require("../controllers/signup.controller");
const auth_controller = require("../controllers/auth.controller");
const task_controller = require("../controllers/task.controller");

router.route("/signup").post(signup_controller.handle_signup);
router.route("/auth").post(auth_controller.handle_login);
router.route("/logout").get(auth_controller.handle_logout);

router.route("/tasks/add")
  .post(task_controller.handle_create_task)

router.route("/tasks/user/:userId")
  .get(task_controller.handle_get_task_list_by_userId);

router.route("/tasks").get(task_controller.handle_get_all_task_list);

router.route("/tasks/:taskId")
  .patch(task_controller.handle_update_task_stage)
  .delete(task_controller.handle_delete_task_stage)

router.route("/tasks/:taskId")
  .get(task_controller.handle_get_task_details)

module.exports = {
  routes: router
};
