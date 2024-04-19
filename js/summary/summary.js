let isUserLoggedIn;
let currentUser;

/**
 * Initializes the summary page by setting the favicon, checking user login status, and loading necessary data.
 * Redirects to the error page if the user is not logged in.
 */
async function initSummary() {
  setFavicon();
  isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) window.location.assign("./error_page.html");
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  toggleVisibility("summary-menu-id", false, "highlight-menu");
  toggleVisibility("summary-body-id", true);
  loadHeaderInitials();
  updateGreeting();
  calculateSummaryAmounts();
}

/**
 * Updates the greeting message displayed on the summary page.
 * Uses the current time to determine the appropriate greeting.
 * Refreshes the greeting periodically based on the time of day.
 */
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

/**
 * Formats the given name by capitalizing the first letter of each word and converting the rest to lowercase.
 * @param {string} name - The name to be formatted.
 * @returns {string} The formatted name.
 */
function formatName(name) {
  let parts = name.split(/[ -]/);
  for (let i = 0; i < parts.length; i++) {
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
  }
  return parts.join(" ");
}

/**
 * Determines the time of day based on the given hour and returns the appropriate greeting.
 * @param {number} hours - The hour of the day (0-23).
 * @returns {object} An object containing the additional hours until the next time period and the corresponding greeting.
 */
function checkDayTime(hours) {
  let addHours = 0;
  let greeting;
  if (hours <= 4) {
    greeting = "Good night"; // till 05:00 Uhr
    addHours = 4 - hours;
  } else if (hours <= 11) {
    greeting = "Good morning"; // till 12:00 Uhr
    addHours = 11 - hours;
  } else if (hours <= 17) {
    greeting = "Good afternoon"; // till 18:00 Uhr
    addHours = 17 - hours;
  } else {
    greeting = "Good evening"; // till 04:00 Uhr
    addHours = 23 - hours;
  }
  return {addHours, greeting};
}

/**
 * Generates HTML content for displaying greetings based on the time of day and user's name.
 * @param {string} greeting - The greeting message (e.g., "Good morning").
 * @param {string} user - The user's name.
 * @returns {string} The HTML content for greetings.
 */
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

/**
 * Generates HTML content for displaying expired task information in a tooltip.
 * @param {number} expiredDates - The number of tasks that have expired.
 * @param {number} expireToday - The number of tasks that expire today.
 * @returns {string} The HTML content for the tooltip.
 */
