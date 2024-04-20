let currentUser;
let isUserLoggedIn;
let currentActive = -1;
let currentContact = -1;
let editContactOpen = false;
let editContactMenuOpen = false;
let allLetters = [];
let nameCheck;
let emailCheck;

/**
 * Initializes the contacts page.
 * It sets the favicon, checks if the user is logged in,
 * and redirects to the error page if not logged in.
 * Otherwise, it retrieves the current user data,
 * renders all contacts, and sets up the visibility of page elements.
 */
function contactsInit() {
  setFavicon();
  isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) window.location.assign("./error_page.html");
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  renderAllContacts();
  toggleVisibility("contacts-menu-id", false, "highlight-menu");
  toggleVisibility("contacts-body-id", true);
  loadHeaderInitials();
}

/**
 * Renders all contacts on the page.
 */
function renderAllContacts() {
  pushAllNeededLetters();
  let element = document.getElementById("all-contacts-content-id");
  element.innerHTML = "";
  allLetters.forEach((letter) => {
    element.innerHTML += templateCreateLettersHTML(letter);
    let letterElement = document.getElementById(`letter-${letter}-id`);
    currentUser.contacts.forEach((contact, index) => {
      if (letter === contact.name[0].toUpperCase()) {
        const initials = getFirstLettersOfName(contact.name);
        letterElement.innerHTML += templateCreateContactsHTML(
          contact.name,
          contact.email.toLowerCase(),
          contact.phone,
          contact.colorCode,
          contact.textColorCode,
          initials,
          index
        );
      }
    });
  });
}

/**
 * Adds a new contact to the user's contacts list.
 */
function addNewContact() {
  const {nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode} = getUserInputs("ac");
  if (!contactsValidationCheck("ac")) return;
  initializedName = setValidNameInItialsToUpperCase(nameInputEl);
  const newCon = {
    name: initializedName,
    email: mailInputEl,
    phone: phoneInputEl,
    colorCode: colorCode,
    textColorCode: textColorCode,
  };
  currentUser.contacts.push(newCon);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  updateBackend(currentUser);
  renderAllContacts();
  highlightActiveContact(currentUser.contacts.length - 1);
  handleScreenMode(newCon);
  closeAddNewContact();
  sendSuccsessMsg();
}

/**
 * Displays a success message after adding a new contact.
 */
function sendSuccsessMsg() {
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
    openContact(
      newCon.name,
      newCon.email,
      newCon.phone,
      currentUser.contacts.length - 1,
      newCon.colorCode,
      newCon.textColorCode,
      initials
    );
  } else {
    const element = document.getElementById("show-overlay-id");
    showDesktopOverlay(
      element,
      newCon.name,
      newCon.email,
      newCon.phone,
      currentUser.contacts.length - 1,
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
function openContact(name, email, phone, index, bgColor, txtColor, initials) {
  highlightActiveContact(index);
  toggleScrollbar("hidden");
  let viewportWidth = window.innerWidth;
  const element = document.getElementById("show-overlay-id");
  toggleVisibility("edit-contact-id", true);
  if (viewportWidth < 1340)
    showContactOverlay(element, name, email, phone, index, bgColor, txtColor, initials);
  else showDesktopOverlay(element, name, email, phone, index, bgColor, txtColor, initials);
  currentContact = index;
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
function closeContact() {
  editContactMenuOpen = false;
  const element = document.getElementById("show-overlay-id");
  element.classList.toggle("d-none");
  toggleVisibility(`contact-${savedIndex}-id`, false, "selected-contact");
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
 * @param {number} index - The index of the contact.
 * @param {string} bgColor - The background color of the contact.
 * @param {string} txtColor - The text color of the contact.
 * @param {string} initials - The initials of the contact.
 */
function showContactOverlay(element, name, email, phone, index, bgColor, txtColor, initials) {
  element.innerHTML = templateShowContact(name, email, phone, index, bgColor, txtColor, initials);
  element.classList.toggle("d-none");
}

/**
 * Shows the desktop contact overlay for displaying contact details.
 * @param {HTMLElement} element - The HTML element to display the desktop overlay in.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {number} index - The index of the contact.
 * @param {string} bgColor - The background color of the contact.
 * @param {string} txtColor - The text color of the contact.
 * @param {string} initials - The initials of the contact.
 */
function showDesktopOverlay(element, name, email, phone, index, bgColor, txtColor, initials) {
  toggleVisibility("show-overlay-id", true);
  const clickedElement = document.getElementById(`contact-${index}-id`);
  if (clickedElement.classList.contains("selected-contact")) {
    toggleVisibility("show-overlay-id", true, "show-card-visible");
    setTimeout(() => {
      element.innerHTML = templateShowContact(
        name,
        email,
        phone,
        index,
        bgColor,
        txtColor,
        initials
      );
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
function saveEditContact() {
  const {nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode} = getUserInputs("ec");
  if (!contactsValidationCheck("ec")) return;
  const initials = getFirstLettersOfName(nameInputEl);
  initializedName = setValidNameInItialsToUpperCase(nameInputEl);
  const element = document.getElementById("show-overlay-id");
  element.innerHTML = templateShowContact(
    initializedName,
    mailInputEl,
    phoneInputEl,
    savedIndex,
    colorCode,
    textColorCode,
    initials
  );
  const newContact = {
    name: initializedName,
    email: mailInputEl,
    phone: phoneInputEl,
    colorCode: colorCode,
    textColorCode: textColorCode,
  };
  updateContactData(newContact);
  renderAllContacts();
  toggleVisibility(`contact-${savedIndex}-id`, false, "selected-contact");
  updateBackend(currentUser);
  closeEditContact();
}

/**
 * Updates the contact data with the new contact details, saves it to local storage, and resets the array containing the initial letters of contacts' names.
 * @param {Object} newContact - The updated contact details.
 */
function updateContactData(newContact) {
  currentUser.contacts[savedIndex] = newContact;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  allLetters = [];
}

/**
 * Deletes the selected user, updates the backend, local storage and closes the Overlay.
 */
function deleteContact() {
  toggleVisibility("show-overlay-id", true, "show-card-visible");
  currentUser.contacts.splice(savedIndex, 1);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  allLetters = [];
  currentActive = -1;
  if (editContactOpen) closeEditContact();
  if (editContactMenuOpen) {
    toggleVisibility("ec-menu-id", true, "ec-menu-visible");
    setTimeout(() => {
      toggleVisibility("ec-menu-id", false);
    }, 300);
  }
  closeContact();
  updateBackend(currentUser);
  renderAllContacts();
}
