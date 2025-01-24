const db = require("../config/db");
const notificationController = {};

notificationController.get = async(req, res) => {
    const userId = req.user.id;

    const query = "SELECT * FROM notifications WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: "Failed to fetch notifications" });
        res.status(200).json({ notifications: results });
    });
}
notificationController.delete = (req, res) => {
    const notificationId = req.params.id;


    if (!notificationId) {
        return res.status(400).json({ error: "Notification ID is required." });
    }

    const query = "DELETE FROM notifications WHERE id = ?";
    db.query(query, [notificationId], (err, results) => {
        if (err) {
            console.error("Error deleting notification:", err);
            return res.status(500).json({ error: "Failed to delete notification." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Notification not found." });
        }

        res.status(200).json({ message: "Notification deleted successfully." });
    });
}
module.exports = notificationController;