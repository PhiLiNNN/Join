let currentDraggedElement;
let currentCard;
let toDoLeftBorder;
let inProgressLeftBorder;
let awaitLeftBorder;
let doneLeftBorder;
let toDoTopBorder;
let inProgressTopBorder;
let awaitTopBorder;
let doneTopBorder;
let elementWidth;
let toDotHeight;
let inProgressHeight;
let awaitHeight;
let doneHeight;
let allDragElements;
let cardSection;
let currentUser;
let currentSubtasksLength;
let validDragEl = false;

/**
 * Initializes the board by setting up various functionalities and loading data.
 * This function initializes the board by performing various setup tasks:
 * It sets the favicon, checks if the user is logged in, loads user data, toggles visibility of
 * board elements, generates card HTML, sets event listeners for drag and drop functionality,
 * truncates text if it's too long (more than two lines fpr title and description), and hides the scrollbar.
 */
function initBoard() {
  setFavicon();
  const isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) window.location.assign("./error_page.html");
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  toggleVisibility("board-menu-id", false, "highlight-menu");
  toggleVisibility("board-body-id", true);
  loadHeaderInitials();
  generateCardHTML();
  getHoverContainerGeometrie();
  setDragEventListeners();
  truncateTextIfTooLong(".description-block", 31);
  truncateTextIfTooLong(".title-block", 31);
  toggleScrollbar("hidden");
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

/**
 * Generates HTML cards for tasks and displays them in the appropriate columns on the task management board.
 * @param {string} [search] - Optional. A string to filter tasks by title or description.
 */
function generateCardHTML(search) {
  let {toDoEl, inProgEl, awaitFedEl, doneEl} = getBoardElements();
  clearElementInnerHTML(toDoEl, inProgEl, awaitFedEl, doneEl);
  if (currentUser.tasks.board.length === 0) return;
  currentUser.tasks.board.forEach((task, index) => {
    let taskTitle = currentUser.tasks.titles[index].toLowerCase();
    let taskDescription = currentUser.tasks.descriptions[index].toLowerCase();
    if (search && !(taskTitle.includes(search) || taskDescription.includes(search))) return;
    const taskElements = {
      toDo: toDoEl,
      inProgress: inProgEl,
      awaitFeedback: awaitFedEl,
      done: doneEl,
    };
    checkIfSectionIsEmpty();
    if (taskElements.hasOwnProperty(task)) addTaskToList(index, taskElements[task]);
  });
}

/**
 * Adds a task to the specified element on the task management board.
 * @param {number} index - The index of the task.
 * @param {HTMLElement} element - The HTML element to which the task will be added.
 */
function addTaskToList(index, element) {
  const prio = currentUser.tasks.prios[index];
  const bgColor = getCategoryBgColor(currentUser.tasks.categories[index]);
  const {tasksDone, progress} = updateSubtaskStatusBar(index);
  element.innerHTML += generateTaskHTML(index, prio, bgColor, tasksDone, progress);
  renderBoardAssignedTo(index);
}

/**
 * Handles the drag event by checking if the dragged element is within the boundaries of the target drop zones and toggles visibility accordingly.
 * @param {Event} event - The drag event.
 */
function handleDrag(event) {
  checkAndToggleVisibility(event, toDoLeftBorder, toDoTopBorder, toDotHeight, "toDo-hover-id");
  checkAndToggleVisibility(
    event,
    inProgressLeftBorder,
    inProgressTopBorder,
    inProgressHeight,
    "inProgress-hover-id"
  );
  checkAndToggleVisibility(
    event,
    awaitLeftBorder,
    awaitTopBorder,
    awaitHeight,
    "awaitFeedback-hover-id"
  );
  checkAndToggleVisibility(event, doneLeftBorder, doneTopBorder, doneHeight, "done-hover-id");
}

/**
 * Initiates the dragging operation.
 * @param {Event} event - The drag event object.
 * @param {string} title - The title of the card being dragged.
 * @param {number} index - The index of the card being dragged.
 */
function startDragging(event, title, index) {
  validDragEl = true;
  setNewHoverContainerHeight(event);
  currentCard = index;
  currentDraggedElement = title;
  getHoverContainerGeometrie();
  toggleVisibility(`draggedCard${index}-id`, false, "board-card-tilt");
}

