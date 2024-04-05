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
  calculateSummaryAmounts();
} //www.youtube.com/watch?v=ovBM-keVtRo

function updateGreeting() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const element = document.getElementById("greeting-id");
  let {addHours, greeting} = checkDayTime(hours);
  let name = formatName(currentUser.userName);
  element.innerHTML = templateGreetingsHTML(greeting, name);
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
  console.log("user :>> ", user);
  return /*html*/ `
    <div class="greetings-content" >
      <span>${greeting}${user !== "guest user" ? "," : ""}</span>
      <span class="user-highlight">${user !== "guest user" ? `<span>${user}</span>` : ""}</span>
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
  let nearestDate = getNearestUrgent();
  setNearestDate(nearestDate);
}

function noUpcommingUrgents(urgentAmount) {
  if (urgentAmount === 0) return true;
  else return false;
}

function setNearestDate(nearestDate) {
  let dateEl = document.getElementById("upcomming-date-id");
  let date = new Date(nearestDate);
  let day = ("0" + date.getDate()).slice(-2);
  let month = date.getMonth() + 1;
  let monthString = getMonthAsName(month);
  let year = date.getFullYear();
  dateEl.innerHTML = `${monthString} ` + `${day}, ` + `${year}`;
}

function getMonthAsName(month) {
  console.log("month :>> ", month);
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
  dateListMs.forEach((date) => {
    dates.push(date - currentTimeInMilliseconds);
  });
  nearestDate = dates.indexOf(Math.min(...dates));
  return new Date(dateListMs[nearestDate]);
}

function countOccurrences(list, value) {
  return list.reduce((count, currentValue) => {
    return currentValue === value ? count + 1 : count;
  }, 0);
}

function redirectToBoard() {
  window.location.href = "./board.html";
}
