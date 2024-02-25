let selectedContactGlobal = "";


function deleteContact(contactId) {
    const loggedInUser = getLoggedInUser();    
    if (!loggedInUser) {
      console.error("No logged in user found.");
      return;
    }    
    const contactIndex = loggedInUser.contacts.findIndex(contact => contact.id === contactId);    
    if (contactIndex === -1) {
      console.error("Contact not found.");
      return;
    }    
    loggedInUser.contacts.splice(contactIndex, 1);    
    deleteContactAndSaveInBackend(contactId);
    selectedContactGlobal = null;
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
    modal.innerHTML = /*html*/ `
      <div class="modal-content">
        <p class="removeContactConfirmationText">Delete Contact?</p>
        <div class="cancelContactDesktopDeleteButtonConfirmationContainer">
          <button class="cancelContactDesktopDeleteButton" onclick="confirmDeleteContact(selectedContactGlobal)">Delete</button>
          <button class="cancelContactDesktopDeleteButton" onclick="cancelDelete()">Cancel</button>
        </div>
      </div>
    `;
    const openContactContainerFooter = document.querySelector(".openContactContainerFooter");
    openContactContainerFooter.appendChild(modal);
}


function confirmDeleteContact(selectedContact) {
    try {
        if (!selectedContact || typeof selectedContact !== 'object') {
            console.error("Invalid contact object: not an object");
            return;
        }
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


async function deleteContactAndSaveInBackend(contactId) {
    const loggedInUser = getLoggedInUser();    
    if (!loggedInUser) {
      console.error("No logged in user found.");
      return;
    }    
    const contactIndex = loggedInUser.contacts.findIndex(contact => contact.id === contactId);    
    if (contactIndex === -1) {
      console.error("Contact not found.");
      return;
    }    
    const deletedContact = loggedInUser.contacts.splice(contactIndex, 1)[0];
    selectedContactGlobal = null;
    try {
      await setItem(loggedInUser, loggedInUser.contacts);
      console.log("Contact deleted and updated in backend.");
    } catch (error) {
      console.error("Error updating contact in backend:", error);      
    }
  }













  function deleteContactMobile() {
    const usersArray = getUsers();
    const loggedInUserEmail = getLoggedInUserEmail();
    if (!loggedInUserEmail) {
        console.error("No user logged in.");
        return;
    }    
    const selectedContact = getSelectedContact();
    if (!selectedContact) {
        console.error("No contact selected for deletion.");
        return;
    }
    const userIndex = findUserIndex(usersArray, loggedInUserEmail);
    if (userIndex === -1) {
        console.error("Logged in user not found.");
        return;
    }    
    const contactIndex = findContactIndex(usersArray[userIndex].contacts, selectedContact);
    if (contactIndex === -1) {
        console.error("Contact not found for deletion.");
        return;
    }
    usersArray[userIndex].contacts.splice(contactIndex, 1);    
    console.log("Vor setItem:", JSON.stringify(usersArray));
    setItem("users", JSON.stringify(usersArray));
    console.log("Nach setItem:", localStorage.getItem("users"));
}


function getSelectedContact() {
    return selectedContactGlobal;
}


function findContactIndex(contactsArray, selectedContact) {
    return contactsArray.findIndex(contact => contact === selectedContact);
}