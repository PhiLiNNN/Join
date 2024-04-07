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

function initBoard() {
  const isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) window.location.assign("../error_page.html");
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

function generateCardHTML(search) {
  let {toDoEl, inProgEl, awaitFedEl, doneEl} = getBoardElements();
  toDoEl.innerHTML = "";
  inProgEl.innerHTML = "";
  awaitFedEl.innerHTML = "";
  doneEl.innerHTML = "";
  if (currentUser.tasks.board.length === 0) return;
  currentUser.tasks.board.forEach((task, index) => {
    let taskTitle = currentUser.tasks.titles[index].toLowerCase();
    let taskDescription = currentUser.tasks.descriptions[index].toLowerCase();
    if (search && !(taskTitle.includes(search) || taskDescription.includes(search))) return;
    if (task === "toDo") {
      const prio = currentUser.tasks.prios[index];
      toDoEl.innerHTML += generateTaskHTML(index, prio);
      renderBoardAssignedTo(index);
    }
    if (task === "inProgress") {
      const prio = currentUser.tasks.prios[index];
      inProgEl.innerHTML += generateTaskHTML(index, prio);
      renderBoardAssignedTo(index);
    }
    if (task === "awaitFeedback") {
      const prio = currentUser.tasks.prios[index];
      awaitFedEl.innerHTML += generateTaskHTML(index, prio);
      renderBoardAssignedTo(index);
    }
    if (task === "done") {
      const prio = currentUser.tasks.prios[index];
      doneEl.innerHTML += generateTaskHTML(index, prio);
      renderBoardAssignedTo(index);
    }
  });
}

function checkIfSectionIsEmpty() {
  const sections = ["toDo", "inProgress", "awaitFeedback", "done"];
  sections.forEach((section) => {
    const hoverId = `${section}-hover-id`;
    const isVisible = currentUser.tasks.board.includes(section);
    if (!isVisible) {
      let element = document.getElementById(`${section}-id`);
      element.innerHTML = emptyBoardMsgToHTML();
      toggleVisibility(hoverId, false, "drag-area-hover-default");
    } else toggleVisibility(hoverId, true, "drag-area-hover-default");
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
    el.addEventListener("drag", (event) => {
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
    });
  });
}

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

function toggleContainerHeight() {}

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
document.addEventListener("dragend", () => {
  resetNewHoverContainerHeight();
  toggleVisibility(`draggedCard${currentCard}-id`, true, "board-card-tilt");
});
//Big Card Overlay

function createBigCard() {
  let overlayContent = document.getElementById("board-at-id");
  overlayContent.innerHTML += templateAddTaskHTML();
}

//add Task Overlay

function clearSearchInput() {
  document.getElementById("search-desktop-id").value = "";
  document.getElementById("search-mobile-id").value = "";
}

function closeAddTaskOverlay() {
  toggleVisibility("at-section-id", true, "card-visible");
  setTimeout(() => {
    toggleVisibility("board-at-id", false);
    toggleScrollbar("auto");
  }, 300);
}

function openAddTaskOverlay() {
  toggleAtCard();
  renderAssignedToContacts();
  setCurrentDate();
  addSubtaskByEnter();
  addSubtaskVisibilityListener();
  closeAssignedToMenu();
  closeCategoryMenu();
}

function toggleAtCard() {
  let overlayContent = document.getElementById("board-at-id");
  overlayContent.innerHTML = "";
  overlayContent.innerHTML += templateAddTaskHTML();
  toggleScrollbar("hidden");
  toggleVisibility("board-at-id", true);
  setTimeout(() => {
    toggleVisibility("at-section-id", false, "card-visible");
  }, 30);
}
