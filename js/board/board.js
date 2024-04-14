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
let validDragEl = false;

// Favicon entsprechend dem bevorzugten Farbmodus des Benutzers setzen

function initBoard() {
  setFavicon();
  const isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) window.location.assign("./error_page.html");
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("currentUser :>> ", currentUser);
  toggleVisibility("board-menu-id", false, "highlight-menu");
  toggleVisibility("board-body-id", true);
  loadHeaderInitials();
  generateCardHTML();
  getHoverContainerGeometrie();
  setDragEventListeners();
  checkIfSectionIsEmpty();
  truncateTextIfTooLong(".description-block");
  truncateTextIfTooLong(".title-block", 31);
}

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

function getBoardElements() {
  let toDoEl = document.getElementById("toDo-id");
  let inProgEl = document.getElementById("inProgress-id");
  let awaitFedEl = document.getElementById("awaitFeedback-id");
  let doneEl = document.getElementById("done-id");
  return {toDoEl, inProgEl, awaitFedEl, doneEl};
}

function clearElementInnerHTML(toDoEl, inProgEl, awaitFedEl, doneEl) {
  toDoEl.innerHTML = "";
  inProgEl.innerHTML = "";
  awaitFedEl.innerHTML = "";
  doneEl.innerHTML = "";
}

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
    if (taskElements.hasOwnProperty(task)) addTaskToList(index, taskElements[task]);
  });
}

function addTaskToList(index, element) {
  const prio = currentUser.tasks.prios[index];
  const bgColor = getCategoryBgColor(currentUser.tasks.categories[index]);
  const {tasksDone, progress} = updateSubtaskStatusBar(index);
  element.innerHTML += generateTaskHTML(index, prio, bgColor, tasksDone, progress);
  renderBoardAssignedTo(index);
}

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

function renderBoardAssignedTo(index) {
  let addedContactsElement = document.getElementById(`board-assignedTo-id${index}`);
  addedContactsElement.innerHTML = "";
  currentUser.tasks.assignedTo[index].colorCodes.forEach((colorCode, idx) => {
    if (idx > 4) return;
    addedContactsElement.innerHTML += templateBoardAssignedToHTML(
      idx,
      colorCode,
      currentUser.tasks.assignedTo[index].initials[idx],
      currentUser.tasks.assignedTo[index].textColors[idx],
      index
    );
  });
}

//drag and drop

function allowDrop(event) {
  event.preventDefault();
}

function setDragEventListeners() {
  allDragElements = document.querySelectorAll(".board-card");
  allDragElements.forEach((el) => {
    el.addEventListener("drag", handleDrag);
  });
}

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

// function removeDragEventListeners() {
//   allDragElements.forEach((el) => {
//     el.removeEventListener("drag", handleDrag);
//   });
// }

function checkAndToggleVisibility(event, leftBorder, topBorder, elementHeight, elementId) {
  const withinHorizontalRange =
    event.clientX >= leftBorder && event.clientX <= leftBorder + elementWidth;
  const withinVerticalRange =
    event.clientY >= topBorder && event.clientY <= topBorder + elementHeight;
  const shouldBeVisible = window.innerWidth >= 1341 ? withinHorizontalRange : withinVerticalRange;
  toggleVisibility(elementId, !shouldBeVisible, "drag-area-hover");
}

function setNewHoverContainerHeight(event) {
  let parentContainer = event.target.parentNode.parentNode;
  let containerHeight = parentContainer.offsetHeight - 50;
  ["toDo-id", "inProgress-id", "awaitFeedback-id", "done-id"].forEach((id) => {
    let element = document.getElementById(id);
    element.style.minHeight = containerHeight + "px";
  });
}

function getDragContainerIds() {
  let toDoEl = document.getElementById("toDo-hover-id");
  let inProgressEl = document.getElementById("inProgress-hover-id");
  let awaitEl = document.getElementById("awaitFeedback-hover-id");
  let doneEl = document.getElementById("done-hover-id");
  return {toDoEl, inProgressEl, awaitEl, doneEl};
}

