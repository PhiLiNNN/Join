let currentDraggedElement;
let assignedToInfo = {
  initials: [],
  colorCodes: [],
};

function initBoard() {
  const isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) window.location.assign("../error_page.html");
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("currentUser :>> ", currentUser);

  toggleVisibility("board-body-id", true);
  loadHeaderInitials();
  generateCardHTML();
  truncateDescriptionIfTooLong();
}

function truncateDescriptionIfTooLong() {
  const descriptionSpans = document.querySelectorAll(".description-block");
  const maxHeight = 50;
  const ellipsis = " ...";
  descriptionSpans.forEach((descriptionSpan) => {
    if (descriptionSpan.scrollHeight > maxHeight) {
      const text = descriptionSpan.textContent.trim();
      const truncatedText = text.slice(0, maxHeight) + ellipsis;
      descriptionSpan.textContent = truncatedText;
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

function generateCardHTML() {
  let {toDoEl, inProgEl, awaitFedEl, doneEl} = getBoardElements();
  if (currentUser.tasks.board.length === 0) return;
  currentUser.tasks.board.forEach((task, index) => {
    if (task === "toDo") {
      const prio = currentUser.tasks.prios[index];
      toDoEl.innerHTML += generateTaskHTML(index, prio);
      renderBoardAssignedTo(index);
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

function startDragging(index) {
  currentDraggedElement = index;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(board) {
  tasks[currentDraggedElement]["board"] = board;
  updateHTML();
}

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
