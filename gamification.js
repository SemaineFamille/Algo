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

  
function openRewards() {
  document.getElementById("rewardsModal").classList.remove("hidden");
  renderRewards();
}

function closeRewards() {
  document.getElementById("rewardsModal").classList.add("hidden");
}

function getUser() {
  return localStorage.getItem("user") || "joueur";
}

function getPoints() {
  const user = getUser();
  return parseInt(localStorage.getItem("points_" + user)) || 0;
}

function setPoints(value) {
  const user = getUser();
  localStorage.setItem("points_" + user, value);
  initGamification();
}

function renderRewards() {
  const user = getUser();

  document.getElementById("rewards-user").innerText = "👤 " + user;
  document.getElementById("rewards-points").innerText = "⭐ Points : " + getPoints();

  const shop = document.getElementById("rewards-shop");
  shop.innerHTML = "";

  REWARDS.forEach(r => {
    const btn = document.createElement("button");

    btn.className = "reward-item";
    btn.innerHTML = `${r.name} <br><strong>${r.cost} ⭐</strong>`;

    btn.onclick = () => buyReward(r);

    shop.appendChild(btn);
  });
}

function buyReward(reward) {
  let points = getPoints();

  if (points < reward.cost) {
    alert("Pas assez de points !");
    return;
  }

  points -= reward.cost;
  setPoints(points);

  alert("Récompense achetée : " + reward.name);
}
/* =========================
   COFFRE DU JOUR 🎁
========================= */
function openChest() {
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
}
  
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
