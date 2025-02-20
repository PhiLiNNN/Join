/**
 * Pushes all unique initial letters of contacts' names to the array "allLetters", ensuring they are sorted alphabetically.
 */
async function pushAllNeededLetters(contacts) {
  contacts.forEach((contact) => {
    if (allLetters.includes(contact.name[0].toUpperCase())) return;
    allLetters.push(contact.name[0].toUpperCase());
  });
  allLetters.sort();
}

/**
 * Retrieves user inputs from input fields based on the given prefix string.
 * @param {string} string - The prefix string used to identify input fields (e.g., "add-contact: 'ec'" for "add contact: 'ac'").
 * @returns {Object} An object containing user inputs for name, email, phone, color code, and text color code.
 */
function getUserInputs(string) {
  const nameInputEl = document.getElementById(`${string}-name-input-id`).value;
  const mailInputEl = document.getElementById(`${string}-mail-input-id`).value;
  const phoneInputEl = document.getElementById(`${string}-phone-input-id`).value;
  const colorCode = document.getElementById(`${string}-color-input-id`).value;
  const textColorCode = isColorLight(colorCode) ? "white" : "black";
  return {nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode};
}

/**
 * Performs validation checks for the contact fields.
 * @param {string} string - The prefix string to identify the contact fields.
 * @returns {boolean} Returns true if all fields pass validation; otherwise, false.
 */
async function contactsValidationCheck(string, contactId = null) {
  const TOTAL_VALIDATION_FLAGS = 13;
  const nameInputEl = document.getElementById(`${string}-name-input-id`).value;
  const mailInputEl = document.getElementById(`${string}-mail-input-id`).value;
  const phoneInputEl = document.getElementById(`${string}-phone-input-id`).value;
  const boolArr = Array(TOTAL_VALIDATION_FLAGS).fill(false);
  validateContactName(nameInputEl, boolArr);
  await validateContactEmail(mailInputEl.toLowerCase(), boolArr, contactId);
  validateContactPhone(phoneInputEl, boolArr);
  return handlerFieldValidationContact(string, boolArr);
}

/**
 * Handles field validation for the contact form.
 * @param {string} string - The prefix string to identify the contact fields.
 * @param {boolean[]} boolArr - An array containing validation flags (error  messages and red border of the input  fields).
 * @returns {boolean} Returns true if all fields pass validation; otherwise, false.
 */
function handlerFieldValidationContact(string, boolArr) {
  toggleVisibility(`${string}-empty-name-id`, boolArr[0]);
  toggleVisibility(`${string}-invalid-name-id`, boolArr[1]);
  toggleVisibility(`${string}-no-special-chars-id`, boolArr[2]);
  toggleVisibility(`${string}-hyphens-name-id`, boolArr[3]);
  toggleVisibility(`${string}-empty-email-id`, boolArr[4]);
  toggleVisibility(`${string}-invalid-email-id`, boolArr[5]);
  toggleVisibility(`${string}-existing-email-id`, boolArr[6]);
  toggleVisibility(`${string}-empty-phone-id`, boolArr[7]);
  toggleVisibility(`${string}-invalid-phone-id`, boolArr[8]);
  toggleVisibility(`${string}-name-border-id`, !boolArr[9], "error-border");
  toggleVisibility(`${string}-mail-border-id`, !boolArr[10], "error-border");
  toggleVisibility(`${string}-phone-border-id`, !boolArr[11], "error-border");
  toggleVisibility(`${string}-spaces-name-id`, boolArr[12]);
  return !boolArr.some(Boolean);
}

/**
 * Validates the phone number entered in the contact form.
 * @param {string} number - The phone number to validate.
 * @param {boolean[]} boolArr - An array containing validation flags.
 */
function validateContactPhone(number, boolArr) {
  if (number.trim() === "") boolArr[7] = boolArr[11] = true;
  else if (number.length < 3) boolArr[8] = boolArr[11] = true;
}

/**
 * Validates the email entered in the contact form.
 * @param {string} email - The email address to validate.
 * @param {boolean[]} boolArr - An array containing validation flags.
 * @param {number|null} currentId - The ID of the contact to update. Use `null` for new contacts.
 */
async function validateContactEmail(email, boolArr, currentId) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailExists = await checkEmailExistence(email);
  if (!emailRegex.test(email)) boolArr[10] = boolArr[5] = true;
  if (email.trim() === "") boolArr[4] = boolArr[10] = true;
  if (emailExists) boolArr[6] = boolArr[10] = true;
  if (currentId !== null) {
    const existingContact = await getContactById(currentId);
    if (existingContact && existingContact.email === email) boolArr[6] = boolArr[10] = false;
  }
}

/**
 * Checks whether an email already exists in the database.
 * @param {string} email - The email to check.
 * @returns {boolean} - True if the email exists, false otherwise.
 */
async function checkEmailExistence(email) {
  const response = await fetch(`${CONTACTS_EMAIL_API_URL}?email=${email}`);
  const data = await response.json();
  if (data.doesExist) return true;
  else return false;
}

async function getContactById(contactId) {
  const response = await fetch(`${CONTACTS_API_URL}${contactId}/`);
  const data = await response.json();
  return data;
}

/**
 * Validates the name entered in the contact form.
 * @param {string} name - The name to validate.
 * @param {boolean[]} boolArr - An array containing validation flags.
 */
function validateContactName(name, boolArr) {
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/0123456789]/;
  const checkForDoubleHyphen = name.split("-").length - 1;
  const checkForMultipleSpaces = name.split(" ").length - 1;
  if (name === nameCheck) return;
  if (name.trim() === "") boolArr[0] = boolArr[9] = true;
  else if (specialCharRegex.test(name)) boolArr[2] = boolArr[9] = true;
  else if (name.length < 2 && checkForDoubleHyphen === 0) boolArr[1] = boolArr[9] = true;
  else if (checkForDoubleHyphen > 1) boolArr[3] = boolArr[9] = true;
  else if (checkForMultipleSpaces > 1) boolArr[12] = boolArr[9] = true;
  else if (
    checkForDoubleHyphen !== 0 &&
    (!name.match(/[a-zA-Z]-[a-zA-Z]{2,}/) || name.indexOf("-") < 2 || name.split("-").pop() === "")
  )
    boolArr[1] = boolArr[10] = true;
}

/**
 * Attaches click event listeners to toggle the edit contact menu visibility.
 * @param {HTMLElement} element - The HTML element of the edit contact menu.
 */
function handlerClickEventsToToggleMenu(element) {
  const circleElement = document.getElementById("edit-contact-id");
  const imgElement = document.querySelector("#edit-contact-id img");
  document.addEventListener("click", function (event) {
    if (
      event.target !== element &&
      !element.contains(event.target) &&
      event.target !== circleElement &&
      event.target !== imgElement
    ) {
      toggleVisibility("ec-menu-id", true, "ec-menu-visible");
      setTimeout(() => {
        toggleVisibility("ec-menu-id", false);
      }, 300);
    }
  });
}
