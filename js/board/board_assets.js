/**
 * Sets the value of an input element.
 * @param {string} elementId - The ID of the input element.
 * @param {string} value - The value to set for the input element.
 */
function setInputValue(elementId, value) {
  document.getElementById(elementId).value = value;
}

function disableCategory() {
  document.getElementById("category-input-id").disabled = true;
}

function disableCategoryField() {
  disableCategory();
  toggleVisibility("rotate-arrow-category-id", false);
  document.getElementById("category-container-id").classList.remove("cursor");
  toggleVisibility("category-container-id", false, "cursor-default");
  toggleVisibility("category-input-id", false, "cursor-default");
}

/**
 * Sets the checkbox as checked for contacts that are selected.
 * This function iterates through the contacts list and checks if the contact is selected.
 * If it is selected, it updates the checkbox SVG to represent a checked state.
 */
function setRightCheckBox() {
  currentUser.contacts.forEach((contact, idx) => {
    if (contact.selected === true) {
      let svgElement = document.querySelector(`#assigned-to-box-${idx} svg`);
      svgElement.innerHTML = templateSvgCheckboxConfirmedHTML();
    }
  });
}

/**
 * Sets the selected property of contacts to true based on assigned users for a task.
 * @param {number} index - The index of the task.
 * This function iterates through the user emails assigned to the specified task,
 * finds the corresponding contact in the user's contacts list, and sets its selected property to true.
 */
function setSelectedUsersToTrue(index) {
  currentUser.tasks.assignedTo[index].userMails.forEach((mail) => {
    currentUser.contacts.find((contact) => {
      if (contact.email === mail) contact.selected = true;
    });
  });
}

/**
 * Sets the color of the date input field to black.
 */
function setDateInputColor() {
  let element = document.getElementById("date-input-id");
  element.style.color = "black";
}

/**
 * Handles the visibility changes in the edit card overlay.
 */
function handlerEditCardVisibilities() {
  toggleVisibility("close-edit-at-id", true);
  toggleVisibility("close-board-at-id", false);
  toggleVisibility("at-add-btn", false);
  toggleVisibility("at-ok-btn", true);
}

/**
 * Sends the user back from the task creation overlay to the main board view.
 */
function sendUserBack() {
  toggleVisibility("at-success-msg-id", true);
  toggleVisibility("trans-bg-id", true);
  setTimeout(() => {
    toggleVisibility("at-success-msg-id", false, "slide-sm");
    setTimeout(() => {
      closeOverlay();
    }, 900);
  }, 200);
}

/**
 * Toggles the checkbox state for a subtask.
 * @param {number} index - The index of the subtask.
 * @param {number} cardIndex - The index of the opened card in the tasks array.
 */
