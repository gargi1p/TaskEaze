document.addEventListener("DOMContentLoaded", () => {
    // Load Header and Navigation Bar
    const headerContainer = document.getElementById("header-container");
    fetch("latestNav.html")
      .then((response) => response.text())
      .then((html) => {
        headerContainer.innerHTML = html;
        initializeNotifications(); // Initialize notifications after loading header
      })
      .catch((err) => console.error("Error loading header:", err));
  
    // Notification System
    const initializeNotifications = () => {
      const notificationBtn = document.getElementById("notificationBtn");
      const notificationPopup = document.getElementById("notificationPopup");
      const closePopup = document.getElementById("closePopup");
      const overlay = document.getElementById("overlay");
      const notificationList = document.getElementById("notificationList");
      const notificationNum = document.getElementById("notificationNum");
  
      // Fetch Notifications
      const fetchNotifications = () => {
        fetch("http://localhost:4000/notification", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const notifications = data.notifications;
            notificationList.innerHTML = ""; // Clear current notifications
  
            if (notifications && notifications.length > 0) {
              notificationNum.textContent = notifications.length;
  
              notifications.forEach((notification) => {
                const item = document.createElement("div");
                item.classList.add("notification-item");
                item.innerHTML = `
                    <h3>Title: ${notification.title}</h3>
                    <p>Priority: ${notification.priority}</p>
                    <span class="timestamp">Due_date: ${new Date(
                      notification.due_date
                    ).toLocaleDateString()}</span>
                    <button class="delete-btn" data-id="${
                      notification.id
                    }">Delete</button>
                  `;
                notificationList.appendChild(item);
              });
  
              // Add delete functionality
              document.querySelectorAll(".delete-btn").forEach((button) => {
                button.addEventListener("click", (event) => {
                  const id = event.target.getAttribute("data-id");
                  deleteNotification(id);
                });
              });
            } else {
              notificationNum.textContent = "0";
              notificationList.innerHTML = "<p>No new notifications.</p>";
            }
          })
          .catch((err) => console.error("Error fetching notifications:", err));
      };
  
      // Delete Notification
      const deleteNotification = (id) => {
        fetch(`http://localhost:4000/notification/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then(() => fetchNotifications()) // Refresh notifications
          .catch((err) => console.error("Error deleting notification:", err));
      };
  
      // Show Notification Popup
      notificationBtn.addEventListener("click", () => {
        notificationPopup.style.display = "block";
        overlay.style.display = "block";
      });
  
      // Close Notification Popup
      closePopup.addEventListener("click", () => {
        notificationPopup.style.display = "none";
        overlay.style.display = "none";
      });
  
      overlay.addEventListener("click", () => {
        notificationPopup.style.display = "none";
        overlay.style.display = "none";
      });
  
      // Initial fetch of notifications
      fetchNotifications();
    };
  
    fetch("http://localhost:4000/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        // Update user profile in the nav
        document.getElementById("name").textContent = data.name || "No Name";
        //   document.getElementById("email").textContent = data.email || "No Email";
      })
      .catch((error) => console.error("Error fetching user data:", error));
  });
  