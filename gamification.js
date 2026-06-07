console.log("🎮 gamification.js chargé");

/* =========================
   CONFIG
========================= */

const REWARDS = [
  { name: "🍰 Choisir le dessert", cost: 10 },
  { name: "🎬 Choisir le film du vendredi", cost: 20 },
  { name: "📱 +30 min écran", cost: 25 },
  { name: "🛏️ Matin tranquille", cost: 15 },
  { name: "🎲 Activité familiale", cost: 30 }
];

const CHALLENGES_KEY = "family_challenges";


/* =========================
   UTILISATEUR / POINTS
========================= */

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


/* =========================
   MODAL RÉCOMPENSES
========================= */

window.openRewards = function () {
  document.getElementById("rewardsModal").classList.remove("hidden");
  renderRewards();
};

window.closeRewards = function () {
  document.getElementById("rewardsModal").classList.add("hidden");
};


/* =========================
   BOUTIQUE
========================= */

function renderRewards() {
  const user = getUser();

  document.getElementById("rewards-user").innerText = "👤 " + user;
  document.getElementById("rewards-points").innerText = "⭐ Points : " + getPoints();

  const shop = document.getElementById("rewards-shop");
  if (!shop) return;

  shop.innerHTML = "";

  REWARDS.forEach(r => {
    const btn = document.createElement("button");

    btn.className = "reward-item";
    btn.innerHTML = `${r.name}<br><strong>${r.cost} ⭐</strong>`;

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

  setPoints(points - reward.cost);

  alert("🎁 Récompense achetée : " + reward.name);
}


/* =========================
   COFFRE DU JOUR
========================= */

window.openChest = function () {
  const user = getUser();
  const key = "chest_" + user + "_" + new Date().toDateString();

  if (localStorage.getItem(key)) {
    document.getElementById("chest-result").innerText =
      "❌ Coffre déjà ouvert aujourd'hui";
    return;
  }

  const reward = Math.floor(Math.random() * 10) + 1;

  setPoints(getPoints() + reward);

  localStorage.setItem(key, "opened");

  document.getElementById("chest-result").innerText =
    "🎉 +" + reward + " points !";
};


/* =========================
   CHALLENGES À 2 👥
========================= */

function getChallenges() {
  return JSON.parse(localStorage.getItem(CHALLENGES_KEY)) || [];
}

function saveChallenges(list) {
  localStorage.setItem(CHALLENGES_KEY, JSON.stringify(list));
}

window.createChallenge = function (user1, user2, title) {
  const challenges = getChallenges();

  challenges.push({
    id: "ch_" + Date.now(),
    users: [user1, user2],
    title: title,
    status: "pending",
    points: 10,
    createdBy: user1
  });

  saveChallenges(challenges);
  renderChallenges();
};

window.completeChallenge = function (id) {
  const challenges = getChallenges();

  const ch = challenges.find(c => c.id === id);
  if (!ch) return;

  ch.status = "done";

  ch.users.forEach(u => {
    let p = parseInt(localStorage.getItem("points_" + u)) || 0;
    localStorage.setItem("points_" + u, p + ch.points);
  });

  saveChallenges(challenges);
  renderChallenges();
};

function renderChallenges() {
  const container = document.getElementById("challenges-container");
  if (!container) return;

  const challenges = getChallenges();

  container.innerHTML = challenges.map(c => `
    <div class="challenge-card">

      <h3>🤝 ${c.title}</h3>

      <p>👥 ${c.users.join(" + ")}</p>

      <p>📊 ${c.status}</p>

      ${c.status !== "done" ? `
        <button onclick="completeChallenge('${c.id}')">
          ✅ Terminer
        </button>
      ` : `<strong>🏆 Terminé</strong>`}

    </div>
  `).join("");
}


/* =========================
   INIT
========================= */

function initGamification() {
  const container = document.getElementById("gamification-container");
  if (!container) return;

  const user = getUser();
  const points = getPoints();

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
          <div class="value">0</div>
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

  renderChallenges();
}

document.addEventListener("DOMContentLoaded", initGamification);
