let currentDraggedElement;
let isUserLoggedIn;
let currentUser;

function initBoard() {
  isUserLoggedIn = checkUserLogIn();
  if (!isUserLoggedIn) window.location.assign("../errorPage.html");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let toDo = currentUser.tasks.board.filter((t) => t == "toDo");
  const element0 = document.getElementById("to-do-id");
  element0.innerHTML = "";
  for (let index = 0; index < toDo.length; index++) {
    const elementTodo = toDo[index];
    element0.innerHTML += generateTaskHTML(elementTodo);
  }
  let inProgres = currentUser.tasks.board.filter((t) => t == "inProgres");
  const element1 = document.getElementById("in-progres-id");
  element1.innerHTML = "";
  for (let index = 0; index < inProgres.length; index++) {
    const elementInProgres = inProgres[index];
    element1.innerHTML += generateTaskHTML(elementInProgres);
  }
  let awaitFeedback = currentUser.tasks.board.filter((t) => t == "awaitFeedback");
  const element2 = document.getElementById("await-feedback-id");
  element2.innerHTML = "";
  for (let index = 0; index < awaitFeedback.length; index++) {
    const elementawaitFeedback = awaitFeedback[index];
    element2.innerHTML += generateTaskHTML(elementawaitFeedback);
  }
  let done = currentUser.tasks.board.filter((t) => t == "done");
  const element3 = document.getElementById("done-id");
  element3.innerHTML = "";
  for (let index = 0; index < done.length; index++) {
    const elementdone = done[index];
    element3.innerHTML += generateTaskHTML(elementdone);
  }
  toggleVisibility("board-body-id", true);
}

function startDragging(titles) {
  currentDraggedElement = titles;
}

function generateTaskHTML(titles, descriptions, assignedTo, dates, prios, categories, subtasks) {
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging('${titles}')" class="board-card">
    <div class="container-1">

            <span class="categorie-block">${categories}</span>

            <button class="x-button-board"></button>

        </div>
        <div class="container-2">

            <div class="title-block">
                <span>${titles}</span>
            </div>

            <div class="description-block">
                <span>${descriptions}</span>
            </div>

            <div class="date-prio-block">
                <div class="static-block">
                    <div>Due date:</div>
                    <div>Priority:</div>
                </div>
                <div class="changeing-block">
                    <div>10/05/2023 ${dates}</div>
                    <div>Medium <img src="./assets/img/board_medium.png" alt="Medium">${prios}</div>
                </div>
            </div>

        </div>

        <div>
            <div class="assignedTo">
                <div class="static-block">Assigned To:</div>
                <div class="assignedTo-box">
                    <div class="assignedTo-pic">${assignedTo}</div>
                    <div class="assignedTo-text">${assignedTo}</div>
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
                    <input type="checkbox"><span>${subtasks}</span>
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
