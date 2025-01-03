/**
 * Formats the provided value with a leading zero if it is less than 10.
 * @param {number} value - The value to format.
 * @returns {string} The formatted value with a leading zero if necessary.
 */
function formatWithLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

/**
 * Sets the current date as the minimum value for the date input field.
 */
function setCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = formatWithLeadingZero(now.getMonth() + 1);
  const day = formatWithLeadingZero(now.getDate());
  let element = document.getElementById("date-input-id");
  element.min = `${year}-${month}-${day}`;
}

/**
 * Retrieves information about the selected user.
 * @param {Event} event - The event object.
 * @returns {Object} Information about the selected user.
 */
function getUserInfo(contactID) {
  const circleStyleElement = event.currentTarget.querySelector(".circle-style");
  const userName = document.getElementById(`contact-id${contactID}`).innerHTML;
  const userMail = document.getElementById(`at-user-mail-id${contactID}`).innerHTML;
  const assignedContact = circleStyleElement.innerText;
  const backgroundColorValue = window.getComputedStyle(circleStyleElement).backgroundColor;
  const textColor = window.getComputedStyle(circleStyleElement).color;
  return {assignedContact, backgroundColorValue, textColor, userName, userMail};
}

/**
 * Toggles the red border in the subtasks list when clicking outside or on save/delete buttons.
 * @param {number} index - The index of the subtask being edited.
 * @param {HTMLElement} listElement - The HTML element representing the subtasks list.
 */
function toggleReadBorderInSubtasks(index, listElement) {
  const saveElement = document.getElementById(`save-edit-subtask-id${index}`);
  const deleteElement = document.getElementById(`delete-edit-subtask-id${index}`);
  function handleClick(event) {
    const isClickOutsideList = !listElement.contains(event.target);
    const isClickOnSave = saveElement.contains(event.target);
    const isClickOnDelete = deleteElement.contains(event.target);
    if (isClickOutsideList) setIsClickedOutsideLogic();
    else if (isClickOnSave) setIsClickOnSaveLogic(handleClick);
    else if (isClickOnDelete) setIsClickOnDeleteLogic(handleClick);
    else setAllUserInputsCorrectLogic();
  }
  clickEventListener = handleClick;
  document.addEventListener("click", clickEventListener);
}

/**
 * Handles the logic when all user inputs are correct.
 */
function setAllUserInputsCorrectLogic() {
  disableFiledElements(false);
  toggleVisibility(`substask-content-id${currentIndex}`, true, "red-line-highlight");
}

/**
 * Handles the logic when the delete action is clicked.
 */
function setIsClickOnDeleteLogic(handleClick) {
  disableFiledElements(false);
  document.removeEventListener("click", handleClick);
}

/**
 * Handles the logic when the save action is clicked.
 */
function setIsClickOnSaveLogic(handleClick) {
  disableFiledElements(false);
  toggleVisibility(`substask-content-id${currentIndex}`, true, "red-line-highlight");
  document.removeEventListener("click", handleClick);
}

/**
 * Handles the logic when a click event occurs outside the list of subtasks.
 */
function setIsClickedOutsideLogic() {
  disableFiledElements(true);
  document.getElementById("subtask-input-id").value = "";
  toggleVisibility("subtask-del-and-confirm-id", false);
  toggleVisibility("subtask-add-button-id", true);
  toggleVisibility(`substask-content-id${currentIndex}`, false, "red-line-highlight");
}

/**
 * Shows or hides the subtasks error message and scrolls to it if shown.
 * @param {boolean} bool - Indicates whether to show or hide the error message.
 */
function showSubtasksError(bool) {
  if (bool) {
    toggleVisibility("subtask-err-msg-id", true);
    const targetElement = document.getElementById("subtask-err-msg-id");
    targetElement.scrollIntoView({behavior: "smooth", block: "start"});
  } else toggleVisibility("subtask-err-msg-id", false);
}

/**
 * Disables or enables the subtask input field and create task button.
 * @param {boolean} bool - Indicates whether to disable or enable the elements.
 */
function disableFiledElements(bool) {
  const inputElement = document.getElementById("subtask-input-id");
  const createTaskElement = document.getElementById("at-add-btn");
  inputElement.disabled = bool;
  createTaskElement.disabled = bool;
  showSubtasksError(bool);
}

/**
 * Handles the first subtask edit by disabling other subtasks and making the selected one editable.
 * @param {number} index - The index of the subtask being edited.
 * @param {HTMLElement} listElement - The HTML element representing the subtasks list.
 */
function handleFirstSubtaskEdit(index, listElement) {
  disableAllSubtasksExcept(index);
  const element = document.getElementById(`editable-span-id${index}`);
  toggleVisibility(`subtask-edited-container-id${index}`, true);
  toggleVisibility(`subtask-default-container-id${index}`, false);
  makeElementEditable(element);
  listElement.classList.toggle("blue-line-highlight");
}

