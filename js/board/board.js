let currentDraggedElement;
let isUserLoggedIn;
let currentUser;

function initBoard() {
  const isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) {
    window.location.assign("../error_page.html");
    return;
  }

  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.tasks || !currentUser.tasks.board) {
    console.error("Fehler beim Abrufen der Benutzerdaten.");
    return;
  }

  const tasksByStatus = {
    toDo: document.getElementById("to-do-id"),
    inProgress: document.getElementById("in-progress-id"),
    awaitFeedback: document.getElementById("await-feedback-id"),
    done: document.getElementById("done-id"),
  };

  for (const status in tasksByStatus) {
    if (Object.hasOwnProperty.call(tasksByStatus, status)) {
      const tasks = currentUser.tasks.board.filter((task) => task === status);
      const element = tasksByStatus[status];
      element.innerHTML = "";
      tasks.forEach((task) => {
        element.innerHTML += generateTaskHTML(task);
      });
    }
  }
  console.log("currentUser :>> ", currentUser);
  toggleVisibility("board-body-id", true);

  loadHeaderInitials();
}

function startDragging(index) {
  currentDraggedElement = index;
}

function generateTaskHTML(titles, descriptions, assignedTo, dates, prios, categories, subtasks) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging('${titles}')" class="board-card">
    <div class="container-1">

            <span class="categorie-block">${currentUser.tasks.categories}</span>

            <button class="x-button-board"></button>

        </div>
        <div class="container-2">

            <div class="title-block">
                <span>${currentUser.tasks.titles}</span>
            </div>

            <div class="description-block">
                <span>${currentUser.tasks.descriptions}</span>
            </div>

            <div class="date-prio-block">
                <div class="static-block">
                    <div>Due date:</div>
                    <div>Priority:</div>
                </div>
                <div class="changeing-block">
                    <div>10/05/2023 ${currentUser.tasks.dates}</div>
                    <div>Medium <img src="./assets/img/board_medium.png" alt="Medium">${currentUser.tasks.prios}</div>
                </div>
            </div>

        </div>

        <div>
            <div class="assignedTo">
                <div class="static-block">Assigned To:</div>
                <div class="assignedTo-box">
                    <div class="assignedTo-pic">${currentUser.tasks.assignedTo}</div>
                    <div class="assignedTo-text">${currentUser.tasks.assignedTo}</div>
                </div>
            </div>
        </div>

        <div class="little-card-subtasks">
            <div class="relativ">
                <div class="gray"></div>
                <div class="blaue"></div>
            </div>
            <div>
                <div class="little-subtask">1/2 Subtasks</div>
            </div>
        </div>

        <div>
            <div class="subtask">
                <div class="static-block" >Subtasks</div>
                <div class="subtask-box">
                    <input type="checkbox"><span>${currentUser.tasks.subtasks}</span>
                </div>
            </div>
        </div>

        <div class="delete-edit">
            <div class="delete-edit-box"><img src="./assets/img/board_delete.png" alt="Delete"><span>Delete</span></div>
            <div class="seperator"></div>
            <div class="delete-edit-box"><img src="./assets/img/board_edit.png" alt="Edit"><span>Edit</span></div>
        </div>
    </div>`;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(board) {
  tasks[currentDraggedElement]["board"] = board;
  updateHTML();
}
