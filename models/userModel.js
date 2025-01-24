const db = require("../config/db");
const User = {};
User.create = (user, callback) => {
  const query =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [user.name, user.email, user.password], callback);
};
User.findById = (id, callback) => {
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [id], callback);
};
User.findByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], callback);
};

User.update = (id, fields, callback) => {
  const updates = Object.keys(fields)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(fields), id];

  const query = `UPDATE users SET ${updates} WHERE id = ?`;

  db.query(query, values, callback);
};
User.delete = (id, callback) => {
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], callback);
};
module.exports = User;
