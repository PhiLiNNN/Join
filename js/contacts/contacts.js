let currentUser;
let currentActive = -1;
let currentContact = -1;
let editContactOpen = false;
let editContactMenuOpen = false;
let allLetters = [];

function contactsInit() {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
  renderAllContacts();
}

function pushAllNeededLetters() {
  currentUser.contacts.forEach((contact) => {
    if (allLetters.includes(contact.name[0].toUpperCase())) return;
    allLetters.push(contact.name[0].toUpperCase());
  });
  allLetters.sort();
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
          contact.email,
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

function getUserInputs() {
  const nameInputEl = document.getElementById("ac-name-input-id").value;
  const mailInputEl = document.getElementById("ac-mail-input-id").value;
  const phoneInputEl = document.getElementById("ac-phone-input-id").value;
  const colorCode = document.getElementById("ac-color-input-id").value;
  const textColorCode = isColorLight(colorCode) ? "white" : "black";
  return { nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode };
}

async function addNewContact() {
  const { nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode } =
    getUserInputs();
  const newContact = {
    name: nameInputEl,
    email: mailInputEl,
    phone: phoneInputEl,
    colorCode: colorCode,
    textColorCode: textColorCode,
  };
  currentUser.contacts.push(newContact);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  await updateBackend(currentUser);
  renderAllContacts();
  highlightActiveContact(currentUser.contacts.length - 1);
  if (window.innerWidth >= 1340) {
    const element = document.getElementById("show-overlay-id");
    const initials = getFirstLettersOfName(newContact.name);
    showOverlayForLargeViewport(
      element,
      newContact.name,
      newContact.email,
      newContact.phone,
      currentUser.contacts.length - 1,
      newContact.colorCode,
      newContact.textColorCode,
      initials
    );
  }
  closeAddNewContact();
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
  } else if (currentActive === index)
    element.classList.toggle("selected-contact");
}

function closeAddNewContact() {
  const contactsElement = document.getElementById("all-contacts-id");
  contactsElement.style.overflow = "auto";
  toggleVisibility("ac-card-content-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("ad-overlay-id", false);
    toggleScrollbar("auto");
  }, 300);
}

function openAddContactMenu() {
  toggleScrollbar("hidden");
  const element = document.getElementById("ad-overlay-id");
  const contactsElement = document.getElementById("all-contacts-id");
  contactsElement.style.overflow = "hidden";
  element.innerHTML = templateAddContactHTML();
  toggleVisibility("ad-overlay-id", true);
  setTimeout(() => {
    toggleVisibility("ac-card-content-id", false, "card-visible");
  }, 30);
}

function closeAddNewContact() {
  const contactsElement = document.getElementById("all-contacts-id");
  contactsElement.style.overflow = "auto";
  toggleVisibility("ac-card-content-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("ad-overlay-id", false);
    toggleScrollbar("auto");
  }, 300);
}

function openContact(name, email, phone, index, bgColor, txtColor, initials) {
  highlightActiveContact(index);
  toggleScrollbar("hidden");
  let viewportWidth = window.innerWidth;
  const element = document.getElementById("show-overlay-id");
  toggleVisibility("edit-contact-id", true);
  if (viewportWidth < 1340) {
    showContactOverlay(
      element,
      name,
      email,
      phone,
      index,
      bgColor,
      txtColor,
      initials
    );
  } else
    showOverlayForLargeViewport(
      element,
      name,
      email,
      phone,
      index,
      bgColor,
      txtColor,
      initials
    );
  currentContact = index;
}

function showContactOverlay(
  element,
  name,
  email,
  phone,
  index,
  bgColor,
  txtColor,
  initials
) {
  element.innerHTML = templateShowContact(
    name,
    email,
    phone,
    index,
    bgColor,
    txtColor,
    initials
  );
  element.classList.toggle("d-none");
}

function showOverlayForLargeViewport(
  element,
  name,
  email,
  phone,
  index,
  bgColor,
  txtColor,
  initials
) {
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
}

function closeEditContact() {
  editContactOpen = false;
  toggleVisibility("edit-card-content-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("edit-overlay-id", false);
  }, 300);
}

async function saveEditContact() {
  const { nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode } =
    getUserInputs();
  const initials = getFirstLettersOfName(nameInputEl);
  const element = document.getElementById("show-overlay-id");
  element.innerHTML = templateShowContact(
    nameInputEl,
    mailInputEl,
    phoneInputEl,
    savedIndex,
    colorCode,
    textColorCode,
    initials
  );
  const newContact = {
    name: nameInputEl,
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
  await updateBackend(currentUser);
  closeEditContact();
}

async function deleteContact() {
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
  await updateBackend(currentUser);
  renderAllContacts();
}
