// Render contacts mobile view

if (window.location.pathname === '/contacts.html') {
  window.addEventListener('resize', contactsInit);
} else {
  window.removeEventListener('resize', contactsInit);
}
window.onload = contactsInit;


function contactsInit() {
    const maxWidth = 759;    
    if (window.innerWidth <= maxWidth) {
        setTimeout(showHeaderAndFooter, 250);
        renderContacts();
        renderAddContactButtonMobile();               
        document.body.style.overflow = 'auto';
        const content = document.getElementById("all-contacts-id");
        content.style.paddingTop = '100px';
        content.style.paddingBottom = '60px';
    } else {
        setTimeout(showHeaderAndFooter, 250);
        renderContactsDesktop();
    }
}


async function renderContacts() {
    const content = document.getElementById("all-contacts-id");
    content.innerHTML = "";
    const contactsByFirstLetter = {};
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if (loggedInUser && loggedInUser.contacts) {      
        loggedInUser.contacts.sort((a, b) => a.name.localeCompare(b.name));
        loggedInUser.contacts.forEach((oneContact) => {
            const firstLetter = oneContact.name.charAt(0).toUpperCase();
            updateContactsByFirstLetter(contactsByFirstLetter, firstLetter, oneContact);
        });      
        renderContactsByFirstLetter(content, contactsByFirstLetter);
        registerContactClickHandlers();
    } else {
        console.error('Error: User or contacts not found.');
    }
}


function updateContactsByFirstLetter(contactsByFirstLetter, firstLetter, oneContact) {
    if (!contactsByFirstLetter[firstLetter]) {
      contactsByFirstLetter[firstLetter] = createLetterAndContactsContainer(firstLetter);
    }
    const oneContactContainer = createOneContactContainer(oneContact);
    contactsByFirstLetter[firstLetter].querySelector('.contacts-list').appendChild(oneContactContainer);
}


function createLetterAndContactsContainer(firstLetter) {
    const container = document.createElement('div');
    container.classList.add('letterAndContactsContainer');
    container.innerHTML = `
      <div class="letter-column">
        <h2 class="contact-first-letter">${firstLetter}</h2>
        <div class="contacts-list"></div>
      </div>
    `;
    return container;
}


function createOneContactContainer(oneContact) {
  const container = document.createElement('div');
  container.classList.add('oneContactContainer');
  container.setAttribute('onclick', `showContactOverlayMobile('${oneContact.id}')`);  
  const iconHtml = renderSingleMemberToHTMLMobile(oneContact, oneContact.colorCode, oneContact.textColorCode);
  container.innerHTML = `
    <div class="contact-info-container">
      <div>
        ${iconHtml}
      </div>
      <div>
        <h2 class="oneContactContainerH2Mobile">${oneContact.name}</h2>
        <a class="oneContactContainerAElement">${oneContact.email}</a>
      </div>
    </div>
  `;
  return container;
}


function renderContactsByFirstLetter(content, contactsByFirstLetter) {
    for (const letter in contactsByFirstLetter) {
      content.appendChild(contactsByFirstLetter[letter]);
    }
}


function registerContactClickHandlers() {
    const contactContainers = document.querySelectorAll('.oneContactContainer');
    contactContainers.forEach(container => {
        const contactId = container.getAttribute('data-contact-id');
        container.addEventListener('click', () => showContactOverlayMobile(contactId));
    });
}
  
  
function renderAddContactButtonMobile() {
    let addContactButtonMobile = document.getElementById(`all-contacts-id`);
    addContactButtonMobile.innerHTML += `
      <div>
        <img class="addContactButtonImgMobile" src="../assets/img/contacts/addContactButtonMobile.svg" alt="createContactButton" onclick="addContactScreenMobile()"></img>
      </div>
      `
}

function hideAddContactButtonMobile() {
    let addContactButtonMobile = document.querySelectorAll(`addContactButtonImgMobile`);    
    addContactButtonMobile.classList.add('displayNone');
}


function showAddContactButtonMobile() {
    let addContactButtonMobile = document.querySelectorAll(`addContactButtonImgMobile`);    
    addContactButtonMobile.classList.remove('displayNone');
}