function toggleSubtaskCheckbox(index, cardIndex) {
  let element = document.getElementById(`board-info-Subtaks${index}-id`);
  let isChecked = element.getAttribute("data-checked") === "true";
  isChecked
    ? (currentUser.tasks.subtasks[cardIndex].done[index] = false)
    : (currentUser.tasks.subtasks[cardIndex].done[index] = true);
  element.innerHTML = isChecked ? templateNotCheckedSubtaskHTML() : templateCheckedSubtaskHTML();
  element.setAttribute("data-checked", isChecked ? "false" : "true");
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

/**
 * Prepares information inputs for a opened card..
 * @param {number} index - The index of the card in the tasks array.
 * @returns {Object} An object containing background color, priority, and formatted date for the card.
 */
function prepareCardInfoInputs(index) {
  const bgColor = getCategoryBgColor(currentUser.tasks.categories[index]);
  const prio = currentUser.tasks.prios[index];
  const date = dateFormatter(currentUser.tasks.dates[index]);
  return {bgColor, prio, date};
}

/**
 * Formats the date from YYYY-MM-DD to DD/MM/YYYY format.
 * @param {string} date - The date string in YYYY-MM-DD format.
 * @returns {string} The formatted date in DD/MM/YYYY format.
 */
function dateFormatter(date) {
  const dateArr = date.split("-");
  return dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
}

/**
 * Toggles the visibility of the add task card overlay.
 * It replaces the content of the overlay with the template for adding a new task
 * and then toggles the visibility of the overlay.
 */
function toggleAtCard() {
  let element = document.getElementById("board-at-id");
  element.innerHTML = "";
  element.innerHTML = templateAddTaskHTML();
  toggleVisibility("board-at-id", true);
  setTimeout(() => {
    toggleVisibility("at-section-id", false, "card-visible");
  }, 30);
}

/**
 * Resets the minimum height of the hover containers to "auto".
 */
function resetNewHoverContainerHeight() {
  ["toDo-id", "inProgress-id", "awaitFeedback-id", "done-id"].forEach((id) => {
    let element = document.getElementById(id);
    element.style.minHeight = "auto";
  });
}

/**
 * Retrieves the geometry information of the hover containers.
 */
function getHoverContainerGeometry() {
  let {toDoEl, inProgressEl, awaitEl, doneEl} = getDragContainerIds();
  let toDoRect = toDoEl.getBoundingClientRect();
  let inProgressRect = inProgressEl.getBoundingClientRect();
  let awaitRect = awaitEl.getBoundingClientRect();
  let doneRect = doneEl.getBoundingClientRect();
  toDoLeftBorder = toDoRect.left;
  inProgressLeftBorder = inProgressRect.left;
  awaitLeftBorder = awaitRect.left;
  doneLeftBorder = doneRect.left;
  elementWidth = toDoRect.width;
  toDotHeight = toDoRect.height;
  inProgressHeight = inProgressRect.height;
  awaitHeight = awaitRect.height;
  doneHeight = doneRect.height;
  toDoTopBorder = toDoRect.top;
  inProgressTopBorder = inProgressRect.top;
  awaitTopBorder = awaitRect.top;
  doneTopBorder = doneRect.top;
}

/**
 * Retrieves the drag container elements by their IDs.
 * @returns {Object} An object containing references to the drag container elements.
 */
function getDragContainerIds() {
  let toDoEl = document.getElementById("toDo-hover-id");
  let inProgressEl = document.getElementById("inProgress-hover-id");
  let awaitEl = document.getElementById("awaitFeedback-hover-id");
  let doneEl = document.getElementById("done-hover-id");
  return {toDoEl, inProgressEl, awaitEl, doneEl};
}

/**
 * Checks if any section on the board is empty and updates it with an empty message if necessary.
 */
function checkIfSectionIsEmpty() {
  const sections = ["toDo", "inProgress", "awaitFeedback", "done"];
  sections.forEach((section) => {
    const isVisible = currentUser.tasks.board.includes(section);
    if (!isVisible) {
      let element = document.getElementById(`${section}-id`);
      element.innerHTML = emptyBoardMsgToHTML(section);
    }
  });
}

/**
 * Gets the background color associated with a category.
 * @param {string} category - The category of the task.
 * @returns {string} The background color.
 */
function getCategoryBgColor(category) {
  const taskColors = {
    "Technical Task": "#0038ff",
    "User Story": "#1FD7C1",
    Bug: "#FF5733",
    "Feature Request": "#FFC300",
    Enhancement: "#4CAF50",
    Documentation: "#FF00FF",
    Testing: "#00FFFF",
    Infrastructure: "#9C27B0",
    Design: "#FF1493",
    Research: "#795548",
    Other: "#607D8B",
  };
  return taskColors[category];
}

/**
 * Clears the selection of all board users within assignedTo dropdown.
 */
function clearAllSelectedBoardUsers() {
  currentUser.contacts.forEach((contact) => {
    contact.selected = false;
  });
}

/**
 * Clears the search input fields for both desktop and mobile.
 */
function clearSearchInput() {
  document.getElementById("search-desktop-id").value = "";
  document.getElementById("search-mobile-id").value = "";
}

/**
 * Updates the status of the dragged card to the specified section.
 * @param {string} section - The section to update the card status to (e.g., "toDo", "inProgress", "awaitFeedback", "done").
 */
function updateTaskStatus(section) {
  const index = currentUser.tasks.titles.indexOf(currentDraggedElement);
  if (index === -1) return;
  if (section === "toDo") currentUser.tasks.board[index] = "toDo";
  else if (section === "inProgress") currentUser.tasks.board[index] = "inProgress";
  else if (section === "awaitFeedback") currentUser.tasks.board[index] = "awaitFeedback";
  else if (section === "done") currentUser.tasks.board[index] = "done";
}

/**
 * Sets the minimum height for the hover containers based on the height of the parent container.
 * @param {Event} event - The event triggering the function.
 */
function setNewHoverContainerHeight(event) {
  let parentContainer = event.target.parentNode.parentNode;
  let containerHeight = parentContainer.offsetHeight - 50;
  ["toDo-id", "inProgress-id", "awaitFeedback-id", "done-id"].forEach((id) => {
    let element = document.getElementById(id);
    element.style.minHeight = containerHeight + "px";
  });
}

/**
 * Sets the minimum height for the hover containers based on the height of the parent container.
 * @param {Event} event - The event triggering the function.
 */
function setNewHoverContainerHeightMobile(parentContainer) {
  let containerHeight = parentContainer.offsetHeight - 50;
  ["toDo-id", "inProgress-id", "awaitFeedback-id", "done-id"].forEach((id) => {
    let element = document.getElementById(id);
    element.style.minHeight = containerHeight + "px";
  });
}

/**
 * Truncates text content of elements if it exceeds a specified maximum height.
 * @param {string} querySelector - The CSS query selector for the elements whose text content needs truncation (description and title).
 * @param {number} maxHeight - The maximum height (in pixels) beyond which text should be truncated.
 */
function truncateTextIfTooLong(querrySelec, maxHeight) {
  const textSpans = document.querySelectorAll(querrySelec);
  const ellipsis = " ...";
  textSpans.forEach((textSpan) => {
    if (textSpan.scrollHeight > maxHeight) {
      const text = textSpan.textContent.trim();
      const truncatedText = text.slice(0, maxHeight) + ellipsis;
      textSpan.textContent = truncatedText;
    }
  });
}

/**
 * Resets the drag-related inputs.
 */
function resetDragInputs() {
  toggleVisibility("toDo-hover-id", true, "drag-area-hover");
  toggleVisibility("inProgress-hover-id", true, "drag-area-hover");
  toggleVisibility("awaitFeedback-hover-id", true, "drag-area-hover");
  toggleVisibility("done-hover-id", true, "drag-area-hover");
}

/**
 * Checks whether the dragged element is within the specified range of a board section and toggles the visibility of the hover indicator accordingly.
 * @param {DragEvent} event - The drag event.
 * @param {number} leftBorder - The left border of the board section.
 * @param {number} topBorder - The top border of the board section.
 * @param {number} elementHeight - The height of the board section.
 * @param {string} elementId - The ID of the element representing the hover indicator for the board section.
 */
function checkAndToggleVisibility(event, leftBorder, topBorder, elementHeight, elementId) {
  const withinHorizontalRange =
    event.clientX >= leftBorder && event.clientX <= leftBorder + elementWidth;
  const withinVerticalRange =
    event.clientY >= topBorder && event.clientY <= topBorder + elementHeight;
  const shouldBeVisible = window.innerWidth >= 1341 ? withinHorizontalRange : withinVerticalRange;
  toggleVisibility(elementId, !shouldBeVisible, "drag-area-hover");
}

/**
 * Updates the subtask status bar for a task.
 * @param {number} index - The index of the task.
 * @returns {Object} An object containing the number of tasks done and the progress percentage.
 */
function updateSubtaskStatusBar(index) {
  let tasksDone = 0;
  if (currentUser.tasks.subtasks[index].tasks.length === 0) return {tasksDone: 0, progress: false};
  else {
    currentUser.tasks.subtasks[index].done.forEach((done) => {
      if (done) tasksDone++;
    });
    const progress = ((tasksDone / currentUser.tasks.subtasks[index].tasks.length) * 100).toFixed(
      2
    );
    return {tasksDone, progress};
  }
}

/**
 * Pushes all assigned users and their subtasks to respective lists.
 * @param {number} index - The index of the card.
 */
function pushAllAssignedUser(index) {
  currentUser.tasks.assignedTo[index].userNames.forEach((name, idx) => {
    assignedTo.initials.push(currentUser.tasks.assignedTo[index].initials[idx]);
    assignedTo.colorCodes.push(currentUser.tasks.assignedTo[index].colorCodes[idx]);
    assignedTo.textColors.push(currentUser.tasks.assignedTo[index].textColors[idx]);
    assignedTo.userNames.push(name);
    assignedTo.userMails.push(currentUser.tasks.assignedTo[index].userMails[idx]);
  });
  currentUser.tasks.subtasks[index].tasks.forEach((task, idx) => {
    subtaskList.tasks.push(task);
    subtaskList.done.push(currentUser.tasks.subtasks[index].done[idx]);
  });
}

/**
 * Retrieves the board elements by their respective IDs.
 * @returns {Object} An object containing references to the board elements.
 */
function getBoardElements() {
  let toDoEl = document.getElementById("toDo-id");
  let inProgEl = document.getElementById("inProgress-id");
  let awaitFedEl = document.getElementById("awaitFeedback-id");
  let doneEl = document.getElementById("done-id");
  return {toDoEl, inProgEl, awaitFedEl, doneEl};
}

/**
 * Opens the menu for moving a task to a different container.
 * @param {number} index - The index of the menu container.
 * @param {string} title - The title of the task being moved.
 */
function openMenu(index, title) {
  currentDraggedElement = title;
  toggleVisibility(`move-to-container${index}-id`, true);
}

/**
 * Closes the menu for moving a task to a different container.
 * @param {number} index - The index of the menu container.
 */
function closeMenu(index) {
  toggleVisibility(`move-to-container${index}-id`, false);
}

/**
 * Checks if the touch event occurred inside a specified rectangle.
 * @param {TouchEvent} touchobj - The touch event object.
 * @param {string} ID - The ID of the target rectangle element.
 * @returns {boolean} True if the touch event occurred inside the specified rectangle, otherwise false.
 */
function isInsideRect(touchobj, ID) {
  const element = document.getElementById(`${ID}-hover-id`);
  rect = element.getBoundingClientRect();
  return (
    touchobj.clientX > rect.left &&
    touchobj.clientX < rect.right &&
    touchobj.clientY > rect.top &&
    touchobj.clientY < rect.bottom
  );
}

/**
 * Clears the inner HTML content of the specified board elements.
 * @param {HTMLElement} toDoEl - The element representing the "To Do" column.
 * @param {HTMLElement} inProgEl - The element representing the "In Progress" column.
 * @param {HTMLElement} awaitFedEl - The element representing the "Awaiting Feedback" column.
 * @param {HTMLElement} doneEl - The element representing the "Done" column.
 */
function clearElementInnerHTML(toDoEl, inProgEl, awaitFedEl, doneEl) {
  toDoEl.innerHTML = "";
  inProgEl.innerHTML = "";
  awaitFedEl.innerHTML = "";
  doneEl.innerHTML = "";
}
