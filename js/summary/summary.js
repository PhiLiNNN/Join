async function updateGreeting() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const e = document.getElementById("greeting-id");
  let addHours = 0;
  let addMinutes = m;
  if (h <= 4) {
    // bis 05:00 Uhr
    e.textContent = "Good night,";
    addHours = 4 - h;
  } else if (h <= 10) {
    // bis 11:00 Uhr
    e.textContent = "Good morning,";
    addHours = 10 - h;
  } else if (h <= 12) {
    // bis 13:00 Uhr
    e.textContent = "Good noon,";
    addHours = 12 - h;
  } else if (h <= 17) {
    // bis 18:00 Uhr
    e.textContent = "Good afternoon,";
    addHours = 17 - h;
  } else {
    // bis 04:00 Uhr
    e.innerHTML = "Good evening,";
    addHours = 23 - h;
  }
  const waitTime = addHours * 60 * 60 * 1000 + addMinutes * 60 * 1000;
  setTimeout(updateGreeting, waitTime);
}

updateGreeting();

async function requestToBackend() {
  try {
    const result = await getItem("currentUser");
    return JSON.parse(result) || [];
  } catch (e) {
    console.error("Loading error:", e);
    return [];
  }
}
