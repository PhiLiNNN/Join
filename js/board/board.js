let currentDraggedElement;

function initBoard() {
  const isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) window.location.assign("../error_page.html");
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("currentUser :>> ", currentUser);
  toggleVisibility("board-menu-id", false, "highlight-menu");
  toggleVisibility("board-body-id", true);
  loadHeaderInitials();
  generateCardHTML();
  checkIfSectionIsEmpty();
  truncateTextIfTooLong(".description-block", 50);
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
  let toDoEl = document.getElementById("to-do-id");
  let inProgEl = document.getElementById("in-progress-id");
  let awaitFedEl = document.getElementById("await-feedback-id");
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
    toggleVisibility(hoverId, isVisible, "drag-area-hover-default");
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
function startDragging(title, index) {
  currentDraggedElement = title;
  toggleVisibility(`draggedCard${index}-id`, false, "board-card-tilt");
  console.log("index :>> ", index);
}
function toggledDragHover(elementId, bool) {
  toggleVisibility(elementId, bool, "drag-area-hover");
}

function moveTo(section) {
  toggleVisibility(section + "-hover-id", true, "drag-area-hover");
  updateTaskStatus(section);
  generateCardHTML();
  loadHeaderInitials();
  truncateTextIfTooLong(".description-block", 50);
  truncateTextIfTooLong(".title-block", 29);
  save();
  clearSeachInput();
  checkIfSectionIsEmpty();
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

document.getElementById("search-desktop-id").addEventListener("input", filterToDos);
document.getElementById("search-mobile-id").addEventListener("input", filterToDos);

//Big Card Overlay

function createBigCard() {
  let overlayContent = document.getElementById("board-body-id");
  overlayContent.innerHTML += templatAddTaskHTML();
}

//add Task Overlay

function createAddTask() {
  let overlayContent = document.getElementById("board-body-id");
  overlayContent.innerHTML += templatAddTaskHTML();
}

function showAddTask() {
  document.getElementById("overlay-add-id").style.display = "block";
}

function hideAddTask() {
  document.getElementById("overlay-add-id").style.display = "none";
}

function openAddTaskOverlay() {
  createAddTask();
  showAddTask();
}

function closeAddTaskOverlay() {
  hideAddTask();
}

function clearSeachInput() {
  document.getElementById("search-desktop-id").value = "";
  document.getElementById("search-mobile-id").value = "";
}
