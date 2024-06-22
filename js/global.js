const STORAGE_TOKEN = "VORXWOHN4ATC5QT3Z5TB4EP1VRUAGMHB44HR2ZKT";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Indicates whether the user prefers dark mode.
 * @type {boolean}
 */
const prefersDarkMode =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

/**
 * Sets an item in the storage.
 * @param {string} key - The key of the item to set.
 * @param {Object} value - The value to set for the specified key.
 * @returns {Promise} - A Promise that resolves with the result of the fetch operation.
 */
async function setItem(key, value) {
  const payload = {key, value, token: STORAGE_TOKEN};
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * Gets an item from the storage.
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise} - A Promise that resolves with the value of the retrieved item.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data.value);
}

/**
 * Checks if a user is logged in.
 * @returns {boolean} - Returns true if a user is logged in, otherwise false.
 */
function checkUserLogIn() {
  if (localStorage.getItem("currentUser")) return true;
  else return false;
}

/**
 * Loads the header initials into the designated element and renders the user initials in the header of the webpage.
 * @param {string} userName - The username of the current user.
 * @returns {void}
 */
function loadHeaderInitials() {
  const element = document.getElementById("header-initials-id");
  const initials = getFirstLettersOfName(currentUser.userName);
  element.innerHTML = templateHeaderInitialsMenu(initials);
}

/**
 * Generates the initials from the given name.
 * If the name contains one word, the initial of that word will be returned.
 * If the name contains two words, the initials of both words will be returned.
 * If the name contains three words, also the initials oft the first both words will be returned.
 * @param {string} name - The name from which to generate initials.
 * @returns {string} - The initials generated from the name.
 */
function getFirstLettersOfName(name) {
  let words = name.replace(/\s+/g, " ").trim().split(" ");
  let initials = "";
  if (words.length === 1) initials = words[0][0].toUpperCase();
  else {
    initials += words[0][0].toUpperCase();
    initials += words[1][0].toUpperCase();
  }
  return initials;
}

/**
 * Generates the HTML template for the header initials.
 * @param {string} initials - The initials to be displayed in the header.
 * @returns {string} - Returns the HTML template for the header initials.
 */
function templateHeaderInitialsMenu(initials) {
  return /*html*/ `
          <span id="header-initials-id" class="header-initials">${initials}</span>
    `;
}

/**
 * Loads users data from the backend storage using the specified key.
 * @param {string} key - The key used to retrieve users data from the backend storage.
 * @returns {Promise<Object>} - A Promise that resolves with the users data retrieved from the backend storage, or an empty object if no data is found.
 */
async function loadUsersFromBackend(key) {
  const result = await getItem(key);
  let test = JSON.parse(result) || {};
  return JSON.parse(result) || {};
}

/**
 * Adds a new user to the backend storage.
 * @param {Object} user - The user object to be added to the backend storage.
 * @returns {Promise<void>} - A Promise that resolves after the user has been successfully added to the backend storage.
 *                            If an error occurs during the process, the Promise will be rejected with an error.
 */
async function addNewUserToBackend(user) {
  try {
    let existingUsers = await loadUsersFromBackend("users");
    existingUsers[user.userEMail] = user;
    await setItem("users", JSON.stringify(existingUsers));
    users = await loadUsersFromBackend("users");
  } catch (error) {
    console.error("An error occurred while adding a new user to the backend:", error);
  }
}

/**
 * Saves the current user data to the local storage and updates the backend.
 */
function save() {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  updateBackend(currentUser);
}

/**
 * Updates the backend with the data of the current user.
 * @param {Object} currentUser - The current user object to be updated in the backend.
 * @returns {Promise<void>} - A Promise that resolves after the current user data has been successfully updated in the backend.
 *                            If an error occurs during the process, the Promise will be rejected with an error.
 */
async function updateBackend(currentUser) {
  showLoader();
  try {
    await updateCurrentUser(currentUser);
  } catch (error) {
    console.error("Error updating current user :", error);
  } finally {
    hideLoader();
  }
}

/**
 * Saves the current user data to the local storage and updates the backend without displaying loader animation.
 * @returns {Promise<void>} - A Promise that resolves after the current user data has been successfully saved to the local storage and updated in the backend.
 *                            If an error occurs during the process, the Promise will be rejected with an error.
 */
async function saveWithoutLoaderAnimation() {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  try {
    await updateCurrentUser(currentUser);
  } catch (error) {
    console.error("Error updating current user :", error);
  }
}