function getHoverContainerGeometrie() {
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

function startDragging(event, title, index) {
  validDragEl = true;
  setNewHoverContainerHeight(event);
  currentCard = index;
  currentDraggedElement = title;
  getHoverContainerGeometrie();
  toggleVisibility(`draggedCard${index}-id`, false, "board-card-tilt");
}

function resetDragInputs() {
  toggleVisibility("toDo-hover-id", true, "drag-area-hover");
  toggleVisibility("inProgress-hover-id", true, "drag-area-hover");
  toggleVisibility("awaitFeedback-hover-id", true, "drag-area-hover");
  toggleVisibility("done-hover-id", true, "drag-area-hover");
}

function moveTo(section) {
  resetDragInputs();
  resetNewHoverContainerHeight();
  updateTaskStatus(section);
  generateCardHTML();
  truncateTextIfTooLong(".description-block", 50);
  truncateTextIfTooLong(".title-block", 29);
  save();
  clearSearchInput();
  getHoverContainerGeometrie();
  checkIfSectionIsEmpty();
  setDragEventListeners();
}

function updateTaskStatus(section) {
  const index = currentUser.tasks.titles.indexOf(currentDraggedElement);
  if (index === -1) return;
  if (section === "toDo") currentUser.tasks.board[index] = "toDo";
  else if (section === "inProgress") currentUser.tasks.board[index] = "inProgress";
  else if (section === "awaitFeedback") currentUser.tasks.board[index] = "awaitFeedback";
  else if (section === "done") currentUser.tasks.board[index] = "done";
}

// search fumction

function filterToDos() {
  const searchInputElement = window.innerWidth < 761 ? "search-mobile-id" : "search-desktop-id";
  const search = document.getElementById(searchInputElement).value.toLowerCase();
  generateCardHTML(search);
  truncateTextIfTooLong(".description-block", 50);
  truncateTextIfTooLong(".title-block", 29);
}

function resetNewHoverContainerHeight() {
  ["toDo-id", "inProgress-id", "awaitFeedback-id", "done-id"].forEach((id) => {
    let element = document.getElementById(id);
    element.style.minHeight = "auto";
  });
}

document.getElementById("search-desktop-id").addEventListener("input", filterToDos);
document.getElementById("search-mobile-id").addEventListener("input", filterToDos);
document.addEventListener("dragend", (e) => {
  resetNewHoverContainerHeight();
  if (validDragEl) toggleVisibility(`draggedCard${currentCard}-id`, true, "board-card-tilt");
  validDragEl = false;
});

//add Task Overlay

function clearSearchInput() {
  document.getElementById("search-desktop-id").value = "";
  document.getElementById("search-mobile-id").value = "";
}

function closeAddTaskOverlay() {
  closeOverlay();
}

function closeOverlay() {
  toggleVisibility("at-section-id", true, "card-visible");
  setTimeout(() => {
    setTimeout(() => {
      toggleScrollbar("auto");
    }, 900);
    toggleVisibility("board-at-id", false);
  }, 300);
}

function toggleAtCard() {
  let element = document.getElementById("board-at-id");
  element.innerHTML = "";
  element.innerHTML = templateAddTaskHTML();
  toggleScrollbar("hidden");
  toggleVisibility("board-at-id", true);
  setTimeout(() => {
    toggleVisibility("at-section-id", false, "card-visible");
  }, 30);
}

function dateFormatter(date) {
  const dateArr = date.split("-");
  return dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
}

function prepareCardInfoInpurts(index) {
  const bgColor = getCategoryBgColor(currentUser.tasks.categories[index]);
  const prio = currentUser.tasks.prios[index];
  const date = dateFormatter(currentUser.tasks.dates[index]);
  return {bgColor, prio, date};
}

function renderInfoAssignedTo(index) {
  let element = document.getElementById("board-info-assignedTo-id");
  let emptyEl = document.getElementById("board-info-no-users-assigned-id");
  if (currentUser.tasks.assignedTo[index].userNames.length === 0)
    emptyEl.innerHTML = `Assigned To: <span style="color: black;"> No contacts assigned </span>`;
  else {
    currentUser.tasks.assignedTo[index].colorCodes.forEach((colorCode, idx) => {
      element.innerHTML += templateInfoAssignedToHTML(
        colorCode,
        currentUser.tasks.assignedTo[index].initials[idx],
        currentUser.tasks.assignedTo[index].userNames[idx],
        currentUser.tasks.assignedTo[index].textColors[idx]
      );
    });
  }
}

function renderInfoSubtasks(index) {
  let element = document.getElementById("board-info-subtasks-id");
  if (currentUser.tasks.subtasks[index].tasks.length === 0)
    toggleVisibility("no-subtasks-id", false);
  else {
    currentUser.tasks.subtasks[index].tasks.forEach((task, idx) => {
      const isChecked = currentUser.tasks.subtasks[index].done[idx];
      element.innerHTML += templateInfoSubtasksHTML(task, isChecked, idx, index);
    });
  }
}

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

function closeCardInfo() {
  toggleVisibility("card-info-section-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("board-card-info-id", false);
    toggleScrollbar("auto");
  }, 300);
  save();
  generateCardHTML();
  checkIfSectionIsEmpty();
  setDragEventListeners();
}

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
}