/**
 * Handles the start of a touch event for dragging a board card.
 * @param {TouchEvent} event - The touch event object.
 * @param {string} title - The title of the card being dragged.
 * @param {number} index - The index of the card being dragged.
 */
function startTouchEvent(event, title, index) {
  validDragEl = true;
  const handleTouchStart = (event) => {
    const outermostParent = findOutermostParentWithClass(event.target, "drag-container");
    setNewHoverContainerHeightMobile(outermostParent);
  };
  handleTouchStart(event);
  currentCard = index;
  currentDraggedElement = title;
  getHoverContainerGeometrie();
  toggleVisibility(`draggedCard${index}-id`, false, "board-card-tilt");
}

/**
 * Prevents the default behavior of an element when dragged over.
 * @param {Event} event - The dragover event.
 */
function allowDrop(event) {
  event.preventDefault();
}

function findOutermostParentWithClass(element, className) {
  let parent = element.parentNode;
  while (parent) {
    if (parent.classList.contains(className)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return null; // Wenn kein passendes Element gefunden wurde
}
/**
 * Sets up drag event listeners for all draggable elements.
 */
function setDragEventListeners() {
  const allDragElements = document.querySelectorAll(".board-card");
  allDragElements.forEach((el) => {
    el.addEventListener("drag", handleDrag);
    el.addEventListener("touchmove", function (eve) {
      eve.preventDefault();
      const touchobj = eve.touches[0];
      handleDrag(touchobj);
    });
    el.addEventListener("touchend", function (eve) {
      const touchobj = eve.changedTouches[0];
      if (isInsideRect(touchobj, "toDo")) moveTo("toDo");
      else if (isInsideRect(touchobj, "inProgress")) moveTo("inProgress");
      else if (isInsideRect(touchobj, "awaitFeedback")) moveTo("awaitFeedback");
      else if (isInsideRect(touchobj, "done")) moveTo("done");
      else toggleVisibility(`draggedCard${currentCard}-id`, true, "board-card-tilt");
    });
  });
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
 * Moves the dragged card to the specified section.
 * @param {string} section - The section to move the card to (e.g., "toDo", "inProgress", "awaitFeedback", "done").
 */
function moveTo(section) {
  resetDragInputs();
  resetNewHoverContainerHeight();
  updateTaskStatus(section);
  generateCardHTML();
  truncateTextIfTooLong(".description-block", 50);
  truncateTextIfTooLong(".title-block", 29);
  saveWithoutLoaderAnimation();
  clearSearchInput();
  getHoverContainerGeometrie();
  setDragEventListeners();
}

/**
 * Filters the "To Do" tasks based on the search input value.
 */
function filterToDos() {
  const searchInputElement = window.innerWidth < 761 ? "search-mobile-id" : "search-desktop-id";
  const search = document.getElementById(searchInputElement).value.toLowerCase();
  generateCardHTML(search);
  truncateTextIfTooLong(".description-block", 50);
  truncateTextIfTooLong(".title-block", 29);
}

/**
 * Closes the overlay for adding a new task.
 */
function closeAddTaskOverlay() {
  closeOverlay();
}

/**
 * Closes the overlay for adding a new task.
 * It toggles the visibility of the add task section and hides the overlay.
 */
function closeOverlay() {
  toggleVisibility("at-section-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("board-at-id", false);
  }, 300);
}

/**
 * Closes the card information overlay.
 */
function closeCardInfo() {
  toggleVisibility("card-info-section-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("board-card-info-id", false);
  }, 300);
  save();
  generateCardHTML();
  checkIfSectionIsEmpty();
  setDragEventListeners();
  truncateTextIfTooLong(".description-block", 31);
  truncateTextIfTooLong(".title-block", 31);
}

/**
 * Deletes a board card at the specified index.
 * @param {number} index - The index of the board card to delete.
 */
function deleteBoardCard(index) {
  currentUser.tasks.assignedTo.splice(index, 1);
  currentUser.tasks.board.splice(index, 1);
  currentUser.tasks.categories.splice(index, 1);
  currentUser.tasks.descriptions.splice(index, 1);
  currentUser.tasks.prios.splice(index, 1);
  currentUser.tasks.subtasks.splice(index, 1);
  currentUser.tasks.dates.splice(index, 1);
  currentUser.tasks.titles.splice(index, 1);
  closeCardInfo();
  getHoverContainerGeometrie();
  truncateTextIfTooLong(".description-block", 31);
  truncateTextIfTooLong(".title-block", 31);
}

/**
 * Creates a new task on the board based on user input.
 */
function createBoardTask() {
  const {titleInput, textareaInput, dateInput, categoryInput} = getAddTaskInputs();
  const atBoolArr = [false, false, false, false, false, false];
  validateInputs(titleInput, dateInput, categoryInput, atBoolArr);
  if (handlerAddTaskValidation(atBoolArr)) {
    handlerAddTaskValidation(atBoolArr);
    toggleVisibility("rotate-err-arrow-id", true);
    return;
  }
  toggleVisibility("rotate-err-arrow-id", false);
  pushTasks(titleInput, textareaInput, dateInput, categoryInput, cardSection);
  clearAllSelectedUsers();
  save();
  generateCardHTML();
  sendUserBack();
  getHoverContainerGeometrie();
  setDragEventListeners();
  truncateTextIfTooLong(".description-block", 31);
  truncateTextIfTooLong(".title-block", 31);
}

/**
 * Opens the add task overlay for a specific section of the board.
 * @param {string} section - The section of the board where the task is to be added.
 */
function openAddTaskOverlay(section) {
  clearAllLists();
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  cardSection = section;
  toggleAtCard();
  clearAllSelectedBoardUsers();
  renderAssignedToContacts();
  setCurrentDate();
  addSubtaskByEnter();
  addSubtaskVisibilityListener();
  closeAssignedToMenu();
  closeCategoryMenu();
  filterAssignedToContacts();
}

/**
 * Opens the edit board card overlay with pre-filled information.
 * @param {number} index - The index of the card to edit.
 */
function openEditBoardCard(index) {
  currentSubtasksLength = currentUser.tasks.subtasks[index].tasks.length;
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  clearAllLists();
  pushAllAssignedUser(index);
  toggleAtCard();
  handlerEditCardVisibilities();
  setSelectedUsersToTrue(index);
  renderAssignedToContacts();
  setRightCheckBox();
  setEditCardInputs(index);
  setCurrentDate();
  addSubtaskByEnter();
  addSubtaskVisibilityListener();
  filterAssignedToContacts();
  closeAssignedToMenu();
  closeCategoryMenu();
}

/**
 * Edits the details of a board card.
 */
function editBoardCard() {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const {titleInput, textareaInput, dateInput, categoryInput} = getAddTaskInputs();
  const atBoolArr = [false, false, false, false, false, false];
  validateInputs(titleInput, dateInput, categoryInput, atBoolArr);
  if (handlerAddTaskValidation(atBoolArr)) {
    handlerAddTaskValidation(atBoolArr);
    toggleVisibility("rotate-err-arrow-id", true);
    return;
  }
  toggleVisibility("rotate-err-arrow-id", false);
  clearAllSelectedUsers();
  renderAssignedToContacts();
  updateTasks(titleInput, textareaInput, dateInput, categoryInput, cardSection);
  save();
  setNewCardInputs(currentCard);
  renderInfoAssignedTo(currentCard);
  renderInfoSubtasks(currentCard);
  closeOverlay();
}

/**
 * Sets the new inputs of a board card after editing.
 * @param {number} index - The index of the board card.
 */
function setNewCardInputs(index) {
  const bgColor = getCategoryBgColor(currentUser.tasks.categories[index]);
  const date = dateFormatter(currentUser.tasks.dates[index]);
  document.getElementById("board-info-category-bg-id").style.backgroundColor = bgColor;
  document.getElementById("board-info-category-id").innerHTML = currentUser.tasks.categories[index];
  document.getElementById("board-title-id").innerHTML = currentUser.tasks.titles[index];
  document.getElementById("board-description-id").innerHTML = currentUser.tasks.descriptions[index];
  document.getElementById("board-prio-cat-id").innerHTML =
    currentUser.tasks.prios[index].charAt(0).toUpperCase() +
    currentUser.tasks.prios[index].slice(1);
  document.getElementById(
    "board-prio-img-id"
  ).src = `./assets/img/board_${currentUser.tasks.prios[index]}.png`;
  document.getElementById("board-date-id").innerHTML = date;
}

/**
 * Opens the card information section for a specific board card.
 * @param {number} index - The index of the board card.
 */
function openCardInfo(index) {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentCard = index;
  cardSection = currentUser.tasks.board[index];
  renderCardContent(index);
  renderInfoAssignedTo(index);
  renderInfoSubtasks(index);
  toggleVisibility("board-card-info-id", true);
  setTimeout(() => {
    toggleVisibility("card-info-section-id", false, "card-visible");
  }, 30);
}

/**
 * Updates the details of a board card.
 * @param {string} titleInput - The updated title of the board card.
 * @param {string} textareaInput - The updated description of the board card.
 * @param {string} dateInput - The updated date of the board card.
 * @param {string} categoryInput - The updated category of the board card.
 * @param {string} [section="toDo"] - The section to move the card to after updating.
 */
function updateTasks(titleInput, textareaInput, dateInput, categoryInput, section = "toDo") {
  currentUser.tasks.titles[currentCard] = titleInput;
  currentUser.tasks.descriptions[currentCard] = textareaInput;
  currentUser.tasks.dates[currentCard] = dateInput;
  currentUser.tasks.assignedTo[currentCard] = assignedTo;
  currentUser.tasks.prios[currentCard] = prio[prioIndex];
  currentUser.tasks.categories[currentCard] = categoryInput;
  currentUser.tasks.subtasks[currentCard] = subtaskList;
  currentUser.tasks.board[currentCard] = section;
}

/**
 * Sets the input values for editing a board card.
 * @param {number} index - The index of the card to edit.
 */
function setEditCardInputs(index) {
  setInputValue("title-input-id", currentUser.tasks.titles[index]);
  setInputValue("textarea-input-id", currentUser.tasks.descriptions[index]);
  setInputValue("category-input-id", currentUser.tasks.categories[index]);
  setInputValue("date-input-id", currentUser.tasks.dates[index]);
  setDateInputColor();
  renderAddedContactsToEdit(index);
  renderSubtasks();
  togglePrioImg(`${currentUser.tasks.prios[index]}-default-id`);
}

/**
 * Closes the overlay for editing a task.
 * This function clears all lists, clears all selected users, and closes the overlay.
 */
function closeEditTaskOverlay() {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  toggleVisibility("close-edit-at-id", false);
  toggleVisibility("close-board-at-id", true);
  clearAllLists();
  clearAllSelectedUsers();
  closeOverlay();
}

function openMenu() {
  document.querySelector('.move-to-container').style.display = 'block';
}

function closeMenu() {
  document.querySelector('.move-to-container').style.display = 'none';
}

function moveToToDo(index) {
  if (index >= 0 && index < currentUser.tasks.board.length) {
    currentUser.tasks.board[index] = "toDo";
    saveWithoutLoaderAnimation();
    console.log("Die Aufgabe wurde erfolgreich in den Status 'To Do' verschoben.");
    generateCardHTML();
  } else {
    console.error("Ungültiger Index.");
  }
}

function moveToInProgress(index) {
  if (index >= 0 && index < currentUser.tasks.board.length) {
    currentUser.tasks.board[index] = "inProgress";
    saveWithoutLoaderAnimation();
    console.log("Die Aufgabe wurde erfolgreich in den Status 'In Progress' verschoben.");
    generateCardHTML();
  } else {
    console.error("Ungültiger Index.");
  }
}

function moveToAwaitFeedback(index) {
  if (index >= 0 && index < currentUser.tasks.board.length) {
    currentUser.tasks.board[index] = "awaitFeedback";
    saveWithoutLoaderAnimation();
    console.log("Die Aufgabe wurde erfolgreich in den Status 'Await Feedback' verschoben.");
    generateCardHTML();
  } else {
    console.error("Ungültiger Index.");
  }
}

function moveToDone(index) {
  if (index >= 0 && index < currentUser.tasks.board.length) {
    currentUser.tasks.board[index] = "done";
    saveWithoutLoaderAnimation();
    console.log("Die Aufgabe wurde erfolgreich in den Status 'done' verschoben.");
    generateCardHTML();
  } else {
    console.error("Ungültiger Index.");
  }
}