function deleteContact(selectedContact) {
    selectedContact = selectedContactGlobal;
    console.log("findSelectedContact(contactId)" , contactId);
    showDeleteConfirmationModal(selectedContact);
}


function validateContact(selectedContact) {
    if (!selectedContact || typeof selectedContact !== 'object') {
        console.error("Invalid contact object: not an object");
        return false;
    }
    if (!selectedContact.name || !selectedContact.email || !selectedContact.phone) {
        console.error("Invalid contact object: missing properties");
        return false;
    }
    return true;
}


function showDeleteConfirmationModal(selectedContact) {
    const modal = document.createElement("div");
    modal.classList.add("modal-content-mobile");
    const selectedContactJSON = JSON.stringify(selectedContact);
    modal.innerHTML = /*html*/ `
      <div class="modal-content">
        <p class="removeContactConfirmationText">Delete Contact?</p>
        <div class="cancelContactDesktopDeleteButtonConfirmationContainer">
          <button class="cancelContactDesktopDeleteButton" onclick="confirmDeleteContact(${selectedContactJSON})">Delete</button>
          <button class="cancelContactDesktopDeleteButton" onclick="cancelDelete()">Cancel</button>
        </div>
      </div>
    `;
    const openContactContainerFooter = document.querySelector(".openContactContainerFooter");
    openContactContainerFooter.appendChild(modal);
}


function confirmDeleteContact(selectedContact) {    
    try {
        const contactIndex = findContactIndex(selectedContact);
        if (contactIndex === -1) {
            console.error("Selected contact not found in currentUser.contacts.");
            return;
        }        
        currentUser.contacts.splice(contactIndex, 1);        
        closeDeleteConfirmationModal();        
    } catch (error) {
        handleDeleteError(error);
    }
}


function findContactIndex(selectedContact) {    
    return currentUser.contacts.findIndex(contact =>
        contact.name === selectedContact.name &&
        contact.email === selectedContact.email &&
        contact.phone === selectedContact.phone
    );
}


function cancelDelete() {
    closeDeleteConfirmationModal();
}


function closeDeleteConfirmationModal() {
    const modal = document.querySelector(".modal-content-mobile");
    if (modal) {
      modal.remove();
    }
}


/**
 * Catch error
 * @param {string} error - Show error if the contact can´t be deleted
 */
function handleDeleteError(error) {
    console.error("Fehler beim Löschen des Kontakts:", error);
}