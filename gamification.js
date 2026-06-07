function initGamification() {
  const container = document.getElementById("gamification-container");
  if (!container) return;

  const user = localStorage.getItem("user") || "joueur";
  const points = parseInt(localStorage.getItem("points_" + user)) || 0;
  const streak = parseInt(localStorage.getItem("streak_" + user)) || 0;

  container.innerHTML = `
    <div class="gamification-big" onclick="openRewards()">
      
      <div class="gamification-header">
        <div class="title">🏆 Ton aventure</div>
        <div class="subtitle">Clique pour voir tes récompenses</div>
      </div>

      <div class="gamification-stats">
        <div class="stat">
          <div class="icon">⭐</div>
          <div class="value">${points}</div>
          <div class="label">Points</div>
        </div>

        <div class="stat">
          <div class="icon">🔥</div>
          <div class="value">${streak}</div>
          <div class="label">Jours</div>
        </div>

        <div class="stat">
          <div class="icon">🎁</div>
          <div class="value">+</div>
          <div class="label">Coffre</div>
        </div>
      </div>

    </div>
  `;
}

document.addEventListener("DOMContentLoaded", initGamification);
