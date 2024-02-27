function contactsInit() {    
    renderContacts();
    renderAddContactButtonMobile();
    setTimeout(showHeaderAndFooter, 500);
}


async function renderContacts() {
    const content = document.getElementById("contacts-content-id");
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
        registerContactClickHandlers(); // Hier wird der Event-Handler registriert
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
    console.log("function createOneContactContainer(oneContact)" , oneContact.id);
    const randomColor = getRandomColorHex();
    const textColor = isColorLight(randomColor) ? 'white' : 'black';
    const iconHtml = renderSingleMemberToHTMLMobile(oneContact, randomColor, textColor);  
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
    let addContactButtonMobile = document.getElementById(`contacts-content-id`);
    addContactButtonMobile.innerHTML += `
      <div>
        <img class="addContactButtonImgMobile" src="../assets/img/contacts/addContactButtonMobile.svg" alt="createContactButton" onclick="addContactScreenMobile()"></img>
      </div>
      `
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
        return words[0].slice(0, 2);
      case 2:
        return words[0][0] + words[1][0];
      default:
        return words[0][0] + words[1][0];
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
    const mobileHeader = document.querySelector(".header-gap"); 
    const menuTemplate = document.querySelector(".footerCLass");
    mobileHeader.style.display = "none";
    menuTemplate.style.display = "none";
}
  
  
/**
  * Show header and footer screen on mobile view
  */
function showHeaderAndFooter() {
    const mobileHeader = document.querySelector(".header-gap");
    const menuTemplate = document.querySelector(".footerCLass");
    mobileHeader.style.display = "flex";
    menuTemplate.style.display = "block";
}

// Add contact screen

function addContactScreenMobile() {
    const content = document.getElementById("contacts-content-id");
    content.innerHTML = addContactFormMobileHTML();
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
    currentUser.contacts.push(newContact);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateCurrentUserInBackend(currentUser)
    console.log("New contact added to currentUser:", newContact);
    contactsInit();
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
        const existingUsers = await loadUsersFromBackend();        
        if (!(currentUser.userEMail in existingUsers)) {
            console.log("User not found in backend.");
            return;
        }        
        existingUsers[currentUser.userEMail] = currentUser;        
        await setItem('users', JSON.stringify(existingUsers));
        console.log("CurrentUser updated in backend:", currentUser);
    } catch (error) {
        console.error("Error updating current user in backend:", error);
    }
}


// Open contact overlay mobile

function showContactOverlayMobile(contactId) {
    const content = document.getElementById('contacts-content-id');
    content.innerHTML = "";
    const selectedContact = findSelectedContact(contactId);
    if (!selectedContact) {
        handleContactNotFound();
        return;
    }
    const overlayContent = createContactOverlayContent(selectedContact);
    openOverlay(overlayContent);
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
        <div class="openContactUserImageAndNameContainer" onclick="showContactOverlay(${selectedContact.id})">
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
            <div class="dropdown-option" data-value="edit" onclick="showContactOverlay(${selectedContact.id})">
                <img src="../assets/img/contacts/editContactsDropDownIcon.svg" alt="Edit Contact">
            </div>            
            <div class="dropdown-option" data-value="delete" onclick="deleteContactMobile()">
                <img src="../assets/img/contacts/DeleteContactDropwDownIcon.svg" alt="Delete Contact">
            </div>
        </div>
    </div>
  `;  
}


function openOverlay(content) {
    // Erstelle das Overlay-Element
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    // Füge den übergebenen Inhalt dem Overlay hinzu
    overlay.innerHTML = content;
    // Füge das Overlay dem Dokument hinzu
    document.getElementById('contacts-content-id').appendChild(overlay);
    // Füge einen Event-Listener hinzu, um das Overlay zu schließen, wenn auf das Overlay geklickt wird
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            closeOverlay(overlay);
        }
    });
}


function closeOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.innerHTML = "";
    overlay.style.display = "none";
}


function setupContactScreen() {    
    // showHeaderAndFooter();
    contactsContentBackgroundColorWhiteGray();
    // addDropdownMenuClickListener();
}


function triggerSlideInAnimation() {
    const content = document.getElementById("contacts-content-id");
    setTimeout(() => {
        content.classList.add("slideInContactsContentMobile");
    }, 10);
    setTimeout(() => {
        content.classList.remove("slideInContactsContentMobile");
    }, 2000);
}


function contactsContentBackgroundColorWhiteGray() {
    const content = document.getElementById("contacts-content-id");
    content.style.backgroundColor = "var(--white-grey)";
}
  
  
function addDropdownMenuClickListener() {
    const dropdownTrigger = document.getElementById("menuContactOptionsButton");
    if (!dropdownTrigger) {
        console.error("Dropdown trigger not found");
        return;
    }
    dropdownTrigger.addEventListener("click", function(event) {
        const dropdownMenu = document.getElementById("contactOptionsDropdown");
        if (!dropdownMenu) {
            console.error("Dropdown menu not found");
            return;
        }
        // Füge den Event-Listener für die Dropdown-Optionen hinzu
        dropdownMenu.addEventListener("click", function(event) {
            const target = event.target;
            if (target.classList.contains("dropdown-option")) {
                const action = target.getAttribute("data-value");
                handleDropdownOptionClick(action);
            }
        });
        // Sobald das Dropdown-Menü erstellt ist und der Button geklickt wurde, entferne den Event-Listener für den Button
        dropdownTrigger.removeEventListener("click", addDropdownMenuClickListener);
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
      // handle edit action
    } else if (action === "delete") {
      // handle delete action
    }
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    dropdownMenu.style.display = "none";
}
  
  
/**
  * Handle drop down menu option clicked
  */
function toggleDropdownMenu() {
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    if (dropdownMenu.classList.contains("slide-in")) {
        dropdownMenu.classList.remove("slide-in");
    } else {
        dropdownMenu.classList.add("slide-in");
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
            document.removeEventListener("click", handleDocumentClick);
        }
    };
}
  
  
function singleMemberToHTML(member) {
    const colorCode = member.colorCode || getRandomColorHex(); // Falls kein Farbcode vorhanden ist, generieren wir einen zufälligen
    const textColor = isColorLight(colorCode) ? "black" : "white"; // Textfarbe basierend auf der Helligkeit des Farbcodes festlegen
  
    return `
      <div class="openContactUserImgMobile" style="background-color: ${colorCode}; color: ${textColor};">
        ${getFirstLettersOfName(member.name)}
      </div>
    `;
}