let isUserLoggedIn;
let currentIndex = -1;
let assignedTo = {
  initials: [],
  colorCodes: [],
  textColors: [],
  userNames: [],
  userMails: [],
};
let subtaskList = {
  tasks: [],
  done: [],
};
let userIndex;
let prio = ["urgent", "medium", "low"];
let prioIndex = 1;
let isFilterActive = false;
let clickEventListener;

function filterAssignedToContacts() {
  document.getElementById("assignedto-input-id").addEventListener("input", function (event) {
    const searchTerm = event.target.value;
    isFilterActive = searchTerm.trim() !== "";
    const filteredContacts = currentUser.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    iterateOverContacts(filteredContacts);
  });
}

function renderAssignedToContacts(contacts = currentUser.contacts) {
  contacts.sort(sortContactsBySurname);
  iterateOverContacts(contacts);
}

function iterateOverContacts(contacts) {
  const assignedToContainer = document.getElementById("assigned-to-contacts-id");
  assignedToContainer.innerHTML = "";
  contacts.forEach((contact, index) => {
    if (contact.name === currentUser.userName) contact.name = contact.name + " (you)";
    const initials = getFirstLettersOfName(contact.name);
    textColor = isColorLight(contact.colorCode) ? "white" : "black";
    const isSelected = contacts[index].selected;
    assignedToContainer.innerHTML += templateAssignedToContainerHTML(
      contact.name,
      index,
      contact.colorCode,
      initials,
      textColor,
      isSelected,
      contact.email
    );
  });
}

function formatWithLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function setCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = formatWithLeadingZero(now.getMonth() + 1);
  const day = formatWithLeadingZero(now.getDate());
  let element = document.getElementById("date-input-id");
  element.min = `${year}-${month}-${day}`;
}

function closeAssignedToMenu() {
  document.addEventListener("click", function (event) {
    const clickInsideInput = event.target.closest("#assignedto-container-id");
    const clickInsideDropdown = event.target.closest("#assigned-to-contacts-id");
    if (!clickInsideDropdown && !clickInsideInput) {
      toggleAssignedToSection(true);
      document.getElementById("assignedto-input-id").value = "";
      document.getElementById("assignedto-input-id").placeholder = "Select contacts to assign";
      if (isFilterActive) {
        renderAssignedToContacts();
        isFilterActive = false;
      }
    }
  });
}

function toggleAssignedToSection(bool) {
  document.getElementById("assignedto-input-id").placeholder = "An: ";
  toggleVisibility("assigned-to-contacts-id", bool, "active");
  toggleVisibility("rotate-arrow-id", bool, "upsidedown");
  toggleVisibility("at-label-id", bool, "shrink-font-size");
}

function openAssignedbyArrow() {
  renderAssignedToContacts();
  document.getElementById("assignedto-input-id").placeholder = "Select contacts to assign";
  toggleSection("assigned-to-contacts-id", "active");
  toggleSection("rotate-arrow-id", "upsidedown");
  toggleSection("at-label-id", "shrink-font-size");
  document.getElementById("assignedto-input-id").value = "";
}

function renderAddedContacts() {
  let addedContactsElement = document.getElementById("added-contacts-id");
  addedContactsElement.innerHTML = "";
  assignedTo.colorCodes.forEach((colorCode, index) => {
    if (index > 4) return;
    addedContactsElement.innerHTML += templateaddedContactsHTML(
      index,
      colorCode,
      assignedTo.initials[index],
      assignedTo.textColors[index]
    );
  });
}

function selectedAssignedToUser(event, index) {
  userIndex = index;
  const svgElement = event.currentTarget.querySelector("svg");
  const spanElemnt = document.getElementById(`contact-id${index}`);
  const contact = currentUser.contacts.find((contact) => contact.name === spanElemnt.innerHTML);
  event.currentTarget.classList.toggle("selected-contact-at");
  if (event.currentTarget.classList.contains("selected-contact-at")) {
    svgElement.innerHTML = templateSvgCheckboxConfirmedHTML();
    pushSelectedUser(event);
    contact.selected = true;
  } else {
    svgElement.innerHTML = templateSvgDefaultCheckboxHTML();
    deleteSelectedUser(event);
    contact.selected = false;
  }
  renderAddedContacts();
}

