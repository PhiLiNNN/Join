/* Desktop view */
/* Render contacts desktop view */

function renderContactsDesktop() {
    const content = document.getElementById("all-contacts-id");
    content.innerHTML = "";
    renderAddContactButtonDesktop();
    const contactsByFirstLetter = groupContactsByFirstLetter();
    renderContactsByFirstLetterDesktop(content, contactsByFirstLetter);
}

/**
 * Create add contact button for desktop view
 */
function renderAddContactButtonDesktop() {
    const contentDesktop = document.getElementById("all-contacts-id");
    const addContactButtonContainerDesktop = document.createElement("div");
    addContactButtonContainerDesktop.classList.add("addContactButtonContainerDesktop");
    addContactButtonContainerDesktop.innerHTML = /*html*/ `
      <button class="addContactButtonDesktop" onclick="addContactShowOverlayDesktop()">Add new contact
        <span><img class="addContactButtonDesktopImg" src="../assets/img/contacts/addNewContactDesktopButtonImg.svg" alt=""></span></button>    
      `;    
    contentDesktop.appendChild(addContactButtonContainerDesktop);  
    addContactButtonContainerDesktop.addEventListener("click", function () { 
    });
}


/**
 * Create letter div container for sorted contacts by first letter
 */
function groupContactsByFirstLetter() {
    const contactsByFirstLetter = {};
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));    
    if (!loggedInUser || !loggedInUser.contacts) {
        console.error('Error: User or contacts not found.');
        return contactsByFirstLetter;
    }
    loggedInUser.contacts.sort((a, b) => a.name.localeCompare(b.name));
    loggedInUser.contacts.forEach((oneContact) => {
        const firstLetter = oneContact.name.charAt(0).toUpperCase();
        if (!contactsByFirstLetter[firstLetter]) {
            contactsByFirstLetter[firstLetter] = createLetterContainer(firstLetter);
        }
        const oneContactContainer = createContactContainer(oneContact);
        contactsByFirstLetter[firstLetter] += oneContactContainer;
    });
    return contactsByFirstLetter;
}


/**
 * Generate HTML for the letters
 * @param {string} firstLetter - This is the first letter from contact name
 */
function createLetterContainer(firstLetter) {
    return `
        <div class="letterAndContactsContainer">
            <div class="letter-column">
                <h2 class="contact-first-letter-desktop">${firstLetter}</h2>
            </div>
        </div>
    `;
}


/**
 * Generate HTML for each contact
 * @param {string} oneContact - One contact data oneContact.id / oneContact color / oneContact.name / oneContact.email
 */
function createContactContainer(oneContact) {
    return `
        <div class="oneContactContainer" id="contact-${oneContact.id}" onclick="openContactScreenDesktop(${oneContact.id})" data-contact-id="${oneContact.id}">
            <div>                
                ${singleMemberToHTML(oneContact, 0)}
            </div>
            <div class="contact-info-container-Desktop">
                <h2 class="oneContactContainerH2Desktop">${oneContact.name}</h2>
                <a class="oneContactContainerAElementDesktop">${oneContact.email}</a>
            </div>
        </div>
    `;
}


/**
 * Add each contact to the section on desktop view
 * @param {string} content - contactsContent div container
 * @param {string} contactsByFirstLetter - Sorted contacts by first letter
 */
function renderContactsByFirstLetterDesktop(content, contactsByFirstLetter) {  // 
    Object.values(contactsByFirstLetter).forEach((section) => {
        content.innerHTML += section;
    });
}


/* Open contact desktop view */

