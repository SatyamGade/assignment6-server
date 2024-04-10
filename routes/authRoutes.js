const express = require("express");
const { home, register, login, user } = require("../controllers/authControllers");
const {loginSchema, signupSchema} = require("../validators/authValidator");
const validate = require("../middlewares/validateMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(home);

router.route("/register").post(validate(signupSchema), register);

router.route("/login").post(validate(loginSchema), login);

router.route("/user").get(authMiddleware, user);

module.exports = router;