function renderSingleMemberToHTMLMobile(oneContact, colorCode, textColor) {
    return `
      <div class="openContactUserImgMobile" style="background-color: ${colorCode}; color: ${textColor};">
        ${getFirstLettersOfName(oneContact.name)}
      </div>
    `;
}
  
  
function getFirstLettersOfName(name) {
  let words = name.split(" ");
  switch (words.length) {
    case 1:
      return words[0].slice(0, 2).toUpperCase();
    case 2:
      return (words[0][0] + words[1][0]).toUpperCase();
    default:
      return (words[0][0] + words[1][0]).toUpperCase();
  }
}
  
  
function isColorLight(hexcode) {
    if (hexcode) {
      let r = parseInt(hexcode.slice(1, 3), 16);
      let g = parseInt(hexcode.slice(3, 5), 16);
      let b = parseInt(hexcode.slice(5), 16);
      var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return a < 0.5;
    } else {
      return true;
    }
}
  
  
function getRandomColorHex() {
    let colorHex = "#";
    let colorVal;
    for (let i = 0; i < 3; i++) {
      colorVal = Math.floor(Math.random() * 255).toString(16);
      if (colorVal.length == 1) colorVal = "0" + colorVal;
      colorHex += colorVal;
    }
    return colorHex;
}


/**
  * Hide header and footer for edit contact and create contact screen on mobile view
  */
function hideHeaderAndFooter() {
    const mobileHeader = document.querySelector(".header"); 
    const menuTemplate = document.querySelector(".footer");
    mobileHeader.style.display = "none";
    menuTemplate.style.display = "none";
}
  
  
/**
  * Show header and footer screen on mobile view
  */
function showHeaderAndFooter() {
  const mobileHeader = document.querySelector(".header");
  const menuTemplate = document.querySelector(".footer");
  mobileHeader.style.display = "block";
  menuTemplate.style.display = "flex";
}

// Add contact screen

function addContactScreenMobile() {
    const content = document.getElementById("all-contacts-id");
    content.innerHTML = addContactFormMobileHTML();
    content.style.paddingTop = '0px';
    document.body.style.overflow = 'hidden';
    hideHeaderAndFooter();
}


function redirectToContacts() {
    window.location.assign("../contacts.html");
}


// Add new contact

async function createContactMobile() {
    const currentUser = getLoggedInUser();
    if (!currentUser) {
        console.error("No user logged in.");
        return;
    }    
    const newContact = getNewContact();
    newContact.id = generateUniqueID();    
    addContactToCurrentUser(newContact);
    contactsInit();
}


function getNewContact() {
    const contactName = document.getElementById("add-contact-input-name-mobile-id").value;
    const contactEmail = document.getElementById("add-contact-input-mail-addresss-mobile-id").value;
    const contactPhone = document.getElementById("add-contact-input-phone-mobile-id").value;
    return { name: contactName, email: contactEmail, phone: contactPhone };
}


async function addContactToCurrentUser(newContact) {
  const currentUser = getLoggedInUser();
  if (!currentUser) {
      console.error("Logged in user not found.");
      return;
  }
  newContact.id = generateUniqueID();  
  let colorCode = localStorage.getItem(`color_${newContact.id}`);
  let textColorCode = localStorage.getItem(`textColor_${newContact.id}`);
  if (!colorCode || !textColorCode) {      
      colorCode = getRandomColorHex();
      textColorCode = isColorLight(colorCode) ? 'white' : 'black';
  }  
  newContact.colorCode = colorCode;
  newContact.textColorCode = textColorCode;
  currentUser.contacts.push(newContact);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateCurrentUserInBackend(currentUser)
}


function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}


function generateUniqueID() {
    let id;
    const currentUser = getLoggedInUser();
    const usersArray = currentUser ? [currentUser] : [];
    do {
        id = generateRandomID();
    } while (usersArray.some(user => user.contacts && user.contacts.some(contact => contact.id === id)));
    return id;
}


function generateRandomID() {    
    return Math.random().toString(36).substring(2, 11);
}


async function updateCurrentUserInBackend(currentUser) {
    try {        
        const existingUsers = await loadUsersFromBackend('users');        
        if (!(currentUser.userEMail in existingUsers)) {            
            return;
        }        
        existingUsers[currentUser.userEMail] = currentUser;        
        await setItem('users', JSON.stringify(existingUsers));        
    } catch (error) {
        console.error("Error updating current user in backend:", error);
    }
}


// Open contact overlay mobile

function showContactOverlayMobile(contactId) {    
    const content = document.getElementById('all-contacts-id');
    content.innerHTML = "";
    const selectedContact = findSelectedContact(contactId);
    if (!selectedContact) {
        handleContactNotFound();
        return;
    }
    const overlayContent = createContactOverlayContent(selectedContact);
    openOverlay(overlayContent);
    setupContactScreen();    
}


function findSelectedContact(contactId) {
    const loggedInUser = getLoggedInUser();    
    if (!loggedInUser) {
      console.error("No logged in user found.");
      return null;
    }
    return loggedInUser.contacts.find(contact => contact.id === contactId);
}


function handleContactNotFound() {
    console.error("Selected contact not found in current user's contacts.");
}