/**
 * Validates a name based on various criteria and updates a boolean array accordingly.
 * @param {string} name - The name to be validated.
 * @param {boolean[]} boolArr - An array of boolean values to be updated based on validation results.
 *                              Index 0: Empty name,
 *                              Index 1: Name too short,
 *                              Index 2: Name contains special characters,
 *                              Index 10: If true, input field border switches to red to indicate an error.
 *                              Index 14: Multiple consecutive hyphens,
 *                              Index 15: Multiple consecutive spaces.
 */
function validateName(name, boolArr) {
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/0123456789]/;
  const checkForDoubleHyphen = name.split("-").length - 1;
  const checkForMultipleSpaces = name.split(" ").length - 1;
  if (name.trim() === "") boolArr[0] = boolArr[10] = true;
  else if (specialCharRegex.test(name)) boolArr[2] = boolArr[10] = true;
  else if (name.length < 2 && checkForDoubleHyphen === 0) boolArr[1] = boolArr[10] = true;
  else if (checkForDoubleHyphen > 1) boolArr[14] = boolArr[10] = true;
  else if (checkForMultipleSpaces > 1) boolArr[15] = boolArr[10] = true;
  else if (
    checkForDoubleHyphen !== 0 &&
    (!name.match(/[a-zA-Z]-[a-zA-Z]{2,}/) || name.indexOf("-") < 2 || name.split("-").pop() === "")
  )
    boolArr[1] = boolArr[10] = true;
}

/**
 * Validates a register email based on various criteria and updates a boolean array accordingly.
 * @param {string} email - The email to be validated.
 * @param {boolean[]} boolArr - An array of boolean values to be updated based on validation results.
 *                              Index 3: Empty email,
 *                              Index 4: Invalid email format or contains space or contains number/special character,
 *                              Index 5: Email already exists,
 *                              Index 11: If true, input field border switches to red to indicate an error.
 */
function validateRegisterEmail(email, boolArr) {
  const containsNumberOrSpecialChar = /[0-9!#$%^&*(),?":{}|<>]/.test(email);
  if (email.trim() === "") boolArr[3] = boolArr[11] = true;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) boolArr[4] = boolArr[11] = true;
  else if (email.includes(" ")) boolArr[4] = boolArr[11] = true;
  else if (email in users) boolArr[5] = boolArr[11] = true;
  else if (containsNumberOrSpecialChar) boolArr[4] = boolArr[11] = true;
}

/**
 * Validates a password based on various criteria and updates a boolean array accordingly.
 * @param {string} password - The password to be validated.
 * @param {boolean[]} boolArr - An array of boolean values to be updated based on validation results.
 *                              Index 6: Empty password,
 *                              Index 7: Weak password (does not meet criteria),
 *                              Index 12: If true, input field border switches to red to indicate an error.
 */
function validatePassword(password, boolArr) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/.test(password);
  const hasDigit = /[0123456789]/.test(password);
  if (password.trim() === "") boolArr[6] = boolArr[12] = true;
  else if (!hasUpperCase || !hasSpecialChar || !hasDigit || password.length < 6)
    boolArr[7] = boolArr[12] = true;
}

/**
 * Validates a confirm password based on various criteria and updates a boolean array accordingly.
 * @param {string} password - The original password.
 * @param {string} confirmPassword - The confirm password to be validated.
 * @param {boolean[]} boolArr - An array of boolean values to be updated based on validation results.
 *                              Index 8: Empty confirm password,
 *                              Index 9: Passwords do not match,
 *                              Index 13: If true, input field border switches to red to indicate an error.
 */
function validateConfirmPassword(password, confirmPassword, boolArr) {
  if (confirmPassword.trim() === "") boolArr[8] = boolArr[13] = true;
  else if (password !== confirmPassword) boolArr[9] = boolArr[13] = true;
}

/**
 * Validates a login email.
 * @param {string} email - The email to be validated.
 * @returns {boolean} - True if the email is valid, otherwise false.
 */
function validateLoginEmail(email) {
  return (
    email !== "" && email.includes("@") && email.indexOf("@") !== 0 && email.split("@").pop() !== ""
  );
}

/**
 * Toggles the visibility of an HTML element by adding or removing a specified CSS class.
 * @param {string} elementId - The ID of the HTML element.
 * @param {boolean} [show=true] - A boolean value indicating whether to show or hide the element. Defaults to true.
 * @param {string} [className="d-none"] - The CSS class to add or remove for toggling visibility. Defaults to "d-none".
 */
function toggleVisibility(elementId, show = true, className = "d-none") {
  const element = document.getElementById(elementId);
  show ? element.classList.remove(className) : element.classList.add(className);
}