/**
 * Disables all subtasks in the list except the one being edited.
 * @param {number} index - The index of the subtask being edited.
 */
function disableAllSubtasksExcept(index) {
  const totalNumberOfSubtasks = document.querySelectorAll('[id^="substask-content-id"]').length;
  for (let i = 0; i < totalNumberOfSubtasks; i++) {
    if (i !== index) toggleVisibility(`substask-content-id${i}`, false, "disabled-svg");
  }
}

/**
 * Makes an HTML element editable.
 * @param {HTMLElement} element - The HTML element to make editable.
 */
function makeElementEditable(element) {
  element.setAttribute("contentEditable", "true");
  element.focus();
}

/**
 * Creates a new task based on the input values and sends the user to the board page.
 */
function getAddTaskInputs() {
  const titleInput = document.getElementById("title-input-id").value;
  const textareaInput = document.getElementById("textarea-input-id").value;
  const dateInput = document.getElementById("date-input-id").value;
  const categoryInput = document.getElementById("category-input-id").value;
  return {titleInput, textareaInput, dateInput, categoryInput};
}

/**
 * Validates an input value and sets the corresponding boolean values in the array.
 * @param {string} input - The input value to validate.
 * @param {boolean[]} atBoolArr - An array indicating which inputs are valid.
 * @param {number} index1 - The index of the first boolean value to set.
 * @param {number} index2 - The index of the second boolean value to set.
 */
function validateInput(input, atBoolArr, index1, index2) {
  if (input.trim() === "") atBoolArr[index1] = atBoolArr[index2] = true;
}

/**
 * Validates the input values for a new task.
 * @param {string} titleInput - The title input value.
 * @param {string} dateInput - The date input value.
 * @param {string} categoryInput - The category input value.
 * @param {boolean[]} atBoolArr - An array indicating which inputs are valid.
 */
function validateInputs(titleInput, dateInput, categoryInput, atBoolArr) {
  validateInput(titleInput, atBoolArr, 0, 3);
  validateInput(dateInput, atBoolArr, 1, 4);
  validateInput(categoryInput, atBoolArr, 2, 5);
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
  tasks.title = titleInput;
  tasks.descriptions = textareaInput;
  tasks.dates = dateInput;
  tasks.assigned_to.push(assignedTo);
  tasks.priority = prio[prioIndex];
  tasks.category = categoryInput;
  tasks.subtasks.push(subtaskList);
  tasks.board = section;
}

/**
 * Handles the validation of task inputs and displays error messages if necessary.
 * @param {boolean[]} atBoolArr - An array indicating which inputs are valid.
 * @returns {boolean} - True if any input is invalid, false otherwise.
 */
function handlerAddTaskValidation(atBoolArr) {
  toggleVisibility("empty-title-id", atBoolArr[0]);
  toggleVisibility("empty-date-id", atBoolArr[1]);
  toggleVisibility("empty-category-id", atBoolArr[2]);
  toggleVisibility("at-title-border-id", !atBoolArr[3], "error-border");
  toggleVisibility("at-date-border-id", !atBoolArr[4], "error-border");
  toggleVisibility("category-container-id", !atBoolArr[5], "error-border");
  return atBoolArr.some(Boolean);
}

/**
 * Clears all input fields, lists, error messages, and selected users and set the priority image to medium.
 */
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

/**
 * Clears all input fields.
 */
function clearAllInputs() {
  document.getElementById("title-input-id").value = "";
  document.getElementById("textarea-input-id").value = "";
  document.getElementById("subtask-input-id").value = "";
  document.getElementById("date-input-id").value = "";
  document.getElementById("category-input-id").value = "";
}

/**
 * Clears all lists containing task details.
 */
function clearAllLists() {
  subtaskList.tasks.splice(0, subtaskList.tasks.length);
  assignedTo.userNames.splice(0, assignedTo.userNames.length);
  assignedTo.userMails.splice(0, assignedTo.userMails.length);
  assignedTo.colorCodes.splice(0, assignedTo.colorCodes.length);
  assignedTo.initials.splice(0, assignedTo.initials.length);
  assignedTo.textColors.splice(0, assignedTo.textColors.length);
}

/**
 * Clears all error messages displayed for task inputs.
 */
function clearAllErrMsg() {
  toggleVisibility("empty-title-id", false);
  toggleVisibility("empty-date-id", false);
  toggleVisibility("empty-category-id", false);
  toggleVisibility("at-title-border-id", !false, "error-border");
  toggleVisibility("at-date-border-id", !false, "error-border");
  toggleVisibility("category-container-id", !false, "error-border");
}

/**
 * Clears the selected state for all users.
 */
function clearAllSelectedUsers() {
  contacts.forEach((contact) => {
    contact.selected = false;
  });
}

/**
 * Changes the color of the date input field.
 */
function changeInputColor() {
  const dateInput = document.getElementById("date-input-id");
  dateInput.style.removeProperty("-webkit-datetime-edit");
  dateInput.style.color = "black";
}
