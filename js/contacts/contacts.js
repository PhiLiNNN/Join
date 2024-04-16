let currentUser;
let isUserLoggedIn;
let currentActive = -1;
let currentContact = -1;
let editContactOpen = false;
let editContactMenuOpen = false;
let allLetters = [];
let nameCheck;
let emailCheck;

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

function addNewContact() {
  const {nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode} = getUserInputs("ac");
  if (!contactsValidationCheck("ac")) return;
  initializedName = setValidNameInitialsToUpperCase(nameInputEl);
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

function closeAddNewContact() {
  const contactsElement = document.getElementById("all-contacts-id");
  contactsElement.style.overflow = "auto";
  toggleVisibility("ac-card-content-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("at-overlay-id", false);
    toggleScrollbar("auto");
  }, 300);
}

function openAddContactMenu() {
  toggleScrollbar("hidden");
  const element = document.getElementById("at-overlay-id");
  element.innerHTML = templateAddContactHTML();
  toggleVisibility("at-overlay-id", true);
  setTimeout(() => {
    toggleVisibility("ac-card-content-id", false, "card-visible");
  }, 30);
}

function closeAddNewContact() {
  const contactsElement = document.getElementById("all-contacts-id");
  contactsElement.style.overflow = "auto";
  toggleVisibility("ac-card-content-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("at-overlay-id", false);
    toggleScrollbar("auto");
  }, 300);
}

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

function showContactOverlay(element, name, email, phone, index, bgColor, txtColor, initials) {
  element.innerHTML = templateShowContact(name, email, phone, index, bgColor, txtColor, initials);
  element.classList.toggle("d-none");
}

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

function closeContact() {
  editContactMenuOpen = false;
  const element = document.getElementById("show-overlay-id");
  element.classList.toggle("d-none");
  toggleVisibility(`contact-${savedIndex}-id`, false, "selected-contact");
  toggleVisibility("edit-contact-id", false);
}

function openEditContactMenu() {
  editContactMenuOpen = true;
  toggleVisibility("ec-menu-id", true);
  const element = document.getElementById("ec-menu-id");
  element.innerHTML = templateEditContactMenu();
  const CircleElement = document.getElementById("edit-contact-id");
  const ImgElement = document.querySelector("#edit-contact-id img");
  setTimeout(() => {
    toggleVisibility("ec-menu-id", false, "ec-menu-visible");
  }, 30);
  document.addEventListener("click", function (event) {
    if (
      event.target !== element &&
      !element.contains(event.target) &&
      event.target !== CircleElement &&
      event.target !== ImgElement
    ) {
      toggleVisibility("ec-menu-id", true, "ec-menu-visible");
      setTimeout(() => {
        toggleVisibility("ec-menu-id", false);
      }, 300);
    }
  });
}

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

function closeEditContact() {
  editContactOpen = false;
  toggleVisibility("edit-card-content-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("edit-overlay-id", false);
  }, 300);
}

function saveEditContact() {
  const {nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode} = getUserInputs("ec");
  if (!contactsValidationCheck("ec")) return;
  const initials = getFirstLettersOfName(nameInputEl);
  initializedName = setValidNameInitialsToUpperCase(nameInputEl);
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
  currentUser.contacts[savedIndex] = newContact;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  allLetters = [];
  renderAllContacts();
  toggleVisibility(`contact-${savedIndex}-id`, false, "selected-contact");
  updateBackend(currentUser);
  closeEditContact();
}

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

function formatPhoneNumber(input) {
  // Prüfe, ob die Eingabe bereits mit '+49' beginnt
  if (!input.value.startsWith("+49")) {
    // Wenn nicht, füge '+49' am Anfang hinzu
    input.value = "+49" + input.value;
  }
}
