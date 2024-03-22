const STORAGE_TOKEN = "VORXWOHN4ATC5QT3Z5TB4EP1VRUAGMHB44HR2ZKT";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Push request to backend.
 * Either it is fulfilled successfully (resolved) or it fails (rejected).
 * @param {lokal storage key} key
 * @param {string} value
 * @returns Promise: resolved or rejected.
 */

async function setItem(key, value) {
  const payload = {key, value, token: STORAGE_TOKEN};
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * Get request to backend.
 * @param {lokal storage key} key
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data.value);
}

function checkUserLogIn() {
  if (localStorage.getItem("currentUser")) return true;
  else return false;
}

function loadHeaderInitials() {
  const element = document.getElementById("header-initials-id");
  const initials = getFirstLettersOfName(currentUser.userName);
  element.innerHTML = templateHeaderInitialsMenu(initials);
}

function templateHeaderInitialsMenu(initials) {
  return /*html*/ `
          <span class="header-initials">${initials}</span>
    `;
}

async function loadUsersFromBackend(key) {
  const result = await getItem(key);
  return JSON.parse(result) || [];
}

async function addNewUserToBackend(user) {
  let existingUsers = await loadUsersFromBackend("users");
  existingUsers[user.userEMail] = user;
  await setItem("users", JSON.stringify(existingUsers));
  users = await loadUsersFromBackend("users");
}

function validateName(name, boolArr) {
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/0123456789]/;
  const checkForDoubleHyphen = name.split("-").length - 1;
  if (name.trim() === "") boolArr[0] = boolArr[10] = true;
  else if (specialCharRegex.test(name)) boolArr[2] = boolArr[10] = true;
  else if (name.length < 2 && checkForDoubleHyphen === 0) boolArr[1] = boolArr[10] = true;
  else if (checkForDoubleHyphen > 1) boolArr[14] = boolArr[10] = true;
  else if (
    checkForDoubleHyphen !== 0 &&
    (!name.match(/[a-zA-Z]-[a-zA-Z]{2,}/) || name.indexOf("-") < 2 || name.split("-").pop() === "")
  )
    boolArr[1] = boolArr[10] = true;
}

function validateRegisterEmail(email, boolArr) {
  const containsNumberOrSpecialChar = /[0-9!#$%^&*(),?":{}|<>]/.test(email);
  if (email.trim() === "") boolArr[3] = boolArr[11] = true;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) boolArr[4] = boolArr[11] = true;
  else if (email in users) boolArr[5] = boolArr[11] = true;
  else if (containsNumberOrSpecialChar) boolArr[4] = boolArr[11] = true;
}

function validatePassword(password, boolArr) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/.test(password);
  const hasDigit = /[0123456789]/.test(password);
  if (password.trim() === "") boolArr[6] = boolArr[12] = true;
  else if (!hasUpperCase || !hasSpecialChar || !hasDigit || password.length < 6)
    boolArr[7] = boolArr[12] = true;
}

function validateConfirmPassword(password, confirmPassword, boolArr) {
  if (confirmPassword.trim() === "") boolArr[8] = boolArr[13] = true;
  else if (password !== confirmPassword) boolArr[9] = boolArr[13] = true;
}

function validateLoginEmail(email) {
  return (
    email !== "" && email.includes("@") && email.indexOf("@") !== 0 && email.split("@").pop() !== ""
  );
}

function toggleVisibility(elementId, show = true, className = "d-none") {
  const element = document.getElementById(elementId);
  show ? element.classList.remove(className) : element.classList.add(className);
}

function isValueNotEmpty(passwordInput) {
  return passwordInput.trim().length !== 0;
}

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

function toggleScrollbar(value) {
  document.body.style.overflow = value;
}

function showLoader() {
  toggleVisibility("loader-id", true);
  toggleVisibility("loader-id", true, "loader-hidden");
}

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

async function updateCurrentUser(currentUser) {
  const existingUsers = await loadUsersFromBackend("users");
  existingUsers[currentUser.userEMail] = currentUser;
  await setItem("users", JSON.stringify(existingUsers));
}

function hideLoader() {
  toggleVisibility("loader-id", false, "loader-hidden");
}

function isColorLight(hexcode) {
  if (hexcode) {
    let r = parseInt(hexcode.slice(1, 3), 16);
    let g = parseInt(hexcode.slice(3, 5), 16);
    let b = parseInt(hexcode.slice(5), 16);
    var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return a < 0.5;
  } else return true;
}
