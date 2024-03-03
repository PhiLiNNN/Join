let currentUser;
let assignedTo = [];

async function initAddTask() {
  currentUser = await loadUsersFromBackend('currentUser');
  
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



function toggleAssignedToContainer() {
  currentUser.contacts.sort(sortContactsBySurname);
  const arrowElement = document.getElementById('rotate-arrow-id');
  const assignedToContainer = document.getElementById('assigned-to-contacts-id');
  assignedToContainer.innerHTML = '';
  assignedToContainer.classList.toggle('active');
  arrowElement.classList.toggle('upsidedown');
  currentUser.contacts.forEach((contact, index) => {
    if (contact.name === currentUser.userName) 
      contact.name = contact.name + ' (you)'
    assignedToContainer.innerHTML += templateAssignedToContainerHTML(contact.name, index, contact.colorCode);
  });   
}


function selectedAssignedToUser(event) {
  const assignedContact = event.currentTarget.querySelector('.assigned-to-user span').innerText;
  const svgElement = event.currentTarget.querySelector('svg'); 
  event.currentTarget.classList.toggle('selected-contact');
  if (event.currentTarget.classList.contains('selected-contact')) {
    svgElement.innerHTML = templateSvgCheckboxConfirmedHTML();
    assignedTo.push(assignedContact);
  }  else { 
    svgElement.innerHTML = templateSvgDefaultCheckboxHTML();
    const removeContact = assignedTo.indexOf(assignedContact);
    assignedTo.splice(removeContact, 1);
  }
  console.log(assignedTo)
}