function getUserInfo(event) {
  const circleStyleElement = event.currentTarget.querySelector(".circle-style");
  const userName = document.getElementById(`contact-id${userIndex}`).innerHTML;
  const userMail = document.getElementById(`at-user-mail-id${userIndex}`).innerHTML;
  const assignedContact = circleStyleElement.innerText;
  const backgroundColorValue = window.getComputedStyle(circleStyleElement).backgroundColor;
  const textColor = window.getComputedStyle(circleStyleElement).color;
  return {assignedContact, backgroundColorValue, textColor, userName, userMail};
}

function pushSelectedUser(event) {
  const {assignedContact, backgroundColorValue, textColor, userName, userMail} = getUserInfo(event);
  if (assignedTo.userMails.includes(userMail)) return;
  assignedTo.initials.push(assignedContact);
  assignedTo.colorCodes.push(backgroundColorValue);
  assignedTo.textColors.push(textColor);
  assignedTo.userNames.push(userName);
  assignedTo.userMails.push(userMail);
}

function deleteSelectedUser(event) {
  const userMail = document.getElementById(`at-user-mail-id${userIndex}`).innerHTML;
  const index = assignedTo.userMails.indexOf(userMail);
  assignedTo.initials.splice(index, 1);
  assignedTo.colorCodes.splice(index, 1);
  assignedTo.textColors.splice(index, 1);
  assignedTo.userNames.splice(index, 1);
  assignedTo.userMails.splice(index, 1);
}

function togglePrioImg(clickedId) {
  const imageIds = ["urgent-default-id", "medium-default-id", "low-default-id"];
  imageIds.forEach((id, index) => {
    const image = document.getElementById(id);
    if (id === clickedId) {
      prioIndex = index;
      image.src = `./assets/img/${id.replace("-default-id", "_highlighted.png")}`;
    } else image.src = `./assets/img/${id.replace("-default-id", "_default.png")}`;
  });
}

function closeCategoryMenu() {
  document.addEventListener("click", function (event) {
    const clickInsideInput = event.target.closest("#category-container-id");
    if (!clickInsideInput) {
      toggleVisibility("rotate-arrow-category-id", true, "upsidedown");
      toggleVisibility("category-id", true, "active");
    }
  });
}

function toggleCategoryContainer() {
  toggleSection("rotate-arrow-category-id", "upsidedown");
  toggleSection("category-id", "active");
}

function selectCategory(clickedElement) {
  const element = document.getElementById("category-input-id");
  const allItems = document.querySelectorAll(".category-dropdown ul li");
  allItems.forEach((item) => item.classList.remove("selected-contact-at"));
  element.value = clickedElement.innerHTML;
  clickedElement.classList.add("selected-contact-at");
  toggleCategoryContainer(true);
}

function addSubtaskVisibilityListener() {
  const inputElement = document.getElementById("subtask-input-id");
  inputElement.addEventListener("input", function (event) {
    const inputNotEmpty = isValueNotEmpty(event.target.value);
    toggleVisibility("subtask-add-button-id", !inputNotEmpty);
    toggleVisibility("subtask-del-and-confirm-id", true);
    if (!inputNotEmpty) toggleVisibility("subtask-del-and-confirm-id", false);
  });
}

function toggleAddNewTaskMenu() {
  addSubtaskVisibilityListener();
  const inputElement = document.getElementById("subtask-input-id");
  inputElement.focus();
}

function deleteOrAddTaskMenu(isDelete) {
  const inputElement = document.getElementById("subtask-input-id");
  if (isDelete) inputElement.value = "";
  else addNewTaskMenu();
  toggleVisibility("subtask-del-and-confirm-id", false);
  toggleVisibility("subtask-add-button-id", true);
}

function addSubtaskByEnter() {
  const inputElement = document.getElementById("subtask-input-id");
  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && inputElement.value !== "") {
      deleteOrAddTaskMenu(false);
    }
  });
}

function addNewTaskMenu() {
  const inputElement = document.getElementById("subtask-input-id");
  subtaskList.tasks.push(inputElement.value);
  subtaskList.done.push(false);
  inputElement.value = "";
  renderSubtasks();
}

function renderSubtasks() {
  let element = document.getElementById("add-task-list-id");
  element.innerHTML = "";
  subtaskList.tasks.forEach((subtask, index) => {
    element.innerHTML += templateSubtaskHTML(index, subtask);
  });
}

