function createContactMobile() {    
    const usersArray = getUsers();
    const loggedInUserEmail = getLoggedInUserEmail();
    if (!loggedInUserEmail) {
        console.error("No user logged in.");
        return;
    }    
    const newContact = getNewContact();
    const userIndex = findUserIndex(usersArray, loggedInUserEmail);
    if (userIndex === -1) {
        console.error("Logged in user not found.");
        return;
    }    
    newContact.id = generateUniqueID(usersArray);       
    addContactToUser(usersArray, userIndex, newContact);    
}


function getLoggedInUserEmail() {
    const loggedInUser = getLoggedInUser();
    return loggedInUser ? loggedInUser.userEMail : null;
}


function getNewContact() {
    const contactName = document.getElementById("add-contact-input-name-mobile-id").value;
    const contactEmail = document.getElementById("add-contact-input-mail-addresss-mobile-id").value;
    const contactPhone = document.getElementById("add-contact-input-phone-mobile-id").value;
    return { name: contactName, email: contactEmail, phone: contactPhone };
}


function findUserIndex(usersArray, userEmail) {
    return usersArray.findIndex(user => user.userEMail === userEmail);
}


function addContactToUser(usersArray, userIndex, newContact) {
    if (!usersArray[userIndex].contacts) {
        usersArray[userIndex].contacts = [];
    }
    usersArray[userIndex].contacts.push(newContact); 
    setItem("users", JSON.stringify(usersArray))
}


function getLoggedInUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }    
    return currentUser;
}


function getUsers() {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    return users;
}


function generateUniqueID(usersArray) {
    let id;
    do {
        id = generateRandomID();
    } while (usersArray.some(user => user.contacts && user.contacts.some(contact => contact.id === id)));
    return id;
}


function generateRandomID() {    
    return Math.random().toString(36).substring(2, 11);
}