const GAMIFICATION_URL = "https://script.google.com/macros/s/AKfycbzK45vY_BuZ6qjDixZTcCCF70vmWaLYJTUGG_t8GUTn5IQ3qzP86O2_eVUMgCB0ZRkU/exec";

async function gamificationApi(action, payload = {}) {

  const response = await fetch(GAMIFICATION_URL, {
    method: "POST",
    body: JSON.stringify({
      action,
      ...payload
    })
  });

  return await response.json();
}

async function getProfile(user) {

  return await gamificationApi(
    "getProfile",
    { user }
  );
}

async function saveProfile(profile) {

  return await gamificationApi(
    "saveProfile",
    { profile }
  );
}