function toggleReadBorderInSubtasks(index, listElement) {
  const saveElement = document.getElementById(`save-edit-subtask-id${index}`);
  const deleteElement = document.getElementById(`delete-edit-subtask-id${index}`);
  function handleClick(event) {
    const isClickOutsideList = !listElement.contains(event.target);
    const isClickOnSaveOrDelete =
      saveElement.contains(event.target) || deleteElement.contains(event.target);
    if (isClickOutsideList) {
      disableFiledElements(true);
      document.getElementById("subtask-input-id").value = "";
      toggleVisibility("subtask-del-and-confirm-id", false);
      toggleVisibility("subtask-add-button-id", true);
      toggleVisibility(`substask-content-id${currentIndex}`, false, "red-line-highlight");
    } else if (isClickOnSaveOrDelete) {
      disableFiledElements(false);
      toggleVisibility(`substask-content-id${currentIndex}`, true, "red-line-highlight");
      document.removeEventListener("click", handleClick);
    } else {
      disableFiledElements(false);
      toggleVisibility(`substask-content-id${currentIndex}`, true, "red-line-highlight");
    }
  }
  clickEventListener = handleClick;
  document.addEventListener("click", clickEventListener);
}

function disableFiledElements(bool) {
  const inputElement = document.getElementById("subtask-input-id");
  const createTaskElement = document.getElementById("at-add-btn");
  inputElement.disabled = bool;
  createTaskElement.disabled = bool;
  showSubtasksError(bool);
}

function showSubtasksError(bool) {
  if (bool) {
    toggleVisibility("subtask-err-msg-id", true);
    const targetElement = document.getElementById("subtask-err-msg-id");
    targetElement.scrollIntoView({behavior: "smooth", block: "start"});
  } else toggleVisibility("subtask-err-msg-id", false);
}

function editSubtask(index) {
  currentIndex = index;
  const listElement = document.getElementById(`substask-content-id${index}`);
  toggleReadBorderInSubtasks(index, listElement);
  handleFirstSubtaskEdit(index, listElement);
}

function handleFirstSubtaskEdit(index, listElement) {
  disableAllSubtasksExcept(index);
  const element = document.getElementById(`editable-span-id${index}`);
  toggleVisibility(`subtask-edited-container-id${index}`, true);
  toggleVisibility(`subtask-default-container-id${index}`, false);
  makeElementEditableWithMaxLength(element);
  listElement.classList.toggle("blue-line-highlight");
}

function disableAllSubtasksExcept(index) {
  const totalNumberOfSubtasks = document.querySelectorAll('[id^="substask-content-id"]').length;
  for (let i = 0; i < totalNumberOfSubtasks; i++) {
    if (i !== index) toggleVisibility(`substask-content-id${i}`, false, "disabled-svg");
  }
}

function makeElementEditableWithMaxLength(element) {
  element.setAttribute("contentEditable", "true");
  element.focus();
}

function saveEditSubtask(index) {
  const element = document.getElementById(`editable-span-id${index}`);
  if (element.innerText === "")
    subtaskList.tasks[index] = "Ups, this was almost an empty subtask. saved! :)";
  else subtaskList.tasks[index] = element.innerText;
  renderSubtasks();
}

function deleteSubtask(index) {
  subtaskList.tasks.splice(index, 1);
  subtaskList.done.splice(index, 1);
  renderSubtasks();
}

function getAddTaskInputs() {
  const titleInput = document.getElementById("title-input-id").value;
  const textareaInput = document.getElementById("textarea-input-id").value;
  const dateInput = document.getElementById("date-input-id").value;
  const categoryInput = document.getElementById("category-input-id").value;
  return {titleInput, textareaInput, dateInput, categoryInput};
}

function createTask() {
  const {titleInput, textareaInput, dateInput, categoryInput} = getAddTaskInputs();
  const atBoolArr = [false, false, false, false, false, false];
  validateInputs(titleInput, dateInput, categoryInput, atBoolArr);
  if (handlerAddTaskValidation(atBoolArr)) {
    handlerAddTaskValidation(atBoolArr);
    toggleVisibility("rotate-err-arrow-id", true);
    return;
  }
  toggleVisibility("rotate-err-arrow-id", false);
  pushTasks(titleInput, textareaInput, dateInput, categoryInput);
  clearAllSelectedUsers();
  renderAssignedToContacts();
  save();
  sendUserToBoard();
}