function createContactOverlayContent(selectedContact) {
    return `
    <div class="openContactContainerHeader">                            
        <div class="openContactBlockHeader">
            <div>
                <p class="openContactH1">Contacts</p>
                <p class="openContactText">Better with a team!</p>                              
                <img class="addContactBlueStroked" src="../assets/img/contacts/addContactBlueStroked.svg" alt="">                                                                        
            </div>
            <div class="arrorLeftContainer">
                <div onclick="contactsInit()">
                    <img src="../assets/img/contacts/arrow-left-line.svg" alt="">
                </div>
            </div>                                                                
        </div>                    
    </div>  
    <div class="openContactContainerFooter">
        <div class="openContactUserImageAndNameContainer">
            ${singleMemberToHTML(selectedContact)}           
            <h2 class="openContactH2">${selectedContact.name}</h2>
        </div>
        <p class="openContactInformation">Contact Information</p>
        <p class="openContactEmail">Email</p>
        <a class="openContactEmailLink" href="mailto:${selectedContact.email}">${selectedContact.email}</a>
        <p class="openContactPhoneText">Phone</p>
        <p class="openContactPhoneNumber">${selectedContact.phone}</p>        
    </div>  
    <div class="dropdown-container" id="contactOptionsDropdownContainer">
        <div class="dropdown-triggerContainer">
          <div class="dropdown-trigger" onclick="toggleDropdownMenu()">
              <img id="menuContactOptionsButton" src="../assets/img/contacts/menuContactOptionsButtonImg.svg" alt="">
          </div>
        </div>
        <div class="dropdown-menu" id="contactOptionsDropdown">
            <div class="dropdown-option" data-value="edit" onclick="editContactOverlayMobile('${selectedContact.id}')">
                <img src="../assets/img/contacts/editContactsDropDownIcon.svg" alt="Edit Contact">
            </div>            
            <div class="dropdown-option" data-value="delete" onclick="deleteContactMobile('${selectedContact.id}')">
                <img src="../assets/img/contacts/DeleteContactDropwDownIcon.svg" alt="Delete Contact">
            </div>
        </div>
    </div>
  `;  
}


function openOverlay(content) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = content;
    document.getElementById('all-contacts-id').appendChild(overlay);
    document.body.style.overflow = 'hidden';    
}


function closeOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.innerHTML = "";
    overlay.style.display = "none";
}


function setupContactScreen() {
    // contactsContentBackgroundColorWhiteGray();
    addDropdownMenuClickListener();
}


function triggerSlideInAnimation() {
    const content = document.getElementById("all-contacts-id");
    setTimeout(() => {
        content.classList.add("slideInContactsContentMobile");
    }, 10);
    setTimeout(() => {
        content.classList.remove("slideInContactsContentMobile");
    }, 2000);
}


function contactsContentBackgroundColorWhiteGray() {
    const content = document.getElementById("all-contacts-id");
    content.style.backgroundColor = "var(--white-grey)";
}


/**
 * Drop down menu click event listener
 */
function addDropdownMenuClickListener() {
    const dropdownTrigger = document.getElementById("menuContactOptionsButton");
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    if (!dropdownTrigger || !dropdownMenu) {
      console.error("Dropdown trigger or menu not found");
      return;
    }  
    /**
     * Drop down menu click event listener
     */
    const handleDocumentClick = function(event) {
      if (!dropdownTrigger.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
        document.removeEventListener("click", handleDocumentClick);
      }
    };  
    dropdownTrigger.addEventListener("click", function(event) {
      const isDropdownVisible = (dropdownMenu.style.display === "block");
      closeAllDropdowns();
      dropdownMenu.style.display = isDropdownVisible ? "none" : "block";
      if (!isDropdownVisible) {
        document.addEventListener("click", handleDocumentClick);
      } else {
        document.removeEventListener("click", handleDocumentClick);
      }  
      event.stopPropagation();
    });
}


/**
 * Close all other drop down menus
 */
function closeAllDropdowns() {
    const allDropdowns = document.querySelectorAll(".dropdown-menu");
    allDropdowns.forEach((dropdown) => {
      dropdown.style.display = "none";
    });
}
  
  
/**
  * Handle click on drop down menu option
  */
function handleDropdownOptionClick(action) {
    if (action === "edit") {      
    } else if (action === "delete") {      
    }
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    dropdownMenu.style.display = "none";
}
 
  
/**
 * Toggle the dropdown menu visibility
 */
function toggleDropdownMenu() {
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    if (dropdownMenu.classList.contains("slide-in")) {
        dropdownMenu.classList.remove("slide-in");
        addDropdownMenuClickListener();
    } else {
        dropdownMenu.classList.add("slide-in");
        closeAllDropdowns();        
    }
}
  
  
/**
  * Handle click on drop down menu option
  * @param {string} dropdownContainer - Drop down div Container
  * @param {string} addContactButtonContainerMobile - Render the contact button container mobile
  * @param {string} handleDocumentClick - Remove or add the event listener for the drop down menu
  */
