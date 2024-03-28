let currentDraggedElement;


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

  generateCardHTML();

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
    let overlayContent = document.getElementById('board-body-id')
    overlayContent.innerHTML += templatAddTaskHTML();
}



//add Task Overlay

function createAddTask() {
    let overlayContent = document.getElementById('board-body-id')
    overlayContent.innerHTML += templatAddTaskHTML();
}

function showAddTask() {
    document.getElementById('overlay-add-id').style.display = 'block';
}

function hideAddTask() {
    document.getElementById('overlay-add-id').style.display = 'none';
}

function openAddTaskOverlay() {
    createAddTask(); 
    showAddTask(); 
}

function closeAddTaskOverlay() {
    hideAddTask(); 
}