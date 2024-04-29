const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/").get(userController.getAll).post(userController.signup);

router.post("/login", userController.login);
router.route("/logged-check").post(userController.isLoggedIn);

module.exports = router;
