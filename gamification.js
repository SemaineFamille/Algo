function initGamification() {
  const container = document.getElementById("gamification-container");

  if (!container) return;

  container.innerHTML = `
    <div class="reward-card">
      <h3>🏆 Mon aventure familiale</h3>
      <p>⭐ Points : 0</p>
      <p>🔥 Série : 0 jour</p>
      <p>🎁 Coffre du jour disponible</p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", initGamification);
