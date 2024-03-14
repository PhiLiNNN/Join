let currentUser;
let currentActive = -1;
const allLetters = [];

function contactsInit() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser)
    renderAllContacts();
}

function pushAllNeededLetters() {
    currentUser.contacts.forEach((contact, index) => {
        if(allLetters.includes(contact.name[0].toUpperCase()))
            return;
        allLetters.push(contact.name[0].toUpperCase())
    });
    allLetters.sort();
}

function renderAllContacts() {
    pushAllNeededLetters();
    let element = document.getElementById('all-contacts-content-id');
    element.innerHTML = '';
    allLetters.forEach(letter => {
        element.innerHTML += templateCreateLettersHTML(letter);
        let letterElement = document.getElementById(`letter-${letter}-id`); 
        currentUser.contacts.forEach((contact, index) => {
            if(letter === contact.name[0].toUpperCase()) {
                const initials =  getFirstLettersOfName(contact.name);
                letterElement.innerHTML += templateCreateContactsHTML(contact.name, contact.email, 
                                                                    contact.phone, contact.colorCode,
                                                                    contact.textColorCode, initials, index);
            }
        }); 
    });
}

function getUserInputs() {
    const nameInputEl  = document.getElementById('ac-name-input-id').value;
    const mailInputEl  = document.getElementById('ac-mail-input-id').value;
    const phoneInputEl  = document.getElementById('ac-phone-input-id').value;
    const colorCode  = document.getElementById('ac-color-input-id').value;
    const textColorCode = isColorLight(colorCode) ? 'white' : 'black';
    return {nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode}
}

async function addNewContact(event) {
    const {nameInputEl, mailInputEl, phoneInputEl, colorCode, textColorCode} = getUserInputs();
    const newContact =  {
        'name': nameInputEl,
        'email': mailInputEl,
        'phone': phoneInputEl,
        'colorCode': colorCode,
        'textColorCode': textColorCode
    }
    currentUser.contacts.push(newContact)
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    await updateCurrentUser(currentUser);
    closeAddNewContact();
    renderAllContacts();
    highlightActiveContact(currentUser.contacts.length - 1)
}

async function updateCurrentUser(currentUser) {
    try {        
        const existingUsers = await loadUsersFromBackend('users');              
        existingUsers[currentUser.userEMail] = currentUser;        
        await setItem('users', JSON.stringify(existingUsers));        
    } catch (error) {
        console.error("Error updating current user:", error);
    }
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

function openEditContact(name, email, phone, index, bgColor, txtColor, initials ) {
 
    document.body.style.overflow = 'hidden';
    const element = document.getElementById('edit-overlay-id');
    const contactsElement = document.getElementById('all-contacts-id');
    contactsElement.style.overflow = 'hidden';
    element.innerHTML = templateEditContactHTML(initials, name, email, phone, bgColor, txtColor );
    toggleVisibility('edit-overlay-id', true);
    setTimeout(() => {  
        toggleVisibility('edit-card-content-id', false,  'card-visible');
     }, 30);
}

function highlightActiveContact(index) {
    const element = document.getElementById(`contact-${index}-id`);
    if (currentActive !== -1) {
        const previousElement = document.getElementById(`contact-${currentActive}-id`);
        previousElement.classList.remove('selected-contact');
    }
    if (currentActive !== index) {
        element.classList.add('selected-contact');
        currentActive = index;
    } else if (currentActive === index) 
        return;
    else
        currentActive = -1;
}

function openAddContactMenu() {
    document.body.style.overflow = 'hidden';
    const element = document.getElementById('ad-overlay-id');
    const contactsElement = document.getElementById('all-contacts-id');
    contactsElement.style.overflow = 'hidden';
    element.innerHTML = templateAddContactHTML();
    toggleVisibility('ad-overlay-id', true);
    setTimeout(() => {  
        toggleVisibility('ac-card-content-id', false,  'card-visible');
     }, 30);
}

function closeAddNewContact() {
    const contactsElement = document.getElementById('all-contacts-id');
    contactsElement.style.overflow = 'auto';
    toggleVisibility('ac-card-content-id', true,  'card-visible');
    setTimeout(() => {
        toggleVisibility('ad-overlay-id', false);
        document.body.style.overflow = 'auto';
    }, 300); 
}


function openContact(name, email, phone, index, bgColor, txtColor, initials) {
    let viewportWidth = window.innerWidth;
    highlightActiveContact(index);
    const element = document.getElementById('show-overlay-id');
    if (viewportWidth < 1340) 
        element.classList.toggle('d-none');
    else if (viewportWidth >= 1340) 
        element.classList.remove('d-none');
    element.innerHTML  = templateShowContact(name, email, phone, index, bgColor, txtColor, initials);
    

}

function closeContact(index) {
    const selectedEl = document.getElementById(`contact-${index}-id`);
    selectedEl.classList.add('selected-contact');
    const element = document.getElementById('show-overlay-id');
    element.classList.toggle('d-none');
  
}