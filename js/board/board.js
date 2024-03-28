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
  console.log("currentUser :>> ", currentUser);
  if (!currentUser || !currentUser.tasks || !currentUser.tasks.board) {
    console.error("Fehler beim Abrufen der Benutzerdaten.");
    return;
  }

  toggleVisibility("board-body-id", true);

  loadHeaderInitials();

  renderAddTask();
}


function generateCardHTML(){
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
}

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


function openAddTask() {
    document.getElementById("add-task-Btn-id").addEventListener("click", function() {
    document.getElementById("overlay-add-id").style.display = "block";
    });
}

function closeAddTask() {
    document.getElementById("hide-add-task-Btn-id").addEventListener("click", function() {
    document.getElementById("overlay-add-id").style.display = "none";
    });
}
