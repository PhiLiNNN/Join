function openContactScreenMobile(contactId) {
  const selectedContact = findSelectedContact(contactId);  
  if (!selectedContact) {
      handleContactNotFound();
      return;
  }
  const content = document.getElementById("contacts-content-id");
  content.innerHTML = createContactScreenHTML(selectedContact);  
  setupContactScreen();  
  triggerSlideInAnimation();
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


function createContactScreenHTML(selectedContact) {
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
            ${singleMemberToHTML(selectedContact, 0)}           
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
            <div class="dropdown-option" data-value="delete" onclick="deleteContactMobile(${selectedContact.id})">
                <img src="../assets/img/contacts/DeleteContactDropwDownIcon.svg" alt="Delete Contact">
            </div>
        </div>
    </div>
  `;
}


function setupContactScreen() {    
  // showHeaderAndFooter();
  contactsContentBackgroundColorWhiteGray();
  addDropdownMenuClickListener();
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
  const dropdownMenu = document.getElementById("contactOptionsDropdown");
  if (!dropdownTrigger || !dropdownMenu) {
    console.error("Dropdown trigger or menu not found");
    return;
  }
  const handleDocumentClick = function (event) {
    if (!dropdownTrigger.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = "none";
      document.removeEventListener("click", handleDocumentClick);
    }
  };
  dropdownTrigger.addEventListener("click", function (event) {
    const isDropdownVisible = (dropdownMenu.style.display === "block");
    if (!isDropdownVisible) {
      closeAllDropdowns();
    }
    dropdownMenu.style.display = isDropdownVisible ? "none" : "block";
    if (!isDropdownVisible) {
      document.addEventListener("click", handleDocumentClick);
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
  document.removeEventListener("click", handleDocumentClick);
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
  dropdownMenu.classList.add("slide-in"); // Füge eine Klasse hinzu, um die Animation zu starten
  dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
}


/**
  * Handle click on drop down menu option
  * @param {string} dropdownContainer - Drop down div Container
  * @param {string} addContactButtonContainerMobile - Render the contact button container mobile
  * @param {string} handleDocumentClick - Remove or add the event listener for the drop down menu
  */
function handleDocumentClick(dropdownContainer, addContactButtonContainerMobile, handleDocumentClick) {    
  return function (event) {
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    if (!dropdownContainer.contains(event.target) &&
      !addContactButtonContainerMobile.contains(event.target) &&
      !dropdownMenu.contains(event.target)) {
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

