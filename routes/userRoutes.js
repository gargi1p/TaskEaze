const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");
const dashboardController = require("../controllers/dashboardController");
const achievementController = require("../controllers/achievementController");
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", authMiddleware, userController.getUser);
router.put("/profile", authMiddleware, userController.updateUser);
router.put("/edit-profile", authMiddleware, userController.updatePassword);
router.delete("/profile", authMiddleware, userController.deleteUser);
router.post("/create-task", authMiddleware, taskController.create);
router.get("/get-task", authMiddleware, taskController.get);
router.post("/complete-task/:id", authMiddleware, taskController.complete);
router.get("/dashboard", authMiddleware, dashboardController.get);
router.get("/notification", authMiddleware, notificationController.get);
router.get("/achievements", authMiddleware, achievementController.get);
router.delete(
  "/notification/:id",
  authMiddleware,
  notificationController.delete
);
module.exports = router;