function validateInputs(titleInput, dateInput, categoryInput, atBoolArr) {
  validateInput(titleInput, atBoolArr, 0, 3);
  validateInput(dateInput, atBoolArr, 1, 4);
  validateInput(categoryInput, atBoolArr, 2, 5);
}

function sendUserToBoard() {
  toggleScrollbar("hidden");
  toggleVisibility("at-success-msg-id", true);
  toggleVisibility("trans-bg-id", true);
  setTimeout(() => {
    toggleVisibility("at-success-msg-id", false, "slide-sm");
    setTimeout(() => {
      window.location.assign("./board.html");
    }, 900);
  }, 200);
}

function pushTasks(titleInput, textareaInput, dateInput, categoryInput, section = "toDo") {
  currentUser.tasks.titles.push(titleInput);
  currentUser.tasks.descriptions.push(textareaInput);
  currentUser.tasks.dates.push(dateInput);
  currentUser.tasks.assignedTo.push(assignedTo);
  currentUser.tasks.prios.push(prio[prioIndex]);
  currentUser.tasks.categories.push(categoryInput);
  currentUser.tasks.subtasks.push(subtaskList);
  currentUser.tasks.board.push(section);
}

function validateInput(input, atBoolArr, index1, index2) {
  if (input.trim() === "") atBoolArr[index1] = atBoolArr[index2] = true;
}

function handlerAddTaskValidation(atBoolArr) {
  toggleVisibility("empty-title-id", atBoolArr[0]);
  toggleVisibility("empty-date-id", atBoolArr[1]);
  toggleVisibility("empty-category-id", atBoolArr[2]);
  toggleVisibility("at-title-border-id", !atBoolArr[3], "error-border");
  toggleVisibility("at-date-border-id", !atBoolArr[4], "error-border");
  toggleVisibility("category-container-id", !atBoolArr[5], "error-border");
  return atBoolArr.some(Boolean);
}

function clearAll() {
  document.removeEventListener("click", clickEventListener);
  clickEventListener = null;
  clearAllInputs();
  clearAllLists();
  clearAllErrMsg();
  clearAllSelectedUsers();
  renderAssignedToContacts();
  renderAddedContacts();
  renderSubtasks();
  togglePrioImg("medium-default-id");
  toggleVisibility("subtask-del-and-confirm-id", false);
  toggleVisibility("subtask-add-button-id", true);
  toggleVisibility("rotate-err-arrow-id", false);
  disableFiledElements(false);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}
function clearAllInputs() {
  document.getElementById("title-input-id").value = "";
  document.getElementById("textarea-input-id").value = "";
  document.getElementById("subtask-input-id").value = "";
  document.getElementById("date-input-id").value = "";
  document.getElementById("category-input-id").value = "";
}

function clearAllLists() {
  subtaskList.tasks.splice(0, subtaskList.tasks.length);
  assignedTo.userNames.splice(0, assignedTo.userNames.length);
  assignedTo.userMails.splice(0, assignedTo.userMails.length);
  assignedTo.colorCodes.splice(0, assignedTo.colorCodes.length);
  assignedTo.initials.splice(0, assignedTo.initials.length);
  assignedTo.textColors.splice(0, assignedTo.textColors.length);
  subtaskList.tasks.splice(0, subtaskList.tasks.length);
  subtaskList.done.splice(0, subtaskList.done.length);
}

function clearAllErrMsg() {
  toggleVisibility("empty-title-id", false);
  toggleVisibility("empty-date-id", false);
  toggleVisibility("empty-category-id", false);
  toggleVisibility("at-title-border-id", !false, "error-border");
  toggleVisibility("at-date-border-id", !false, "error-border");
  toggleVisibility("category-container-id", !false, "error-border");
}

function clearAllSelectedUsers() {
  currentUser.contacts.forEach((contact) => {
    contact.selected = false;
  });
}

function changeInputColor() {
  const dateInput = document.getElementById("date-input-id");
  dateInput.style.removeProperty("-webkit-datetime-edit");
  dateInput.style.color = "black";
}
