let isUserLoggedIn;
let currentUser;

async function initSummary() {
  setFavicon();
  isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) window.location.assign("./error_page.html");
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("currentUser :>> ", currentUser);
  toggleVisibility("summary-menu-id", false, "highlight-menu");
  toggleVisibility("summary-body-id", true);
  loadHeaderInitials();
  updateGreeting();
  calculateSummaryAmounts();
} //www.youtube.com/watch?v=ovBM-keVtRo

function updateGreeting() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const element = document.getElementById("greeting-id");
  const elementMobile = document.getElementById("summary-greeting-id");
  let {addHours, greeting} = checkDayTime(hours);
  let name = formatName(currentUser.userName);
  element.innerHTML = templateGreetingsHTML(greeting, name);
  elementMobile.innerHTML = templateGreetingsHTML(greeting, name);
  const waitTime = addHours * 60 * 60 * 1000 + minutes * 60 * 1000;
  setTimeout(updateGreeting, waitTime);
}

function formatName(name) {
  let parts = name.split(/[ -]/);
  for (let i = 0; i < parts.length; i++) {
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
  }
  return parts.join(" ");
}

function checkDayTime(hours) {
  let addHours = 0;
  let greeting;
  if (hours <= 4) {
    greeting = "Good night"; // bis 05:00 Uhr
    addHours = 4 - hours;
  } else if (hours <= 11) {
    greeting = "Good morning"; // bis 12:00 Uhr
    addHours = 11 - hours;
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
      <span>${greeting}${user.toLowerCase() !== "guest user" ? "," : ""}</span>
      <span class="user-highlight">${
        user.toLowerCase() !== "guest user" ? `<span>${user}</span>` : ""
      }</span>
    </div>
  `;
}
function expireToolTipHTML(expiredDates, expireToday) {
  return /*html*/ `
    <div class="tooltip-summary">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--!Font Awsome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
         <path
           d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
       </svg>
      <div class="summary-tooltiptext">
      <ul>
        <li>${expiredDates} task(s) have expired</li>
        <li>${expireToday} task(s) expire today</li>
      </ul>
      </div>
    </div>
  `;
}

function getElementIds() {
  const toDoEl = document.getElementById("to-do-amount-id");
  const inProgressEl = document.getElementById("inProgress-id");
  const awaitFeedbackEl = document.getElementById("awaitingFeedback-id");
  const doneEl = document.getElementById("done-amount-id");
  const urgentEl = document.getElementById("urgent-id");
  return {toDoEl, inProgressEl, awaitFeedbackEl, doneEl, urgentEl};
}

function getAmounts() {
  const toDoAmount = countOccurrences(currentUser.tasks.board, "toDo");
  const awaitFeedbackAmount = countOccurrences(currentUser.tasks.board, "awaitFeedback");
  const inProgressAmount = countOccurrences(currentUser.tasks.board, "inProgress");
  const doneAmount = countOccurrences(currentUser.tasks.board, "done");
  const urgentAmount = countOccurrences(currentUser.tasks.prios, "urgent");
  return {toDoAmount, awaitFeedbackAmount, inProgressAmount, doneAmount, urgentAmount};
}
function setAmounts(
  toDoEl,
  inProgressEl,
  awaitFeedbackEl,
  doneEl,
  urgentEl,
  toDoAmount,
  awaitFeedbackAmount,
  inProgressAmount,
  doneAmount,
  urgents
) {
  toDoEl.innerHTML = toDoAmount;
  inProgressEl.innerHTML = awaitFeedbackAmount;
  awaitFeedbackEl.innerHTML = inProgressAmount;
  doneEl.innerHTML = doneAmount;
  urgentEl.innerHTML = urgents;
  let totalEl = document.getElementById("total-tasks-id");
  totalEl.innerHTML = toDoAmount + awaitFeedbackAmount + inProgressAmount + doneAmount;
}

function calculateSummaryAmounts() {
  let {toDoEl, inProgressEl, awaitFeedbackEl, doneEl, urgentEl} = getElementIds();
  let {toDoAmount, awaitFeedbackAmount, inProgressAmount, doneAmount, urgentAmount} = getAmounts();

  setAmounts(
    toDoEl,
    inProgressEl,
    awaitFeedbackEl,
    doneEl,
    urgentEl,
    toDoAmount,
    awaitFeedbackAmount,
    inProgressAmount,
    doneAmount,
    urgentAmount
  );
  if (noUpcommingUrgents(urgentAmount)) return;
  let {nearestDate, expiredDates, expireToday} = getNearestUrgent();
  console.log("nearestDate :>> ", nearestDate);
  setNearestDate(nearestDate);
  renderExpireDeadlines(expiredDates, expireToday);
}

function renderExpireDeadlines(expiredDates, expireToday) {
  let element = document.getElementById("expire-tooltip-id");
  element.innerHTML = expireToolTipHTML(expiredDates, expireToday);
}

function noUpcommingUrgents(urgentAmount) {
  if (urgentAmount === 0) return true;
  else return false;
}

function setNearestDate(nearestDate) {
  let dateEl = document.getElementById("upcomming-date-id");
  let day = ("0" + nearestDate.getDate()).slice(-2);
  let month = nearestDate.getMonth() + 1;
  let monthString = getMonthAsName(month);
  let year = nearestDate.getFullYear();
  dateEl.innerHTML = `${monthString} ` + `${day}, ` + `${year}`;
}

function getMonthAsName(month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[month - 1];
}

function getNearestUrgent() {
  let dateListMs = getAllDates();
  let currentTimeInMilliseconds = getCurrentDate();
  return checkForClosesDate(dateListMs, currentTimeInMilliseconds);
}

function getAllDates() {
  let dateList = [];
  let dateListMs = [];
  currentUser.tasks.prios.forEach((prio, index) => {
    if (prio === "urgent") {
      dateList.push(currentUser.tasks.dates[index]);
      let dateTime = new Date(currentUser.tasks.dates[index]);
      let currentTimeInMilliseconds = dateTime.getTime();
      dateListMs.push(currentTimeInMilliseconds);
    }
  });
  return dateListMs;
}

function getCurrentDate() {
  let newDate = new Date();
  return newDate.getTime();
}

function checkForClosesDate(dateListMs, currentTimeInMilliseconds) {
  let dates = [];
  expiredDates = 0;
  expireToday = 0;
  let timePastSinceTwoOclock = checkIfDateIsInPast();
  dateListMs.forEach((date) => {
    dates.push(date + timePastSinceTwoOclock - currentTimeInMilliseconds);
  });
  position = dates.indexOf(Math.min(...dates.map((date) => Math.abs(date))));
  expiredDates = dates.filter((date) => date < 0).length;
  expireToday = dates.filter((date) => date === 0).length;
  let nearestDate = new Date(dateListMs[position]);
  console.log("expiredDates :>> ", expiredDates);
  console.log("expireToday :>> ", expireToday);
  console.log("dates :>> ", dates);
  return {nearestDate, expiredDates, expireToday};
}

function checkIfDateIsInPast() {
  let now = new Date();
  let midnight = new Date(now);
  midnight.setHours(2, 0, 0, 0);
  let msSinceMidnight = now - midnight;
  return msSinceMidnight;
}

function countOccurrences(list, value) {
  return list.reduce((count, currentValue) => {
    return currentValue === value ? count + 1 : count;
  }, 0);
}

function redirectToBoard() {
  window.location.href = "./board.html";
}