function expireToolTipHTML(expiredDates, expireToday) {
  return /*html*/ `
    <div class="tooltip-summary">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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

/**
 * Retrieves element IDs for various task categories from the DOM.
 * @returns {Object} An object containing element IDs for task categories.
 */
function getElementIds() {
  const toDoEl = document.getElementById("to-do-amount-id");
  const inProgressEl = document.getElementById("inProgress-id");
  const awaitFeedbackEl = document.getElementById("awaitingFeedback-id");
  const doneEl = document.getElementById("done-amount-id");
  const urgentEl = document.getElementById("urgent-id");
  return {toDoEl, inProgressEl, awaitFeedbackEl, doneEl, urgentEl};
}

/**
 * Retrieves the number of tasks in different categories.
 * @returns {Object} An object containing the number of tasks in each category.
 */
function getAmounts() {
  const toDoAmount = countOccurrences(currentUser.tasks.board, "toDo");
  const awaitFeedbackAmount = countOccurrences(currentUser.tasks.board, "awaitFeedback");
  const inProgressAmount = countOccurrences(currentUser.tasks.board, "inProgress");
  const doneAmount = countOccurrences(currentUser.tasks.board, "done");
  const urgentAmount = countOccurrences(currentUser.tasks.prios, "urgent");
  return {toDoAmount, awaitFeedbackAmount, inProgressAmount, doneAmount, urgentAmount};
}

/**
 * Sets the number of tasks in different categories to respective DOM elements.
 * @param {HTMLElement} toDoEl - The DOM element for displaying the number of tasks in 'To Do' category.
 * @param {HTMLElement} inProgressEl - The DOM element for displaying the number of tasks in 'In Progress' category.
 * @param {HTMLElement} awaitFeedbackEl - The DOM element for displaying the number of tasks in 'Awaiting Feedback' category.
 * @param {HTMLElement} doneEl - The DOM element for displaying the number of tasks in 'Done' category.
 * @param {HTMLElement} urgentEl - The DOM element for displaying the number of urgent tasks.
 * @param {number} toDoAmount - The number of tasks in 'To Do' category.
 * @param {number} awaitFeedbackAmount - The number of tasks in 'Awaiting Feedback' category.
 * @param {number} inProgressAmount - The number of tasks in 'In Progress' category.
 * @param {number} doneAmount - The number of tasks in 'Done' category.
 * @param {number} urgents - The number of urgent tasks.
 */
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

/**
 * Calculates and updates the summary amounts for different task categories.
 */
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
  console.log("urgentAmount :>> ", urgentAmount);
  // if (noUpcommingUrgents(urgentAmount)) return;
  let {nearestDate, expiredDates, expireToday} = getNearestUrgent();
  renderNearestDate(nearestDate);
  renderExpireDeadlines(expiredDates, expireToday);
}

/**
 * Renders the expiration deadlines tooltip with the given data.
 * @param {number} expiredDates - The number of tasks that have expired.
 * @param {number} expireToday - The number of tasks that expire today.
 */
function renderExpireDeadlines(expiredDates, expireToday) {
  let element = document.getElementById("expire-tooltip-id");
  element.innerHTML = expireToolTipHTML(expiredDates, expireToday);
}

/**
 * Checks if there are no upcoming urgent tasks.
 * @param {number} urgentAmount - The number of urgent tasks.
 * @returns {boolean} Returns true if there are no upcoming urgent tasks, otherwise returns false.
 */
function noUpcommingUrgents(urgentAmount) {
  if (urgentAmount === 0) return true;
  else return false;
}

/**
 * Renders the nearest upcoming date to the DOM element.
 * @param {Date|number} nearestDate - The nearest upcoming date. If -1, indicates that there are no upcoming dates.
 */
function renderNearestDate(nearestDate) {
  let dateEl = document.getElementById("upcomming-date-id");
  if (nearestDate === -1) dateEl.innerHTML = `Currently, there is no`;
  else {
    let day = ("0" + nearestDate.getDate()).slice(-2);
    let month = nearestDate.getMonth() + 1;
    let monthString = getMonthAsName(month);
    let year = nearestDate.getFullYear();
    dateEl.innerHTML = `${monthString} ` + `${day}, ` + `${year}`;
  }
}

/**
 * Returns the name of the month based on the provided month number.
 * @param {number} month - The month number (1 for January, 2 for February, etc.).
 * @returns {string} - The name of the month.
 */
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

/**
 * Returns the nearest urgent date from the list of urgent dates.
 * @returns {Date|number} - The nearest urgent date or -1 if there are no urgent dates.
 */
function getNearestUrgent() {
  let {AllDatesListMs, urgentDatesListMs} = getAllDates();
  let currentTimeInMilliseconds = getCurrentDate();
  return checkForClosesDates(AllDatesListMs, currentTimeInMilliseconds, urgentDatesListMs);
}

/**
 * Retrieves lists of all task dates in milliseconds and urgent task dates in milliseconds.
 * @returns {Object} - An object containing two lists:
 *   - AllDatesListMs: List of all task dates in milliseconds.
 *   - urgentDatesListMs: List of urgent task dates in milliseconds.
 */
function getAllDates() {
  let AllDatesList = [];
  let AllDatesListMs = [];
  let urgentDatesListMs = [];
  currentUser.tasks.prios.forEach((prio, index) => {
    AllDatesList.push(currentUser.tasks.dates[index]);
    let dateTime = new Date(currentUser.tasks.dates[index]);
    let currentTimeInMilliseconds = dateTime.getTime();
    AllDatesListMs.push(currentTimeInMilliseconds);
    if (prio === "urgent") {
      let urgentTime = new Date(currentUser.tasks.dates[index]);
      let currentUrgentTimeInMilliseconds = urgentTime.getTime();
      urgentDatesListMs.push(currentUrgentTimeInMilliseconds);
    }
  });
  return {AllDatesListMs, urgentDatesListMs};
}

/**
 * Retrieves the current date and time in milliseconds.
 * @returns {number} - The current date and time in milliseconds.
 */
function getCurrentDate() {
  let newDate = new Date();
  return newDate.getTime();
}

/**
 * Checks for the closest dates among all dates and urgent dates.
 * @param {number[]} AllDatesListMs - The list of all dates in milliseconds.
 * @param {number} currentTimeInMs - The current time in milliseconds.
 * @param {number[]} urgentDatesListMs - The list of urgent dates in milliseconds.
 * @returns {Object} - An object containing the nearest date, the number of expired dates, and the number of dates expiring today.
 */
function checkForClosesDates(AllDatesListMs, currentTimeInMs, urgentDatesListMs) {
  let timePastSinceTwoOclock = checkIfDateIsInPast();
  const allDates = iterateOverDateList(AllDatesListMs, timePastSinceTwoOclock, currentTimeInMs);
  const allUrgents = iterateOverDateList(
    urgentDatesListMs,
    timePastSinceTwoOclock,
    currentTimeInMs
  );
  const nearestDate =
    urgentDatesListMs.length > 0
      ? new Date(urgentDatesListMs[allUrgents.findIndex((date) => date >= 0)])
      : -1;
  const expiredDates = allDates.filter((date) => date < 0).length;
  const expireToday = allDates.filter((date) => date === 0).length;
  return {nearestDate, expiredDates, expireToday};
}

/**
 * Iterates over the list of dates and adjusts each date based on the time past since two o'clock and the current time.
 * @param {number[]} AllDatesListMs - The list of dates in milliseconds.
 * @param {number} timePastSinceTwoOclock - The time past since two o'clock in milliseconds.
 * @param {number} currentTimeInMs - The current time in milliseconds.
 * @returns {number[]} - An array containing the adjusted dates.
 */
function iterateOverDateList(AllDatesListMs, timePastSinceTwoOclock, currentTimeInMs) {
  let dates = [];
  AllDatesListMs.forEach((date) => {
    dates.push(date + timePastSinceTwoOclock - currentTimeInMs);
  });
  return dates;
}

/**
 * Checks if the current time is after 2:00 AM and calculates the time elapsed since then.
 * @returns {number} - The time elapsed in milliseconds since 2:00 AM.
 */
function checkIfDateIsInPast() {
  let now = new Date();
  let midnight = new Date(now);
  midnight.setHours(2, 0, 0, 0);
  let msSinceMidnight = now - midnight;
  return msSinceMidnight;
}

/**
 * Counts the occurrences of a specific value in a list.
 * @param {any[]} list - The list to search for occurrences.
 * @param {any} value - The value to count occurrences of.
 * @returns {number} - The number of occurrences of the specified value in the list.
 */
function countOccurrences(list, value) {
  return list.reduce((count, currentValue) => {
    return currentValue === value ? count + 1 : count;
  }, 0);
}

/**
 * Redirects the user to the board page.
 */
function redirectToBoard() {
  window.location.href = "./board.html";
}
