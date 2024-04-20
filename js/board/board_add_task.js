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

/**
 * Adds an event listener to the assigned to input element to filter contacts by name.
 */
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

/**
 * Renders the assigned to contacts in the assigned to dropdown menu.
 * @param {Array} [contacts=currentUser.contacts] - The array of contacts to render. Defaults to currentUser.contacts.
 */
function renderAssignedToContacts(contacts = currentUser.contacts) {
  contacts.sort(sortContactsBySurname);
  iterateOverContacts(contacts);
}

/**
 * Iterates over the provided contacts array and renders each contact in the assigned to dropdown menu.
 * @param {Array} contacts - The array of contacts to iterate over and render.
 */
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

/**
 * Closes the assigned-todropdown menu when a click event occurs outside of the menu or the input field.
 */
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

/**
 * Toggles the visibility of the assigned-to drop down menu.
 * @param {boolean} bool - A boolean value indicating whether to show or hide the assigned-to section.
 */
function toggleAssignedToSection(bool) {
  document.getElementById("assignedto-input-id").placeholder = "An: ";
  toggleVisibility("assigned-to-contacts-id", bool, "active");
  toggleVisibility("rotate-arrow-id", bool, "upsidedown");
  toggleVisibility("at-label-id", bool, "shrink-font-size");
}

/**
 * Opens the assigned-by onclick on the arrow image.
 */
function openAssignedByArrow() {
  renderAssignedToContacts();
  document.getElementById("assignedto-input-id").placeholder = "Select contacts to assign";
  toggleSection("assigned-to-contacts-id", "active");
  toggleSection("rotate-arrow-id", "upsidedown");
  toggleSection("at-label-id", "shrink-font-size");
  document.getElementById("assignedto-input-id").value = "";
}

/**
 * Renders the added contacts in the assigned-to down menu.
 */
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

/**
 * Handles the selection of an assigned-to user.
 * @param {Event} event - The event object.
 * @param {number} index - The index of the user.
 */
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

/**
 * Adds the selected user to the assignedTo list.
 * @param {Event} event - The event object.
 */
function pushSelectedUser(event) {
  const {assignedContact, backgroundColorValue, textColor, userName, userMail} = getUserInfo(event);
  if (assignedTo.userMails.includes(userMail)) return;
  assignedTo.initials.push(assignedContact);
  assignedTo.colorCodes.push(backgroundColorValue);
  assignedTo.textColors.push(textColor);
  assignedTo.userNames.push(userName);
  assignedTo.userMails.push(userMail);
}

/**
 * Deletes the selected user from the assignedTo list.
 * @param {Event} event - The event object.
 */
function deleteSelectedUser(event) {
  const userMail = document.getElementById(`at-user-mail-id${userIndex}`).innerHTML;
  const index = assignedTo.userMails.indexOf(userMail);
  assignedTo.initials.splice(index, 1);
  assignedTo.colorCodes.splice(index, 1);
  assignedTo.textColors.splice(index, 1);
  assignedTo.userNames.splice(index, 1);
  assignedTo.userMails.splice(index, 1);
}

/**
 * Toggles the priority image based on the clicked ID.
 * @param {string} clickedId - The ID of the clicked element.
 */
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

/**
 * Closes the category menu if a click event occurs outside of it.
 */
function closeCategoryMenu() {
  document.addEventListener("click", function (event) {
    const clickInsideInput = event.target.closest("#category-container-id");
    if (!clickInsideInput) {
      toggleVisibility("rotate-arrow-category-id", true, "upsidedown");
      toggleVisibility("category-id", true, "active");
    }
  });
}

/**
 * Toggles the visibility of the category container.
 */
function toggleCategoryContainer() {
  toggleSection("rotate-arrow-category-id", "upsidedown");
  toggleSection("category-id", "active");
}

/**
 * Selects a category and updates the input value accordingly.
 * @param {HTMLElement} clickedElement - The clicked category element.
 */
