const db = require("../config/db");
const achievementController = {};

// Achievement Controller
achievementController.get = async (req, res) => {
  const userId = req.user.id;

  try {
    // Query to calculate streak
    const streakQuery = `
        SELECT DATE(created_at) AS task_date
        FROM tasks
        WHERE user_id = ?
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) DESC;
      `;

    const [dates] = await db.promise().query(streakQuery, [userId]);

    let streak = 0;
    let lastDate = null;

    // Calculate streak based on consecutive dates
    for (const row of dates) {
      const currentDate = new Date(row.task_date);
      if (!lastDate) {
        streak = 1; // Start streak with the first date
      } else {
        const diffInDays = (lastDate - currentDate) / (1000 * 60 * 60 * 24); // Difference in days

        if (diffInDays === 1) {
          streak += 1; // Increment streak if consecutive day
        } else {
          break; // Break streak if there's a gap
        }
      }
      lastDate = currentDate;
    }

    const collaborationQuery = `
  SELECT collabrated_task
FROM users
WHERE id = ?;
`;
    const [collaborations] = await db
      .promise()
      .query(collaborationQuery, [userId]);
    const uniqueCollaborations = collaborations[0]?.collabrated_task || 0;

    // Query to calculate completed tasks
    const taskCompletionQuery = `
        SELECT completed_tasks
FROM users
WHERE id = ?;
      `;
    const [completedTasks] = await db
      .promise()
      .query(taskCompletionQuery, [userId]);
    const completedTask = completedTasks[0]?.completed_tasks || 0;

    // Prepare achievements data
    const achievements = [
      {
        title: "Task Completion Streak",
        description: `You have created tasks for ${streak} consecutive days.`,
        badge: "🔥",
      },
      {
        title: "Collaboration Master",
        description: `Contributing to ${uniqueCollaborations} projects`,
        badge: "🤝",
      },
      {
        title: "Tasker Pro",
        description: `Completed ${completedTask} tasks.`,
        badge: "🏆",
      },
    ];

    res.status(200).json({ achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ error: "Failed to fetch achievements." });
  }
};

module.exports = achievementController;
