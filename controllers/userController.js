const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {};
userController.register = async (req, res) => {
  const { name, email, password } = req.body;
  User.findByEmail(email, async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error occurred." });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create(
      { name, email, password: hashedPassword },
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully!' });
      }
    );
  });
};
userController.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  });
};
userController.getUser = (req, res) => {
  const userId = req.user.id;
  User.findById(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(results[0]);
  });
};
userController.updateUser = (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;
  User.update(userId, { name }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User updated successfully!" });
  });
};
userController.updatePassword = async (req, res) => {
  const userId = req.user.id;
  const { password, re_password } = req.body;
  if (password === re_password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    User.update(userId, { password: hashedPassword }, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Password updated successfully!" });
    });
  }
};
userController.deleteUser = (req, res) => {
  const userId = req.user.id;
  User.delete(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User deleted successfully!" });
  });
};
module.exports = userController;
