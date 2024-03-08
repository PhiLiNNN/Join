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
let prio = ['urgnet', 'medium', 'low'];
let prioIndex = 1;

function initAddTask() {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(currentUser)
  renderAssignedToContacts();
  addSubtaskVisibilityListener();
  closeAssignedToMenu();
  closeCategoryMenu();
  
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
  const assignedToContainer = document.getElementById('assigned-to-contacts-id');
  currentUser.contacts.forEach((contact, index) => {
    if (contact.name === currentUser.userName) 
      contact.name = contact.name + ' (you)'
    const initials =  getFirstLettersOfName(contact.name);
    textColor = isColorLight(contact.colorCode) ? 'white' : 'black'; 
    assignedToContainer.innerHTML += templateAssignedToContainerHTML(contact.name, index, contact.colorCode, initials, textColor);
  }); 
}

function closeAssignedToMenu() {
  document.addEventListener('click', function (event) {
    const clickInsideInput = event.target.closest('#assignedto-container-id');
    const clickInsideDropdown = event.target.closest('#assigned-to-contacts-id');
    if (!clickInsideDropdown && !clickInsideInput) {
      toggleAssignedToSection(true)
      document.getElementById('assignedto-input-id').value = '';
    }
  });
}

function toggleAssignedToSection(bool) {
  toggleVisibility('assigned-to-contacts-id', bool, 'active');
  toggleVisibility('rotate-arrow-id', bool, 'upsidedown');
  toggleVisibility('at-label-id', bool,'shrink-font-size');
}

function openAssignedbyArrow() {
  toggleSection('assigned-to-contacts-id', 'active');
  toggleSection('rotate-arrow-id',  'upsidedown');
  toggleSection('at-label-id', 'shrink-font-size');
  document.getElementById('assignedto-input-id').value = '';
}

function toggleSection(elementID, toggleClass) {
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
  imageIds.forEach((id, index) => {
    
    const image = document.getElementById(id);
    if (id === clickedId) {
      prioIndex = index;
      image.src = `./assets/img/${id.replace('-default-id', '_highlighted.png')}`;
    }
    else 
      image.src = `./assets/img/${id.replace('-default-id', '_default.png')}`;
  });
}



function closeCategoryMenu() {
  document.addEventListener('click', function (event) {
    const clickInsideInput = event.target.closest('#category-container-id');
    if (!clickInsideInput) {
      toggleVisibility('rotate-arrow-category-id', true, 'upsidedown');
      toggleVisibility('category-id',true,'active');
    }
  });
}

function toggleCategoryContainer() {
  toggleSection('rotate-arrow-category-id', 'upsidedown');
  toggleSection('category-id','active');
}

function selectCategory(clickedElement){
  const element = document.getElementById('category-input-id');
  const allItems = document.querySelectorAll('.category-dropdown ul li');
  allItems.forEach(item => item.classList.remove('selected-contact'));
  element.value =  clickedElement.innerHTML;
  clickedElement.classList.add('selected-contact');
  toggleCategoryContainer(true);
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
  const ListElement = document.getElementById(`substask-content-id${index}`);
  if (subtaskCounter === 1) {
    const element = document.getElementById(`editable-span-id${index}`);
    toggleVisibility(`subtask-edited-container-id${index}`, true);
    toggleVisibility(`subtask-default-container-id${index}`, false); 
    makeElementEditableWithMaxLength(element, 30);
    ListElement.classList.toggle('blue-line-highlight');
  }
  document.addEventListener('click', function(event) {
  const clickedElement = event.target;
  const isSubtaskContent = clickedElement.closest(`[id^="substask-content-id${index}"]`);
  const isSubtaskDefaultContainer = clickedElement.closest(`[id^="subtask-default-container-id${index}"]`);
  const isSubtaskEditedContainer = clickedElement.closest(`[id^="subtask-edited-container-id${index}"]`);
  if (!isSubtaskContent && !isSubtaskDefaultContainer && !isSubtaskEditedContainer) 
    ListElement.classList.add('red-line-highlight');
  });
}

function makeElementEditableWithMaxLength(element, maxLength) {
  element.setAttribute('contentEditable', 'true');
  element.focus();
  element.addEventListener('input', function() {
  const maxLength = 30;
  if (this.innerText.length > maxLength) {
    this.innerText = this.innerText.slice(0, maxLength);
  }
});
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

async function createTask() {
  const titleInput = document.getElementById('title-input-id').value;
  const textareaInput = document.getElementById('textarea-input-id').value;
  const dateInput = document.getElementById('date-input-id').value;
  const categoryInput = document.getElementById('category-input-id').value;
  const atBoolArr = [false, false, false, false, false, false];
  validateInput(titleInput, atBoolArr, 0, 3);
  validateInput(dateInput, atBoolArr, 1, 4);
  validateInput(categoryInput, atBoolArr, 2, 5);
  if (handlerAddTaskValidation(atBoolArr)) {
    handlerAddTaskValidation(atBoolArr);
    return;
  }
  updateCurrentUser(titleInput, textareaInput, dateInput, categoryInput);
  await sendAddTask();
}

function updateCurrentUser(titleInput, textareaInput, dateInput, categoryInput) {
  currentUser.tasks.titles.push(titleInput);
  currentUser.tasks.descriptions.push(textareaInput)
  currentUser.tasks.dates.push(dateInput)
  currentUser.tasks.assignedTo.push(assignedTo.userNames)
  currentUser.tasks.prios.push(prio[prioIndex])
  currentUser.tasks.categories.push(categoryInput)
  currentUser.tasks.subtasks.push(subtaskList)
}

function validateInput(input, atBoolArr, index1, index2) {
  if (input.trim() === "")
    atBoolArr[index1] = atBoolArr[index2] = true;
}

function handlerAddTaskValidation(atBoolArr) {
    toggleVisibility('empty-title-id', atBoolArr[0]);
    toggleVisibility('empty-date-id', atBoolArr[1]);
    toggleVisibility('empty-category-id', atBoolArr[2]);
    toggleVisibility('at-title-border-id', !atBoolArr[3],'error-border')
    toggleVisibility('at-date-border-id', !atBoolArr[4],'error-border')
    toggleVisibility('category-container-id', !atBoolArr[5],'error-border')
    return atBoolArr.some(Boolean);
}

async function sendAddTask() {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  await addNewUserToBackend(currentUser);
}