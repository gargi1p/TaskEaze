const db = require("../config/db");
const User = {};
User.create = (user, callback) => {
  const query =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [user.name, user.email, user.password], callback);
};