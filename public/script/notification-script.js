document.addEventListener("DOMContentLoaded", () => {
    const notificationBtn = document.getElementById("notificationBtn");
    const notificationPopup = document.getElementById("notificationPopup");
    const closePopup = document.getElementById("closePopup");
    const notificationList = document.getElementById("notificationList");
    const notificationNum = document.getElementById("notificationNum");

    // Fetch Notifications
    const fetchNotifications = () => {
        fetch("http://localhost:4000/notification", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                const notifications = data.notifications;
                notificationList.innerHTML = "";
                console.log(notifications);

                if (notifications.length > 0) {
                    notificationNum.textContent = notifications.length;
                    notifications.forEach(notification => {
                        const item = document.createElement("div");
                        item.classList.add("notification-item");
                        item.innerHTML = `
                            <h3>${notification.title}</h3>
                            <p>${notification.priority}</p>
                            <button class="delete-btn" data-id="${notification.id}">Delete</button>
                        `;
                        notificationList.appendChild(item);
                    });

                    // Add delete functionality
                    document.querySelectorAll(".delete-btn").forEach(button => {
                        button.addEventListener("click", event => {
                            const id = event.target.getAttribute("data-id");
                            deleteNotification(id);
                        });
                    });
                } else {
                    notificationList.innerHTML = "<p>No new notifications.</p>";
                }
            })
            .catch(err => console.error("Error fetching notifications:", err));
    };

    // Delete Notification
    const deleteNotification = id => {
        fetch(`http://localhost:4000/notification/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(() => fetchNotifications())
            .catch(err => console.error("Error deleting notification:", err));
    };

    // Show/Hide Notification Popup
    notificationBtn.addEventListener("click", () => {
        notificationPopup.style.display =
            notificationPopup.style.display === "block" ? "none" : "block";
    });

    closePopup.addEventListener("click", () => {
        notificationPopup.style.display = "none";
    });

    // Fetch Notifications on Page Load
    fetchNotifications();
});
