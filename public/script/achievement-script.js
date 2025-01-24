document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:4000/achievements", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch achievements");

    const { achievements } = await response.json();

    // Dynamically update the achievements UI
    const achievementsContainer = document.querySelector(".achievements-grid");
    achievementsContainer.innerHTML = ""; // Clear previous content

    achievements.forEach((achievement) => {
      const card = document.createElement("div");
      card.classList.add("achievement-card");
      card.innerHTML = `
          <div class="badge">${achievement.badge}</div>
          <h2 class="achievement-title">${achievement.title}</h2>
          <p class="achievement-description">${achievement.description}</p>
          
        `;
      achievementsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching achievements:", error);
  }
});
