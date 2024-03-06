let currentUser;
let assignedTo = {
  'initials': [],
  'colorCodes': [],
  'textColor': []
};

function initAddTask() {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(currentUser)
  renderAssignedToContacts();
  
}



function sortContactsBySurname(a, b) {
    const lastNameA = a.name.split(' ')[1]?.toLowerCase() || '';
    const lastNameB = b.name.split(' ')[1]?.toLowerCase() || '';
    if (lastNameA < lastNameB) return -1;
    if (lastNameA > lastNameB) return 1;
    return 0;
}





// Funktrion wieder löschen, wenn alles fertig ist
/*function showHeaderAndFooter() {
  const mobileHeader = document.querySelector(".header-gap");
  const menuTemplate = document.querySelector(".footerCLass");
  mobileHeader.style.display = "flex";
  menuTemplate.style.display = "block";
}
*/

function renderAssignedToContacts() {
  currentUser.contacts.sort(sortContactsBySurname);
  console.log(currentUser.contacts)
  const assignedToContainer = document.getElementById('assigned-to-contacts-id');
  currentUser.contacts.forEach((contact, index) => {
    if (contact.name === currentUser.userName) 
      contact.name = contact.name + ' (you)'
    const initials =  getFirstLettersOfName(contact.name);
    textColor = isColorLight(contact.colorCode) ? 'white' : 'black'; 
    assignedToContainer.innerHTML += templateAssignedToContainerHTML(contact.name, index, contact.colorCode, initials, textColor);
  }); 
}




function toggleAssignedToContainer() {
  toggleAssignedSection('assigned-to-contacts-id', 'active');
  toggleAssignedSection('rotate-arrow-id', 'upsidedown');
  toggleAssignedSection('at-label-id', 'shrink-font-size');
}

function toggleAssignedSection(elementID, toggleClass) {
  const element = document.getElementById(elementID);
  element.classList.toggle(toggleClass)
}

function renderAddedContacts() {
  let addedContactsElement =  document.getElementById('added-contacts-id');
  addedContactsElement.innerHTML = '';
  assignedTo.colorCodes.forEach((colorCode, index)  => {
    addedContactsElement.innerHTML += templateaddedContactsHTML(colorCode, assignedTo.initials[index], assignedTo.textColor[index]);  
  });
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
  const assignedContact = circleStyleElement.innerText;
  const backgroundColorValue = window.getComputedStyle(circleStyleElement).backgroundColor;
  const textColor = window.getComputedStyle(circleStyleElement).color;
  return { assignedContact, backgroundColorValue, textColor };
}

function pushSelectedUser(event) {
  const { assignedContact, backgroundColorValue, textColor } = getUserInfo(event);
  if (assignedTo.initials.includes(assignedContact) || assignedTo.colorCodes.includes(backgroundColorValue)) {
    return
  }
  assignedTo.initials.push(assignedContact);
  assignedTo.colorCodes.push(backgroundColorValue);
  assignedTo.textColor.push(textColor);
}

function deleteSelectedUser(event) {
  const { assignedContact, backgroundColorValue, textColor } = getUserInfo(event);
  const removeContact = assignedTo.initials.indexOf(assignedContact);
  const removeColorcode = assignedTo.colorCodes.indexOf(backgroundColorValue);
  const removeTextColor = assignedTo.colorCodes.indexOf(textColor);
  assignedTo.initials.splice(removeContact, 1);
  assignedTo.colorCodes.splice(removeColorcode, 1);
  assignedTo.textColor.splice(removeTextColor, 1);
}

function togglePrioImg(clickedId) {
  const imageIds = ['urgent-default-id', 'medium-default-id', 'low-default-id'];
  imageIds.forEach(id => {
    const image = document.getElementById(id);
    if (id === clickedId)
      image.src = `./assets/img/${id.replace('-default-id', '_highlighted.png')}`;
    else 
      image.src = `./assets/img/${id.replace('-default-id', '_default.png')}`;
  });
}



function toggleCategoryContainer() {
  toggleAssignedSection('rotate-arrow-category-id', 'upsidedown');
  toggleAssignedSection('category-id', 'active');
  
}

function selectCategory(clickedElement){
  const element = document.getElementById('category-input-id');
  element.value =  clickedElement.innerHTML;
  toggleCategoryContainer();
}
