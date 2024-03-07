let currentUser;
let assignedTo = {
  'initials': [],
  'colorCodes': [],
  'textColor': [],
  'userNames': []
};
let subtaskList = [];
let subtaskCounter = 0;
let userIndex;

function initAddTask() {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(currentUser)
  renderAssignedToContacts();
  addSubtaskVisibilityListener();
  
}



function sortContactsBySurname(a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    const emailA = a.email.toLowerCase();
    const emailB = b.email.toLowerCase();
    if (emailA < emailB) return -1;
    if (emailA > emailB) return 1;
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
  currentUser.contacts.forEach(contact => {
  const lastName = contact.name.split(' ')[1]?.toLowerCase() || '';
  console.log(lastName);
});
  console.log('currentUser.contacts',currentUser.contacts)
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


function selectedAssignedToUser(event, index) {
  userIndex  = index;
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
  const userName = document.getElementById(`contact-id${userIndex}`).innerHTML;
  const assignedContact = circleStyleElement.innerText;
  const backgroundColorValue = window.getComputedStyle(circleStyleElement).backgroundColor;
  const textColor = window.getComputedStyle(circleStyleElement).color;
  return { assignedContact, backgroundColorValue, textColor, userName };
}

function pushSelectedUser(event) {
  const { assignedContact, backgroundColorValue, textColor, userName } = getUserInfo(event);
  if (assignedTo.initials.includes(assignedContact) || assignedTo.colorCodes.includes(backgroundColorValue)) {
    return
  }
  assignedTo.initials.push(assignedContact);
  assignedTo.colorCodes.push(backgroundColorValue);
  assignedTo.textColor.push(textColor);
  assignedTo.userNames.push(userName);
}

function deleteSelectedUser(event) {
  const { assignedContact, backgroundColorValue, textColor, userName } = getUserInfo(event);
  const removeContact = assignedTo.initials.indexOf(assignedContact);
  const removeColorcode = assignedTo.colorCodes.indexOf(backgroundColorValue);
  const removeTextColor = assignedTo.colorCodes.indexOf(textColor);
  const removeUserName = assignedTo.colorCodes.indexOf(userName);
  assignedTo.initials.splice(removeContact, 1);
  assignedTo.colorCodes.splice(removeColorcode, 1);
  assignedTo.textColor.splice(removeTextColor, 1);
  assignedTo.userNames.splice(removeUserName, 1);
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
  const allItems = document.querySelectorAll('.category-dropdown ul li');
  allItems.forEach(item => item.classList.remove('selected-contact'));
  element.value =  clickedElement.innerHTML;
  clickedElement.classList.add('selected-contact');
  toggleCategoryContainer();
}

function addSubtaskVisibilityListener() {
    const inputElement = document.getElementById('subtask-input-id');
    inputElement.addEventListener("input", function(event) {
        const inputNotEmpty = isValueNotEmpty(event.target.value);
        toggleVisibility('subtast-add-button-id', !inputNotEmpty);
        toggleVisibility('subtask-del-and-confim-id', true);
        if (!inputNotEmpty) 
            toggleVisibility('subtask-del-and-confim-id', false);
    });
}

function toggleAddNewTaskMenu() {
  addSubtaskVisibilityListener();
  const inputElement = document.getElementById('subtask-input-id');
  inputElement.focus(); 
}

function deleteOrAddTaskMenu(isDelete) {
    const inputElement = document.getElementById('subtask-input-id');
    if (isDelete)
        inputElement.value = '';
    else
        addNewTaskMenu();
    toggleVisibility('subtask-del-and-confim-id', false);
    toggleVisibility('subtast-add-button-id', true);
    subtaskCounter = 0;
}

function addNewTaskMenu() {
    const inputElement = document.getElementById('subtask-input-id');
    subtaskList.push(inputElement.value);
    inputElement.value = '';
    renderSubtasks();
}

function renderSubtasks() {
  let element = document.getElementById('add-task-list-id');
  element.innerHTML = '';
  subtaskList.forEach((subtask, index) => {
    element.innerHTML  += templateSubtaskHTML(index, subtask);
  });
}
function editSubtask(index) {
  subtaskCounter +=1;
  if(subtaskCounter === 1) {
    const element = document.getElementById(`editable-span-id${index}`);
    const ListElement = document.getElementById(`substask-sontent-id${index}`);
    toggleVisibility(`subtask-edited-container-id${index}`, true);
    toggleVisibility(`subtask-default-container-id${index}`, false); 
    ListElement.classList.toggle('blue-line-highlight');
    element.setAttribute('contentEditable', 'true');
    element.focus();
    const maxLength = 30; 
  
    element.addEventListener('input', function() {
      const content = this.innerText;
      if (content.length > maxLength) {
        this.innerText = content.slice(0, maxLength);
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(this.childNodes[0], maxLength);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
  }
  else return;
}

function saveEditSubtask(index) {
  const element = document.getElementById(`editable-span-id${index}`);
  subtaskList[index] = element.innerText;
  renderSubtasks();
  subtaskCounter = 0;
}

function deleteSubtask(index) {
  subtaskList.splice(index, 1);
  renderSubtasks();
  subtaskCounter = 0;
}

function createTask() {
  const titleInput = document.getElementById('title-input-id').value;
  const textareaInput = document.getElementById('textarea-input-id').value;
  const dateInput = document.getElementById('date-input-id').value;
  // const titleInput = document.getElementById('title-input-id').value;
  // const titleInput = document.getElementById('title-input-id').value;
  currentUser.tasks.titles.push(titleInput)
  currentUser.tasks.descriptions.push(textareaInput)
  currentUser.tasks.dates.push(dateInput)
  console.log(assignedTo.userNames)
  console.log('dsffdF',currentUser)
}