/**
 * Checks if a password input value is not empty.
 * @param {string} passwordInput - The password input value to be checked.
 * @returns {boolean} - True if the password input value is not empty, otherwise false.
 */
function isValueNotEmpty(passwordInput) {
  return passwordInput.trim().length !== 0;
}

/**
 * Toggles the scrollbar visibility of the document body.
 * @param {string} value - The value to set for the overflow property of the document body. Use "auto" to show scrollbar and "hidden" to hide scrollbar.
 */
function toggleScrollbar(value) {
  document.body.style.overflow = value;
}

/**
 * Displays the loader animation by toggling its visibility.
 */
function showLoader() {
  toggleVisibility("loader-id", true);
  toggleVisibility("loader-id", true, "loader-hidden");
}

/**
 * Updates the current user data in the backend.
 * @param {Object} currentUser - The current user object to be updated in the backend.
 */
async function updateCurrentUser(currentUser) {
  const existingUsers = await loadUsersFromBackend("users");
  existingUsers[currentUser.userEMail] = currentUser;
  await setItem("users", JSON.stringify(existingUsers));
}

/**
 * Hides the loader animation by toggling its visibility.
 */
function hideLoader() {
  toggleVisibility("loader-id", false, "loader-hidden");
}

/**
 * Checks if a given hex color code represents a light color.
 * @param {string} hexcode - The hex color code to be checked.
 * @returns {number} - A value indicating the lightness of the color. Returns a number between 0 and 1, where 0 indicates a dark color and 1 indicates a light color.
 */
function isColorLight(hexcode) {
  let r = parseInt(hexcode.slice(1, 3), 16);
  let g = parseInt(hexcode.slice(3, 5), 16);
  let b = parseInt(hexcode.slice(5), 16);
  var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return a > 0.5;
}

/**
 * Toggles the visibility of the logout container by adding or removing the specified toggle class.
 */
function toggleLogoutContainer() {
  toggleSection("logout-id", "active");
}

/**
 * Toggles the specified section element by adding or removing a toggle class.
 * @param {string} elementID - The ID of the section element to be toggled.
 * @param {string} toggleClass - The class to be toggled on the section element.
 */
function toggleSection(elementID, toggleClass) {
  const element = document.getElementById(elementID);
  element.classList.toggle(toggleClass);
  closeLogOutByClick();
}

/**
 * Closes the logout dropdown when clicking outside of it.
 */
function closeLogOutByClick() {
  document.addEventListener("click", function (event) {
    const target = event.target;
    const headerInitials = document.getElementById("header-initials-id");
    const logoutDropdown = document.getElementById("logout-id");
    const checkAllTargets =
      logoutDropdown.classList.contains("active") &&
      target !== headerInitials &&
      !headerInitials.contains(target) &&
      target !== logoutDropdown &&
      !logoutDropdown.contains(target);
    if (checkAllTargets) toggleVisibility("logout-id", true, "active");
  });
}

/**
 * Sorts an array of contacts by surname.
 * @param {Object} a - The first contact object to compare.
 * @param {Object} b - The second contact object to compare.
 * @returns {number} - A negative value if a should come before b, a positive value if a should come after b, or 0 if they are equal.
 */
function sortContactsBySurname(a, b) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  const emailA = a.email.toLowerCase();
  const emailB = b.email.toLowerCase();
  if (emailA < emailB) return -1;
  if (emailA > emailB) return 1;
  return 0;
}

/**
 * Sets the favicon based on the preferred color mode.
 */
function setFavicon() {
  const link = document.querySelector("link[rel*='icon']");
  if (prefersDarkMode) link.href = "./assets/fav/favicon_dark_mode.svg";
  else link.href = "./assets/fav/favicon_white_mode.svg";
}

/**
 * Redirects the user to the summary page.
 */
function redirectToSummary() {
  window.location.href = "./summary.html";
}

/**
 * Asynchronously includes HTML content from external files into elements with the "w3-include-html" attribute.
 */
async function includeHTML() {
  let include = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < include.length; i++) {
    const element = include[i];
    let file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      include[i].innerHTML = await resp.text();
    } else {
      include[i].innerHTML = "Page not found";
    }
  }
}

/**
 * Stops the propagation of the given event.
 * @param {Event} event - The event object.
 */
function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * Sets the valid name initials to uppercase.
 * @param {string} name - The name to process and capitalize initials.
 * @returns {string} The processed name with valid initials capitalized.
 */
function setValidNameInItialsToUpperCase(name) {
  const words = name.trim().split(/\s+/);
  const capitalizedWords = words.map((word) => {
    if (word.includes("-")) {
      const parts = word.split("-");
      return parts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join("-");
    } else return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(" ");
}