function handleDocumentClick(dropdownTrigger, dropdownMenu) {
    return function (event) {
        if (!dropdownTrigger.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
            document.removeEventListener("click", handleDocumentClick(dropdownTrigger, dropdownMenu));
        }
    };
}
  
  
function singleMemberToHTML(member) {
    const colorCode = member.colorCode || getRandomColorHex();
    const textColor = isColorLight(colorCode) ? "black" : "white";  
    return `
      <div class="openContactUserImgMobile" style="background-color: ${colorCode}; color: ${textColor};">
        ${getFirstLettersOfName(member.name)}
      </div>
    `;
}


// Delete contact mobile

function deleteContactMobile(contactId) {
  const currentUser = getLoggedInUser();
  if (!currentUser) {
      console.error("Logged in user not found.");
      return;
  }
  const index = currentUser.contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
      console.error("Contact not found.");
      return;
  }
  currentUser.contacts.splice(index, 1);  
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateCurrentUserInBackend(currentUser);
  contactsInit();
}


// Edit contact mobile

function editContactOverlayMobile(contactId) {  
  let content = document.getElementById('all-contacts-id');
    content.innerHTML = "";
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");  
    const selectedContact = findSelectedContact(contactId);
    if (!selectedContact) {
      handleContactNotFound();
      return;
    }  
    const randomColor = getRandomColorHex();
    const textColor = isColorLight(randomColor) ? 'white' : 'black';
    const editContactHTML = createEditContactHTML(selectedContact, randomColor, textColor);
    overlay.innerHTML = editContactHTML;  
    document.body.appendChild(overlay);
    hideHeaderAndFooter();    
    content.style.paddingTop = '0px';
    content.style.paddingBottom = '0px';
}


function closeContactOverlay() {
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.remove();
  }
}


function createEditContactHTML(selectedContact, colorCode, textColor) {
  const { name, email, phone } = selectedContact;
  return /*html*/ `
    <div class="editContactContainerHeader">
      <div class="addContactCloseXContainer">
        <button class="addContactCloseXButtonMobile" onclick="contactsInit(); closeContactOverlay()">X</button>
      </div>
      <div class="addContactBlockHeader">
        <p class="addContactH1">Edit contact</p>
        <img class="addContactBlueStroked" src="../assets/img/contacts/addContactBlueStroked.svg" alt="">          
      </div>
    </div>
    <div class="addContactBlankUserImg">        
      ${renderSingleMemberToHTMLMobile(selectedContact, colorCode, textColor)}
    </div>
    <form id="editcontactFormMobileID" onsubmit="updateContactMobile(${selectedContact.id})">
      <div class="addContactContainerFooter">
        <input class="openContactInputNameMobile" name="editContactInputNameMobile" id="editContactInputNameMobileID" type="text" required pattern="[A-Za-z]+" placeholder="Name" value="${name}">
        <input class="openContactInputMailAddresssMobile" name="editContactInputMailAddresssMobile" id="editContactInputMailAddresssMobileID" type="email" required placeholder="E Mail" value="${email}">
        <input class="openContactInputPhoneMobile" name="editContactInputPhoneMobile" id="editContactInputPhoneMobileID" type="tel" required pattern="[0-9]{1,}" placeholder="Phone" value="${phone}">
        <div>
          <img class="createContactButtonImg" src="../assets/img/contacts/editContactDeleteButtonImg.svg" alt="" onclick="deleteContactMobile('${selectedContact.id}')">
          <img class="createContactButtonImg" src="../assets/img/contacts/editContactSaveButtonImg.svg" alt="" onclick="updateContactMobile('${selectedContact.id}')">
        </div>
      </div>
    </form>
  `;
}


function updateContactMobile(contactId) {  
  const updatedName = document.getElementById('editContactInputNameMobileID').value;
  const updatedEmail = document.getElementById('editContactInputMailAddresssMobileID').value;
  const updatedPhone = document.getElementById('editContactInputPhoneMobileID').value;  
  const currentUser = getLoggedInUser();
  if (!currentUser) {
      console.error("Logged in user not found.");
      return;
  }  
  const contactIndex = currentUser.contacts.findIndex(contact => contact.id === contactId);
  if (contactIndex === -1) {
      console.error("Contact not found.");
      return;
  }  
  currentUser.contacts[contactIndex].name = updatedName;
  currentUser.contacts[contactIndex].email = updatedEmail;
  currentUser.contacts[contactIndex].phone = updatedPhone;  
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateCurrentUserInBackend(currentUser);  
  closeContactOverlay();  
  contactsInit();
}