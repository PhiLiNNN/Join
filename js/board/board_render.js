/**
 * Renders the assigned contacts on the board cards.
 * @param {number} index - The index of the task.
 */
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

/**
 * Renders the assigned information for a opened card.
 * @param {number} index - The index of the card in the tasks array.
 */
function renderInfoAssignedTo(index) {
  let element = document.getElementById("board-info-assignedTo-id");
  element.innerHTML = "";
  let emptyEl = document.getElementById("board-info-no-users-assigned-id");
  emptyEl.innerHTML = "";
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

/**
 * Renders the information about subtasks for a opened card.
 * @param {number} index - The index of the card in the tasks array.
 */
function renderInfoSubtasks(index) {
  let element = document.getElementById("board-info-subtasks-id");
  element.innerHTML = "";
  if (currentUser.tasks.subtasks[index].tasks.length === 0)
    toggleVisibility("no-subtasks-id", false);
  else {
    toggleVisibility("no-subtasks-id", true);
    currentUser.tasks.subtasks[index].tasks.forEach((task, idx) => {
      const isChecked = currentUser.tasks.subtasks[index].done[idx];
      element.innerHTML += templateInfoSubtasksHTML(task, isChecked, idx, index);
    });
  }
}

/**
 * Renders the added contacts to edit the task.
 * @param {number} index - The index of the task.
 * This function retrieves the added contacts element by its ID, clears its content,
 * and then iterates through the assigned contacts for the specified task to render them underneath the assignedTo dropdown  menu.
 */
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

/**
 * Renders the content of the opened card information section for a specific task.
 * @param {number} index - The index of the task in the current user's tasks.
 */
function renderCardContent(index) {
  let element = document.getElementById("board-card-info-id");
  element.innerHTML = "";
  const {bgColor, prio, date} = prepareCardInfoInputs(index);
  element.innerHTML = templateCardInfoHTML(index, bgColor, prio, date);
}

/**
 * Renders filtered task cards on the board based on the provided list of indices.
 * @param {number[]} list - The list of indices of tasks to render.
 */
function renderFilteredCards(list) {
  let {toDoEl, inProgEl, awaitFedEl, doneEl} = getBoardElements();
  const taskElements = {
    toDo: toDoEl,
    inProgress: inProgEl,
    awaitFeedback: awaitFedEl,
    done: doneEl,
  };
  clearElementInnerHTML(toDoEl, inProgEl, awaitFedEl, doneEl);
  list.forEach((item) => {
    const task = currentUser.tasks.board[item];
    const prio = currentUser.tasks.prios[item];
    const bgColor = getCategoryBgColor(currentUser.tasks.categories[item]);
    const {tasksDone, progress} = updateSubtaskStatusBar(item);
    taskElements[task].innerHTML += generateTaskHTML(item, prio, bgColor, tasksDone, progress);
    renderBoardAssignedTo(item);
  });
}
