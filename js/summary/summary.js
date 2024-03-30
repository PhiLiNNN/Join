let isUserLoggedIn;
let currentUser;

async function initSummary() {
  isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) window.location.assign("../error_page.html");
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("currentUser :>> ", currentUser);
  toggleVisibility("summary-menu-id", false, "highlight-menu");
  toggleVisibility("summary-body-id", true);
  loadHeaderInitials();
  updateGreeting();
}

function updateGreeting() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const element = document.getElementById("greeting-id");
  let {addHours, greeting} = checkDayTime(hours);
  element.innerHTML = templateGreetingsHTML(greeting, currentUser.userName);
  const waitTime = addHours * 60 * 60 * 1000 + minutes * 60 * 1000;
  setTimeout(updateGreeting, waitTime);
}

function checkDayTime(hours) {
  let addHours = 0;
  let greeting;
  if (hours <= 4) {
    greeting = "Good night"; // bis 05:00 Uhr
    addHours = 4 - hours;
  } else if (hours <= 10) {
    greeting = "Good morning"; // bis 11:00 Uhr
    addHours = 10 - hours;
  } else if (hours <= 12) {
    greeting = "Good noon"; // bis 13:00 Uhr
    addHours = 12 - hours;
  } else if (hours <= 17) {
    greeting = "Good afternoon"; // bis 18:00 Uhr
    addHours = 17 - hours;
  } else {
    greeting = "Good evening"; // bis 04:00 Uhr
    addHours = 23 - hours;
  }
  return {addHours, greeting};
}

function templateGreetingsHTML(greeting, user) {
  return /*html*/ `
    <div class="greetings-content" >
      <span>${greeting}${user !== "guest user" ? "," : ""}</span>
      <span class="user-highlight">${user !== "guest user" ? `<span>${user}</span>` : ""}</span>
    </div>
  `;
}
