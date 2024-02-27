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
    container.setAttribute('onclick', `openContactScreenMobile(${oneContact.id})`);
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