function createBoardTask() {
  const {titleInput, textareaInput, dateInput, categoryInput} = getAddTaskInputs();
  const atBoolArr = [false, false, false, false, false, false];
  validateInput(titleInput, atBoolArr, 0, 3);
  validateInput(dateInput, atBoolArr, 1, 4);
  validateInput(categoryInput, atBoolArr, 2, 5);
  if (handlerAddTaskValidation(atBoolArr)) {
    handlerAddTaskValidation(atBoolArr);
    toggleVisibility("rotate-err-arrow-id", true);
    return;
  }
  toggleVisibility("rotate-err-arrow-id", false);
  pushZeros(subtaskList.tasks.length);
  updateTasks(titleInput, textareaInput, dateInput, categoryInput, cardSection);
  clearAllSelectedUsers();
  save();
  generateCardHTML();
  sendUserBack();
  checkIfSectionIsEmpty();
  getHoverContainerGeometrie();
  setDragEventListeners();
}

function sendUserBack() {
  toggleScrollbar("hidden");
  toggleVisibility("at-success-msg-id", true);
  toggleVisibility("trans-bg-id", true);
  setTimeout(() => {
    toggleVisibility("at-success-msg-id", false, "slide-sm");
    setTimeout(() => {
      closeOverlay();
    }, 900);
  }, 200);
}

function openCardInfo(index) {
  let element = document.getElementById("board-card-info-id");
  element.innerHTML = "";
  const {bgColor, prio, date} = prepareCardInfoInpurts(index);
  element.innerHTML = templateCardInfoHTML(index, bgColor, prio, date);

  renderInfoAssignedTo(index);
  renderInfoSubtasks(index);
  toggleScrollbar("hidden");
  toggleVisibility("board-card-info-id", true);
  setTimeout(() => {
    toggleVisibility("card-info-section-id", false, "card-visible");
  }, 30);
}

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
function clearAllSelectedBoardUsers() {
  currentUser.contacts.forEach((contact) => {
    contact.selected = false;
  });
}

function pusAllAssignedUser(index) {
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

function editBoardCard(index) {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  clearAllLists();
  pusAllAssignedUser(index);
  toggleAtCard();
  toggleVisibility("close-edit-at-id", true);
  toggleVisibility("close-board-at-id", false);
  setSelectedUsersToTrue(index);
  renderAssignedToContacts();
  setRightCheckBox();
  setInputs(index);
  setCurrentDate();
  addSubtaskByEnter();
  addSubtaskVisibilityListener();
  filterAssignedToContacts();
  closeAssignedToMenu();
  closeCategoryMenu();
  console.log("currentUser editBoardCard:>> ", currentUser);
}

function setInputs(index) {
  setInputValue("title-input-id", currentUser.tasks.titles[index]);
  setInputValue("textarea-input-id", currentUser.tasks.descriptions[index]);
  setInputValue("category-input-id", currentUser.tasks.categories[index]);
  setInputValue("date-input-id", currentUser.tasks.dates[index]);
  renderAddedContactsToEdit(index);
  renderSubtasks();
  togglePrioImg(`${currentUser.tasks.prios[index]}-default-id`);
}

function closeEditTaskOverlay() {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  toggleVisibility("close-edit-at-id", false);
  toggleVisibility("close-board-at-id", true);
  clearAllLists();
  clearAllSelectedUsers();
  closeOverlay();
}
function renderAddedContactsToEdit(index) {
  let addedContactsElement = document.getElementById("added-contacts-id");
  addedContactsElement.innerHTML = "";
  currentUser.tasks.assignedTo[index].colorCodes.forEach((colorCode, idx) => {
    if (idx > 4) return;
    addedContactsElement.innerHTML += templateaddedContactsHTML(
      idx,
      colorCode,
      currentUser.tasks.assignedTo[index].initials[idx],
      currentUser.tasks.assignedTo[index].textColors[idx]
    );
  });
}

function setSelectedUsersToTrue(index) {
  currentUser.tasks.assignedTo[index].userMails.forEach((mail) => {
    currentUser.contacts.find((contact) => {
      if (contact.email === mail) contact.selected = true;
    });
  });
}

function setRightCheckBox() {
  currentUser.contacts.forEach((contact, idx) => {
    if (contact.selected === true) {
      let svgElement = document.querySelector(`#assigned-to-box-${idx} svg`);
      svgElement.innerHTML = templateSvgCheckboxConfirmedHTML();
    }
  });
}

function setInputValue(elementId, value) {
  const element = (document.getElementById(elementId).value = value);
}