function selectCategory(clickedElement) {
  const element = document.getElementById("category-input-id");
  const allItems = document.querySelectorAll(".category-dropdown ul li");
  allItems.forEach((item) => item.classList.remove("selected-contact-at"));
  element.value = clickedElement.innerHTML;
  clickedElement.classList.add("selected-contact-at");
  toggleCategoryContainer(true);
}

/**
 * Adds a listener to the subtask input element to toggle visibility of add and delete buttons.
 */
function addSubtaskVisibilityListener() {
  const inputElement = document.getElementById("subtask-input-id");
  inputElement.addEventListener("input", function (event) {
    const inputNotEmpty = isValueNotEmpty(event.target.value);
    toggleVisibility("subtask-add-button-id", !inputNotEmpty);
    toggleVisibility("subtask-del-and-confirm-id", true);
    if (!inputNotEmpty) toggleVisibility("subtask-del-and-confirm-id", false);
  });
}

/**
 * Toggles the visibility of the add new task menu.
 */
function toggleAddNewTaskMenu() {
  addSubtaskVisibilityListener();
  const inputElement = document.getElementById("subtask-input-id");
  inputElement.focus();
}

/**
 * Deletes or adds a task menu based on the provided parameter.
 * @param {boolean} isDelete - Indicates whether to delete the task menu.
 */
function deleteOrAddTaskMenu(isDelete) {
  const inputElement = document.getElementById("subtask-input-id");
  if (isDelete) inputElement.value = "";
  else addNewTaskMenu();
  toggleVisibility("subtask-del-and-confirm-id", false);
  toggleVisibility("subtask-add-button-id", true);
}

/**
 * Adds a subtask when the Enter key is pressed.
 */
function addSubtaskByEnter() {
  const inputElement = document.getElementById("subtask-input-id");
  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && inputElement.value !== "") {
      deleteOrAddTaskMenu(false);
    }
  });
}

/**
 * Adds a new task to the subtask list and renders the updated list.
 */
function addNewTaskMenu() {
  const inputElement = document.getElementById("subtask-input-id");
  subtaskList.tasks.push(inputElement.value);
  subtaskList.done.push(false);
  inputElement.value = "";
  renderSubtasks();
}

/**
 * Renders the subtasks in the UI.
 */
function renderSubtasks() {
  let element = document.getElementById("add-task-list-id");
  element.innerHTML = "";
  subtaskList.tasks.forEach((subtask, index) => {
    element.innerHTML += templateSubtaskHTML(index, subtask);
  });
}

/**
 * Deletes a subtask from the list.
 * @param {number} index - The index of the subtask to delete.
 */
function deleteSubtask(index) {
  subtaskList.tasks.splice(index, 1);
  subtaskList.done.splice(index, 1);
  renderSubtasks();
}

/**
 * Initiates the editing of a subtask.
 * @param {number} index - The index of the subtask being edited.
 */
function editSubtask(index) {
  currentIndex = index;
  const listElement = document.getElementById(`substask-content-id${index}`);
  toggleReadBorderInSubtasks(index, listElement);
  handleFirstSubtaskEdit(index, listElement);
}

/**
 * Saves the edited subtask content.
 * @param {number} index - The index of the subtask being edited.
 */
function saveEditSubtask(index) {
  const element = document.getElementById(`editable-span-id${index}`);
  if (element.innerText === "")
    subtaskList.tasks[index] = "Ups, this was almost an empty subtask. saved! :)";
  else subtaskList.tasks[index] = element.innerText;
  renderSubtasks();
}

/**
 * Creates a new task based on the input values and sends the user to the board page.
 */
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

/**
 * Sends the user to the board page after a successful task creation.
 */
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

/**
 * Pushes the new task details into the current user's task list.
 * @param {string} titleInput - The title input value.
 * @param {string} textareaInput - The textarea input value.
 * @param {string} dateInput - The date input value.
 * @param {string} categoryInput - The category input value.
 * @param {string} section - The section to which the task belongs.
 */
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
