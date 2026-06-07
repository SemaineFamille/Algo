console.log("🎮 gamification.js chargé");
function initGamification() {
  const container = document.getElementById("gamification-container");
  if (!container) return;

  const user = localStorage.getItem("user") || "joueur";
  const points = parseInt(localStorage.getItem("points_" + user)) || 0;
  const streak = parseInt(localStorage.getItem("streak_" + user)) || 0;

  /* =========================
   CONFIG / DONNÉES
========================= */
  const REWARDS = [
  { name: "🍰 Choisir le dessert", cost: 10 },
  { name: "🎬 Choisir le film du vendredi", cost: 20 },
  { name: "📱 +30 min écran", cost: 25 },
  { name: "🛏️ Matin tranquille (pas de stress)", cost: 15 },
  { name: "🎲 Choisir une activité familiale", cost: 30 }
];

/* =========================
   UTILITAIRES
========================= */

  
window.openRewards = function () {
  document.getElementById("rewardsModal").classList.remove("hidden");
  renderRewards();
};

window.closeRewards = function () {
  document.getElementById("rewardsModal").classList.add("hidden");
};

window.openChest = function () {
  const user = getUser();
  const key = "chest_" + user + "_" + new Date().toDateString();

  if (localStorage.getItem(key)) {
    document.getElementById("chest-result").innerText =
      "❌ Coffre déjà ouvert aujourd'hui";
    return;
  }

  const reward = Math.floor(Math.random() * 10) + 1;

  let points = getPoints();
  points += reward;
  setPoints(points);

  localStorage.setItem(key, "opened");

  document.getElementById("chest-result").innerText =
    "🎉 +" + reward + " points !";
};
  
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
