const db = require("../config/db");
const schedule = require("node-schedule");

const taskController = {};

taskController.create = async (req, res) => {
  const { title, due_date, priority, repeat, notes, collaborators } = req.body;
  const userId = req.user.id;

  if (!title || !priority) {
    return res
      .status(400)
      .json({ error: "Title, due date, and priority are required." });
  }
  const collaboratorEmails = collaborators
    ? collaborators.split(",").map((email) => email.trim())
    : [];
  const userEmail = req.user.email;

  if (
    collaboratorEmails.length > 0 &&
    !collaboratorEmails.includes(userEmail)
  ) {
    collaboratorEmails.push(userEmail);
  }
  if (collaboratorEmails.length === 0) {
    const taskQuery = `
      INSERT INTO tasks (title, due_date, priority, repeat_option, notes, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const taskValues = [
      title,
      due_date,
      priority,
      repeat || "None",
      notes || "",
      userId,
    ];

    db.query(taskQuery, taskValues, (err, taskResults) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create task. yha" });
      }

      const taskId = taskResults.insertId;

      const notificationQuery = `
        INSERT INTO notifications (user_id, title, due_date,priority, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `;
      const notificationValues = [
        userId,
        title,
        due_date,
        priority,
        new Date(),
      ];

      db.query(notificationQuery, notificationValues, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to send notification. ye" });
        }

        return res.status(201).json({
          message: "Task created successfully",
          taskId: taskId,
        });
      });
    });

    return;
  }

  const query = `
  SELECT id, email FROM users WHERE email IN (?)
`;
  db.query(query, [collaboratorEmails], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error fetching collaborator data." });
    }

    const existingEmails = results.map((user) => user.email);
    const invalidEmails = collaboratorEmails.filter(
      (email) => !existingEmails.includes(email)
    );

    const taskQuery = `
    INSERT INTO tasks (title, due_date, priority, repeat_option, notes, collaborators, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
    const taskValues = [
      title,
      due_date,
      priority,
      repeat || "None",
      notes || "",
      collaboratorEmails.join(","),
      userId,
    ];

    db.query(taskQuery, taskValues, (err, taskResults) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create task." });
      }

      const taskId = taskResults.insertId;

      // Create tasks for each collaborator
      const collaboratorTasks = results
        .filter((user) => user.email !== userEmail) // Exclude the logged-in user's email
        .map((user) => [
          title,
          due_date,
          priority,
          repeat || "None",
          notes || "",
          collaboratorEmails.join(","), // All collaborators for the task
          user.id, // Collaborator's user ID
        ]);

      const collaboratorQuery = `
      INSERT INTO tasks (title, due_date, priority, repeat_option, notes, collaborators, user_id)
      VALUES ?
    `;

      db.query(collaboratorQuery, [collaboratorTasks], (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to assign task to collaborators." });
        }

        const updateUserQuery = `
        UPDATE users SET collabrated_task = collabrated_task + 1 WHERE id = ?;
      `;
        db.promise().query(updateUserQuery, [userId]);

        // Create notifications for each collaborator
        const notificationQuery = `
        INSERT INTO notifications (user_id, title, priority, due_date, timestamp)
        VALUES ?
      `;
        const notifications = results.map((user) => [
          user.id, // Collaborator's user ID
          title,
          priority,
          due_date,
          new Date(),
        ]);

        db.query(notificationQuery, [notifications], (err) => {
          if (err) {
            return res.status(500).json({
              error: "Failed to send notifications to collaborators.",
            });
          }

          res.status(201).json({
            message: "Task created successfully and assigned to collaborators!",
            taskId: taskId,
          });
        });
      });
    });
  });
};

taskController.complete = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id; //authentication middleware
  try {
    const updateTaskQuery = `
      DELETE FROM tasks WHERE id = ? AND user_id = ?;
    `;

    const updateUserQuery = `
      UPDATE users SET completed_tasks = completed_tasks + 1 WHERE id = ?;
    `;

    const [taskResult] = await db
      .promise()
      .query(updateTaskQuery, [taskId, userId]);

    const deleteNotificationsQuery = `
      DELETE FROM notifications
      WHERE user_id = ?
    `;
    await db.promise().query(deleteNotificationsQuery, [userId]);

    if (taskResult.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Task not found or already deleted." });
    }

    await db.promise().query(updateUserQuery, [userId]);

    res.status(200).json({ message: "Task marked as completed and removed." });
  } catch (error) {
    console.error("Error marking task as completed:", error);
    res.status(500).json({ error: "Failed to mark task as completed." });
  }
};

taskController.get = async (req, res) => {
  const userId = req.user.id;

  const query = "SELECT * FROM tasks WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch tasks." });
    }
    res.json(results);
  });
};

schedule.scheduleJob("0 0 * * *", async () => {
  const today = new Date().toISOString().split("T")[0]; // Current date

  try {
    const fetchOverdueTasksQuery = `
      SELECT id, user_id FROM tasks WHERE due_date < ?;
    `;

    const deleteOverdueTasksQuery = `
      DELETE FROM tasks WHERE id IN (?);
    `;

    const updateUserQuery = `
      UPDATE users SET non_completed_tasks = non_completed_tasks + 1 WHERE id = ?;
    `;

    const [overdueTasks] = await db
      .promise()
      .query(fetchOverdueTasksQuery, [today]);

    if (overdueTasks.length > 0) {
      const taskIds = overdueTasks.map((task) => task.id);
      const userUpdates = overdueTasks.map((task) =>
        db.promise().query(updateUserQuery, [task.user_id])
      );

      await db.promise().query(deleteOverdueTasksQuery, [taskIds]);
      await Promise.all(userUpdates);

      console.log("Overdue tasks cleaned up successfully.");
    }
  } catch (error) {
    console.error("Error cleaning up overdue tasks:", error);
  }
});
module.exports = taskController;
