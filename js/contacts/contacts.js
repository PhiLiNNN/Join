let isUserLoggedIn;
let currentActive = -1;
let currentContact = -1;
let editContactOpen = false;
let editContactMenuOpen = false;
let allLetters = [];
let nameCheck;
let emailCheck;
let contacts;

/**
 * Initializes the contacts page.
 * It sets the favicon, checks if the user is logged in,
 * and redirects to the error page if not logged in.
 * Otherwise, it retrieves the current user data,
 * renders all contacts, and sets up the visibility of page elements.
 */
async function contactsInit() {
  setFavicon();
  isUserLoggedIn = checkUserLogInOLD();
  if (!isUserLoggedIn) window.location.assign("./error_page.html");
  // currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const contacts = await getItem(CONTACTS_API_URL);
  renderAllContacts(contacts);
  toggleVisibility("contacts-menu-id", false, "highlight-menu");
  toggleVisibility("contacts-body-id", true);
  // loadHeaderInitials();
}

/**
 * Renders all contacts on the page.
 */
function renderAllContacts(contacts) {
  pushAllNeededLetters(contacts);
  let element = document.getElementById("all-contacts-content-id");
  element.innerHTML = "";
  allLetters.forEach((letter) => {
    element.innerHTML += templateCreateLettersHTML(letter);
    let letterElement = document.getElementById(`letter-${letter}-id`);
    contacts.forEach((contact) => {
      if (letter === contact.name[0].toUpperCase()) {
        letterElement.innerHTML += templateCreateContactsHTML(
          contact.name,
          contact.email.toLowerCase(),
          contact.phone,
          contact.colorCode,
          contact.textColorCode,
          contact.initials,
          contact.id
        );
      }
    });
  });
}

async function addNewContact() {
  const userInput = getUserInputs("ac");
  const validContact = prepareContact(userInput);
  if (!(await contactsValidationCheck("ac"))) return;
  const createdContact = await setItem(validContact, CONTACTS_API_URL);
  await updateUIAfterContactAdd(createdContact);
  closeAddNewContact();
  sendSuccessMsg();
}

function prepareContact({nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode}) {
  const initializedName = setValidNameInItialsToUpperCase(nameInputEl);
  const initials = getFirstLettersOfName(initializedName);
  return {
    name: initializedName,
    email: mailInputEl,
    phone: phoneInputEl,
    colorCode: colorCode,
    textColorCode: textColorCode,
    initials: initials,
  };
}

async function updateUIAfterContactAdd(newContact) {
  try {
    const contacts = await getItem(CONTACTS_API_URL);
    renderAllContacts(contacts);
    highlightActiveContact(newContact.id);
    handleScreenMode(newContact);
  } catch (error) {
    console.error("Error updating contacts UI:", error);
  }
}

/**
 * Displays a success message after adding a new contact.
 */
function sendSuccessMsg() {
  toggleScrollbar("hidden");
  toggleVisibility("contacts-success-msg-id", true);
  setTimeout(() => {
    toggleVisibility("contacts-success-msg-id", false, "slide-sm");
    setTimeout(() => {
      toggleVisibility("contacts-success-msg-id", true, "slide-sm");
    }, 900);
  }, 600);
  setTimeout(() => {
    toggleVisibility("contacts-success-msg-id", false);
  }, 2000);
}

/**
 * Handles the screen mode based on the viewport width and opens the contact accordingly.
 * @param {Object} newCon - The newly added contact.
 */
function handleScreenMode(newCon) {
  const initials = getFirstLettersOfName(newCon.name);

  if (window.innerWidth < 1340) {
    openContact(newCon.name, newCon.email, newCon.phone, newCon.id, newCon.colorCode, newCon.textColorCode, initials);
  } else {
    const element = document.getElementById("show-overlay-id");
    showDesktopOverlay(
      element,
      newCon.name,
      newCon.email,
      newCon.phone,
      newCon.id,
      newCon.colorCode,
      newCon.textColorCode,
      initials
    );
  }
}

