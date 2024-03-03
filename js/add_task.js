let loggedUser;
let currentUser;

function initAddTask() {
  getCurrentUser();
}

function getCurrentUser() {
  const getCurrentUsers = localStorage.getItem("currentUser");
  currentUser  = JSON.parse(getCurrentUsers);
  loggedUser = currentUser.userName;
}


function sortContactsBySurname(a, b) {
    const lastNameA = a.name.split(' ').pop(); // Nachnamen extrahieren
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



function toggleAssignedToContainer() {
  currentUser.contacts.sort(sortContactsBySurname);
  const arrowElement = document.getElementById('rotate-arrow-id');
  const assignedToContainer = document.getElementById('assigned-to-contacts-id');
  assignedToContainer.innerHTML = '';
  assignedToContainer.classList.toggle('active');
  arrowElement.classList.toggle('upsidedown');
  currentUser.contacts.forEach((contact, index) => {
    if (contact.name === loggedUser) 
      contact.name = contact.name + ' (you)'
    assignedToContainer.innerHTML += templateAssignedToContainerHTML(contact.name, index, contact.colorCode);
  });   
}


function selectedAssignedToUser(event) {
  const svgElement = event.currentTarget.querySelector('svg'); 
  event.currentTarget.classList.toggle('selected-contact');
  if (event.currentTarget.classList.contains('selected-contact'))
    svgElement.innerHTML = templateSvgCheckboxConfirmedHTML();
  else 
    svgElement.innerHTML = templateSvgDefaultCheckboxHTML();
}
