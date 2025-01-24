const db = require("../config/db");
const dashboardController = {};
dashboardController.get = async (req, res) => {
  const userId = req.user.id;

  try {
    const userStatsQuery = `
      SELECT 
        completed_tasks, 
        non_completed_tasks, 
        (completed_tasks + non_completed_tasks) AS total_tasks
      FROM users
      WHERE id = ?;
    `;

    // Query to fetch active tasks from the tasks table
    const activeTasksQuery = `
      SELECT COUNT(*) as active
      FROM tasks
      WHERE user_id = ?;
    `;

    const [[userStats]] = await db.promise().query(userStatsQuery, [userId]);
    const [activeTasksResult] = await db
      .promise()
      .query(activeTasksQuery, [userId]);
    const stats = {
      activeTasks: activeTasksResult[0]?.active || 0,
    };
    if (!userStats) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      totalTasks: userStats.total_tasks,
      completedTasks: userStats.completed_tasks,
      nonCompletedTasks: userStats.non_completed_tasks,
      activeTasks: stats.activeTasks,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
module.exports = dashboardController;