/**
 * Opens a contact overlay.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {number} index - The index of the contact.
 * @param {string} bgColor - The background color of the contact.
 * @param {string} txtColor - The text color of the contact.
 * @param {string} initials - The initials of the contact.
 */
function openContact(name, email, phone, contactID, bgColor, txtColor, initials) {
  highlightActiveContact(contactID);
  toggleScrollbar("hidden");
  let viewportWidth = window.innerWidth;
  const element = document.getElementById("show-overlay-id");
  toggleVisibility("edit-contact-id", true);
  if (viewportWidth < 1340) showContactOverlay(element, name, email, phone, contactID, bgColor, txtColor, initials);
  else showDesktopOverlay(element, name, email, phone, contactID, bgColor, txtColor, initials);
  currentContact = contactID;
}

/**
 * Highlights the active contact by toggling the "selected-contact" class.
 * @param {string} indexString - The index of the contact as a string.
 */
function highlightActiveContact(indexString) {
  const index = +indexString;
  const element = document.getElementById(`contact-${index}-id`);
  if (currentActive !== index && currentActive !== -1) {
    toggleVisibility(`contact-${currentActive}-id`, true, "selected-contact");
    toggleVisibility(`contact-${index}-id`, false, "selected-contact");
    currentActive = index;
  } else if (currentActive === -1) {
    toggleVisibility(`contact-${index}-id`, false, "selected-contact");
    currentActive = index;
  } else if (currentActive === index) element.classList.toggle("selected-contact");
}

/**
 * Closes the "Add New Contact" form and restores the scrollbar.
 */
function closeAddNewContact() {
  const contactsElement = document.getElementById("all-contacts-id");
  contactsElement.style.overflow = "auto";
  toggleVisibility("ac-card-content-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("at-overlay-id", false);
    toggleScrollbar("auto");
  }, 300);
}

/**
 * Closes the contact overlay and hides the edit contact menu.
 */
function closeContact(contactId) {
  editContactMenuOpen = false;
  const element = document.getElementById("show-overlay-id");
  element.classList.toggle("d-none");
  const elementId = document.getElementById(`contact-${contactId}-id`);
  if (elementId) toggleVisibility(`contact-${contactId}-id`, false, "selected-contact");
  toggleVisibility("edit-contact-id", false);
}

/**
 * Opens the "Add New Contact" form overlay and hides the scrollbar.
 */
function openAddContactMenu() {
  toggleScrollbar("hidden");
  const element = document.getElementById("at-overlay-id");
  element.innerHTML = templateAddContactHTML();
  toggleVisibility("at-overlay-id", true);
  setTimeout(() => {
    toggleVisibility("ac-card-content-id", false, "card-visible");
  }, 30);
}

/**
 * Shows the contact overlay on smaller screens for displaying contact details.
 * @param {HTMLElement} element - The HTML element to display the contact overlay in.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {number} contactId - The index of the contact.
 * @param {string} bgColor - The background color of the contact.
 * @param {string} txtColor - The text color of the contact.
 * @param {string} initials - The initials of the contact.
 */
function showContactOverlay(element, name, email, phone, contactId, bgColor, txtColor, initials) {
  element.innerHTML = templateShowContact(name, email, phone, contactId, bgColor, txtColor, initials);
  element.classList.toggle("d-none");
}

/**
 * Shows the desktop contact overlay for displaying contact details.
 * @param {HTMLElement} element - The HTML element to display the desktop overlay in.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {number} contactId - The index of the contact.
 * @param {string} bgColor - The background color of the contact.
 * @param {string} txtColor - The text color of the contact.
 * @param {string} initials - The initials of the contact.
 */
function showDesktopOverlay(element, name, email, phone, contactId, bgColor, txtColor, initials) {
  toggleVisibility("show-overlay-id", true);
  const clickedElement = document.getElementById(`contact-${contactId}-id`);
  if (clickedElement.classList.contains("selected-contact")) {
    toggleVisibility("show-overlay-id", true, "show-card-visible");
    setTimeout(() => {
      element.innerHTML = templateShowContact(name, email, phone, contactId, bgColor, txtColor, initials);
      toggleVisibility("show-overlay-id", false, "show-card-visible");
    }, 300);
  } else {
    toggleVisibility("show-overlay-id", true, "show-card-visible");
    setTimeout(() => {
      toggleVisibility("show-overlay-id", false);
    }, 300);
  }
}

