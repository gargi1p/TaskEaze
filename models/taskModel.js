const db = require("../config/db");
const Task = {};
Task.create = (task, callback) => {
  const query = `INSERT INTO tasks (title, due_date, priority, repeat_option, notes, collaborators, user_id)VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [
      task.title,
      task.due_date,
      task.priority,
      task.repeat,
      task.notes,
      task.collaborators,
      task.userID,
    ],
    callback
  );
};
module.exports = Task;
