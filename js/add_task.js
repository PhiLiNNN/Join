let isRotated = false;
let contacts  = [];
let loggedUser;

function initAddTask() {
  selcetAllContact();

}

function selcetAllContact() {
  const getCurrentUsers = localStorage.getItem("currentUser");
  const parsUsers  = JSON.parse(getCurrentUsers);
  loggedUser = parsUsers.userName;
  parsUsers.contacts.forEach(contact => {
    contacts.push(contact.name)
  });

}


function sortContactBySurname() {
  
  return [...contacts].sort((a, b) => {
    const surnameA = a.split(' ')[1];
    const surnameB = b.split(' ')[1];
    return surnameA.localeCompare(surnameB);
  });
}



// Funktrion wieder löschen, wenn alles fertig ist
function showHeaderAndFooter() {
  const mobileHeader = document.querySelector(".header-gap");
  const menuTemplate = document.querySelector(".footerCLass");
  mobileHeader.style.display = "flex";
  menuTemplate.style.display = "block";
}



function toggleAssignedToContainer() {
  const arrowElement = document.getElementById('rotate-arrow-id');
  const assignedToContainer = document.getElementById('assigned-to-contacts-id');
  const sortedContacts =  sortContactBySurname();
  
  assignedToContainer.innerHTML = '';
  assignedToContainer.classList.toggle('active');
  arrowElement.classList.toggle('upsidedown');
  sortedContacts.forEach((contact, index) => {
    if (contact === loggedUser) 
      contact = contact + ' (you)'
    assignedToContainer.innerHTML += templateAssignedToContainerHTML(contact, index);
  });   
}


function selectedAssignedToUser(event) {
  console.log(event.currentTarget);
  event.currentTarget.classList.toggle('selected-contact');
}