/**
 * Opens the edit contact menu and displays it.
 */
function openEditContactMenu() {
  editContactMenuOpen = true;
  const element = document.getElementById("ec-menu-id");
  element.innerHTML = templateEditContactMenu();
  toggleVisibility("ec-menu-id", true);
  setTimeout(() => {
    toggleVisibility("ec-menu-id", false, "ec-menu-visible");
  }, 30);
  handlerClickEventsToToggleMenu(element);
}

/**
 * Opens the edit contact menu and initializes its content.
 */
function editContact() {
  editContactOpen = true;
  const element = document.getElementById("edit-overlay-id");
  element.innerHTML = templateEditContactHTML();
  toggleVisibility("edit-overlay-id", true);
  setTimeout(() => {
    toggleVisibility("edit-card-content-id", false, "card-visible");
  }, 30);
  const nameInputEl = document.getElementById(`ec-name-input-id`).value;
  const mailInputEl = document.getElementById(`ec-mail-input-id`).value;
  nameCheck = nameInputEl;
  emailCheck = mailInputEl;
}

/**
 * Closes the edit contact menu.
 */
function closeEditContact() {
  editContactOpen = false;
  toggleVisibility("edit-card-content-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("edit-overlay-id", false);
  }, 300);
}

/**
 * Saves the edited contact details, updates the contact data, renders all contacts, highlightS the selected contact,
 * updates the backend, local storage and closes the edit contact menu.
 */
async function saveContact() {
  const {nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode} = getUserInputs("ec");
  if (!(await contactsValidationCheck("ec", savedContactId))) return;
  const initials = getFirstLettersOfName(nameInputEl);
  initializedName = setValidNameInItialsToUpperCase(nameInputEl);
  const element = document.getElementById("show-overlay-id");
  element.innerHTML = templateShowContact(
    initializedName,
    mailInputEl,
    phoneInputEl,
    savedContactId,
    colorCode,
    textColorCode,
    initials
  );
  const updatedContact = {
    name: initializedName,
    email: mailInputEl,
    phone: phoneInputEl,
    colorCode: colorCode,
    textColorCode: textColorCode,
    initials: initials,
  };
  const success = await updateContact(updatedContact);
  if (success) {
    const contacts = await getItem(CONTACTS_API_URL);
    allLetters = [];
    renderAllContacts(contacts);
    toggleVisibility(`contact-${savedContactId}-id`, false, "selected-contact");
  }

  closeEditContact();
}

/**
 * Updates the UI after a change (e.g., a contact is deleted).
 * Fetches the latest contact list and re-renders the UI.
 * Logs an error to the console if the update fails.
 */
async function updateContactsUI(contactId) {
  try {
    const contacts = await getItem(CONTACTS_API_URL);
    allLetters = [];
    renderAllContacts(contacts);
    resetContactUIState(contactId);
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Kontakte:", error);
  }
}

/**
 * Resets the contact UI to its initial state.
 * Hides overlays, clears contact-specific states, and resets visibility flags.
 */
function resetContactUIState(contactId) {
  toggleVisibility("show-overlay-id", true, "show-card-visible");
  currentActive = -1;
  if (editContactOpen) closeEditContact();
  if (editContactMenuOpen) {
    toggleVisibility("ec-menu-id", true, "ec-menu-visible");
    setTimeout(() => toggleVisibility("ec-menu-id", false), 300);
  }

  closeContact(contactId);
}

/**
 * Handler for deleting a contact.
 * Coordinates the deletion process and UI updates.
 * @param {number} contactId - The ID of the contact to delete.
 * Displays an alert if the deletion fails.
 */
async function handleDeleteContact(contactId) {
  const success = await deleteContact(contactId);
  if (success) await updateContactsUI(contactId);
  else console.log("Der Kontakt konnte nicht gelöscht werden.");
}
