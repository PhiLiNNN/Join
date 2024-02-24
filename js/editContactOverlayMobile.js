function showContactOverlay(contactId) {
    let content = document.getElementById(`contacts-content-id`);
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
}
  
  
function closeContactOverlay() {
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.remove();
    }
}
  
  
function findSelectedContact(contactId) {
    return currentUser.contacts.find(contact => contact.id === contactId);
}
  
  
function createEditContactHTML(selectedContact, colorCode, textColor) {
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
          <input class="openContactInputNameMobile" name="editContactInputNameMobile" id="editContactInputNameMobileID" type="text" required pattern="[A-Za-z]+" placeholder="Name" value="${selectedContact.name}">
          <input class="openContactInputMailAddresssMobile" name="editContactInputMailAddresssMobile" id="editContactInputMailAddresssMobileID" type="email" required placeholder="E Mail" value="${selectedContact.email}">
          <input class="openContactInputPhoneMobile" name="editContactInputPhoneMobile" id="editContactInputPhoneMobileID" type="tel" required pattern="[0-9]{1,}" placeholder="Phone" value="${selectedContact.phone}">
          <div>
            <img class="createContactButtonImg" src="../assets/img/contacts/editContactDeleteButtonImg.svg" alt="" onclick="deleteContact(${selectedContact.id})">
            <img class="createContactButtonImg" src="../assets/img/contacts/editContactSaveButtonImg.svg" alt="" onclick="updateContactMobile(${selectedContact.id})">
          </div>
        </div>
      </form>
    `;
  }
  
  
function handleContactNotFound() {
    console.error("Selected contact not found in currentUser.contacts.");
}