let currentUser;
let assignedTo = {
  'names': [],
  'colorCodes': []
};

async function initAddTask() {
  currentUser = await loadUsersFromBackend('currentUser');
  renderAssignedToContacts();
  
}



function sortContactsBySurname(a, b) {
    const lastNameA = a.name.split(' ').pop(); 
    const lastNameB = b.name.split(' ').pop();
    if (lastNameA < lastNameB) return -1;
    if (lastNameA > lastNameB) return 1;
    return 0;
}





// Funktrion wieder löschen, wenn alles fertig ist
function showHeaderAndFooter() {
  const mobileHeader = document.querySelector(".header-gap");
  const menuTemplate = document.querySelector(".footerCLass");
  mobileHeader.style.display = "flex";
  menuTemplate.style.display = "block";
}

function renderAssignedToContacts() {
  currentUser.contacts.sort(sortContactsBySurname);
  const assignedToContainer = document.getElementById('assigned-to-contacts-id');
  currentUser.contacts.forEach((contact, index) => {
    if (contact.name === currentUser.userName) 
      contact.name = contact.name + ' (you)'
    assignedToContainer.innerHTML += templateAssignedToContainerHTML(contact.name, index, contact.colorCode);
  }); 
}

// function toggleAssignedToContainer() {
//   toggleAssignedToLabel('rotate-arrow-id', 'active');
//   toggleAssignedToLabel('assigned-to-contacts-id', 'upsidedown');
//   toggleAssignedToLabel('at-label-id', 'shrink-font-size');
// }




function toggleAssignedToContainer() {
 

  toggleAssignedToLabel('assigned-to-contacts-id', 'active');
  toggleAssignedToLabel('rotate-arrow-id', 'upsidedown');
  toggleAssignedToLabel('at-label-id', 'shrink-font-size');
}

function toggleAssignedToLabel(elementID, toggleClass) {
  const element = document.getElementById(elementID);
  element.classList.toggle(toggleClass)

}

function renderAddedContacts() {
  let addedContactsElement =  document.getElementById('added-contacts-id');
  addedContactsElement.innerHTML = '';
  assignedTo.colorCodes.forEach(colorCode  => {
    addedContactsElement.innerHTML += templateaddedContactsHTML(colorCode);  
  })
}


function selectedAssignedToUser(event) {
  const svgElement = event.currentTarget.querySelector('svg'); 
  event.currentTarget.classList.toggle('selected-contact');
  if (event.currentTarget.classList.contains('selected-contact')) {
    svgElement.innerHTML = templateSvgCheckboxConfirmedHTML();
    pushSelectedUser(event);
  } else { 
    svgElement.innerHTML = templateSvgDefaultCheckboxHTML();
    deleteSelectedUser(event);
  }
  renderAddedContacts();  
}



function getUserInfo(event) {
  const circleStyleElement = event.currentTarget.querySelector('.circle-style');
  const assignedContact = event.currentTarget.querySelector('.assigned-to-user span').innerText;
  const backgroundColorValue = window.getComputedStyle(circleStyleElement).backgroundColor;
  return { assignedContact, backgroundColorValue };
}

function pushSelectedUser(event) {
  const { assignedContact, backgroundColorValue } = getUserInfo(event);
  if (assignedTo.names.includes(assignedContact) || assignedTo.colorCodes.includes(backgroundColorValue)) {
    return
  }
  assignedTo.names.push(assignedContact);
  assignedTo.colorCodes.push(backgroundColorValue);
}

function deleteSelectedUser(event) {
  const { assignedContact, backgroundColorValue } = getUserInfo(event);
  const removeContact = assignedTo.names.indexOf(assignedContact);
  const removeColorcode = assignedTo.colorCodes.indexOf(backgroundColorValue);
  assignedTo.names.splice(removeContact, 1);
  assignedTo.colorCodes.splice(removeColorcode, 1);
}