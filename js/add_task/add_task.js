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
let prio = ["urgent", "medium", "low"];
let prioIndex = 1;
let isFilterActive = false;
let clickEventListener;

let tasks = {
  title: "",
  description: "",
  due_date: "",
  category: "",
  board: "",
  priority: "",
  assigned_to: [],
  subtasks: [],
};
let contacts;
let dummyCurrentUser;
/**
 * Initializes the add task functionality.
 * Sets favicon, checks user login status, renders assigned contacts, sets current date for date picker,
 * adds event listener for adding subtasks by pressing enter key, adds visibility listener for subtasks (add  subtask image),
 * closes assigned to dropdown menu, closes category menu, filters assigned to contacts,
 * highlights add task menu on footer/sidebar navigation, displays the whole body-add tasks content, and loads header initials.
 */
async function initAddTask() {
  dummyCurrentUser = "Philipp Wendschuch";
  setFavicon();
  isUserLoggedIn = checkUserLogInOLD();
  if (!isUserLoggedIn) window.location.assign("./error_page.html");
  contacts = await getItem(CONTACTS_API_URL);
  console.log("contacts :>> ", contacts);
  clearAllSelectedUsers();
  renderAssignedToContacts(contacts);
  setCurrentDate();
  addSubtaskByEnter();
  addSubtaskVisibilityListener();
  closeAssignedToMenu();
  closeCategoryMenu();
  filterAssignedToContacts();
  toggleVisibility("add-task-menu-id", false, "highlight-menu");
  toggleVisibility("at-body-id", true);
  loadHeaderInitials(dummyCurrentUser);
}

/**
 * Adds an event listener to the assigned to input element to filter contacts by name.
 */
function filterAssignedToContacts() {
  document.getElementById("assignedto-input-id").addEventListener("input", function (event) {
    const searchTerm = event.target.value;
    isFilterActive = searchTerm.trim() !== "";
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    iterateOverContacts(filteredContacts);
  });
}

/**
 * Renders the assigned to contacts in the assigned to dropdown menu.
 * @param {Array} [contacts] - The array of contacts to render.
 */
function renderAssignedToContacts(contacts) {
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
    if (contact.name === dummyCurrentUser) contact.name = contact.name + " (you)";
    const initials = getFirstLettersOfName(contact.name);
    textColor = isColorLight(contact.colorCode) ? "white" : "black";
    const isSelected = contacts[index].selected;
    assignedToContainer.innerHTML += templateAssignedToContainerHTML(
      contact.name,
      contact.colorCode,
      initials,
      textColor,
      isSelected,
      contact.email,
      contact.id
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
        renderAssignedToContacts(contacts);
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
}

/**
 * Opens the assigned-by onclick on the arrow image.
 */
function openAssignedByArrow() {
  renderAssignedToContacts(contacts);
  document.getElementById("assignedto-input-id").placeholder = "Select contacts to assign";
  toggleSection("assigned-to-contacts-id", "active");
  toggleSection("rotate-arrow-id", "upsidedown");
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
function selectedAssignedToUser(event, contactID) {
  const svgElement = event.currentTarget.querySelector("svg");
  const spanElement = document.getElementById(`contact-id${contactID}`);
  const contact = contacts.find((contact) => contact.name === spanElement.innerHTML);
  event.currentTarget.classList.toggle("selected-contact-at");
  if (event.currentTarget.classList.contains("selected-contact-at")) {
    svgElement.innerHTML = templateSvgCheckboxConfirmedHTML();
    pushSelectedUser(contactID);
    contact.selected = true;
  } else {
    svgElement.innerHTML = templateSvgDefaultCheckboxHTML();
    deleteSelectedUser(contactID);
    contact.selected = false;
  }
  renderAddedContacts();
}

/**
 * Adds the selected user to the assignedTo list.
 * @param {Event} event - The event object.
 */
function pushSelectedUser(contactID) {
  const {assignedContact, backgroundColorValue, textColor, userName, userMail} = getUserInfo(contactID);
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
function deleteSelectedUser(contactID) {
  const userMail = document.getElementById(`at-user-mail-id${contactID}`).innerHTML;
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
  if (element.innerText === "") subtaskList.tasks[index] = "Ups, this was almost an empty subtask. saved! :)";
  else subtaskList.tasks[index] = element.innerText;
  renderSubtasks();
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
  console.log("tasks :>> ", tasks);
  clearAllSelectedUsers();
  renderAssignedToContacts(contacts);
  //save();
  //sendUserToBoard();
}
