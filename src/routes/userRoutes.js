const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/forgot-password", userController.forgotPassword);
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
