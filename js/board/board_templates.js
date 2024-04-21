/**
 * Generates HTML for a task card based on the provided data.
 * @param {number} index - The index of the task.
 * @param {string} prio - The priority of the task.
 * @param {string} bgColor - The background color of the task category.
 * @param {number} tasksDone - The number of subtasks completed.
 * @param {number} progress - The progress percentage of subtasks completed.
 * @returns {string} - The HTML code for the task card.
 */
function generateTaskHTML(index, prio, bgColor, tasksDone, progress) {
  let value;
  if (!progress) value = "none";
  else value = "";
  return /*html*/ `
  <div class="card">
    <div id="draggedCard${index}-id" draggable="true" onclick="openCardInfo('${index}')" ondragstart="startDragging(event,'${currentUser.tasks.titles[index]}', '${index}')" class="board-card">
        <div class="category-container">
            <span style="background-color: ${bgColor};" class="category-block">${currentUser.tasks.categories[index]}</span>
        </div>
        <div class="task-container">
            <div class="title-block">
                <span>${currentUser.tasks.titles[index]}</span>
            </div>
            <div class="description-block">
                <span >${currentUser.tasks.descriptions[index]}</span>
            </div>
            <div class="subtasks-block" style="display: ${value}">

              <div class="progress-bar">
                <div class="progress" style="width: ${progress}%"></div> 
              </div>
              <span >${tasksDone}/${currentUser.tasks.subtasks[index].tasks.length} Subtasks</span>
            </div>
            <div class="priority-block">   
                <div id="board-assignedTo-id${index}"  class="board-added-contacts"></div>
                <div class="board-assignedTo-prio"><img src="./assets/img/board_${prio}.png" alt="Medium"></div>
            </div>
        </div>
        <div>
            <div class="assignedTo">
                <div class="assignedTo-box">
                    <div class="assignedTo-pic">${currentUser.tasks.assignedTo[index]}</div>
                </div>
            </div>
        </div>
        <div class="little-card-subtasks">
            <div class="relativ">
                <div class="gray"></div>
                <div class="blue"></div>
            </div>
            <div>
                <div class="little-subtask">1/2 Subtasks</div>
            </div>
        </div>
    </div>
        <button class="move-to-button" onclick="openMenu()">
            <div>
               ... 
            </div>
        </button>
        <div class="move-to-container">
            <div class="move-to-menu">
            <div class="move-to-headline">
                <span>Move to</span> 
                <button onclick="closeMenu()" class="move-to-button2"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_166979_2247" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
                <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_166979_2247)">
                <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6834 22.575 10.4 22.575C10.1167 22.575 9.88338 22.4834 9.70005 22.3C9.51672 22.1167 9.42505 21.8834 9.42505 21.6C9.42505 21.3167 9.51672 21.0834 9.70005 20.9L14.6 16L9.70005 11.1C9.51672 10.9167 9.42505 10.6834 9.42505 10.4C9.42505 10.1167 9.51672 9.88338 9.70005 9.70005C9.88338 9.51672 10.1167 9.42505 10.4 9.42505C10.6834 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0834 9.51672 21.3167 9.42505 21.6 9.42505C21.8834 9.42505 22.1167 9.51672 22.3 9.70005C22.4834 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4834 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4834 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4834 22.1167 22.3 22.3C22.1167 22.4834 21.8834 22.575 21.6 22.575C21.3167 22.575 21.0834 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647"/>
                </g>
                </svg>
            </div>
            <ul>
                <li onclick="moveToToDo(0)">To do</li>
                <li onclick="moveToInProgress(0)">In Progress</li>
                <li onclick="moveToAwaitFeedback(0)">Await Feedback</li>
                <li onclick="moveToDone(0)">Done</li>
            </ul>
        </div>
        </div>
   </div>`;
}

/**
 * Generates the HTML template for the assigned-to contacts on the board.
 * @param {number} idx - The index of the assigned-to contact.
 * @param {string} iconColor - The background color of the circle icon.
 * @param {string} initials - The initials to be displayed in the circle icon.
 * @param {string} textColor - The color of the text inside the circle icon.
 * @param {number} index - The index of the current task.
 * @returns {string} The HTML template for the assigned-to contact.
 */
function templateBoardAssignedToHTML(idx, iconColor, initials, textColor, index) {
  if (idx === 4) {
    iconColor = "#2a3647";
    initials = `+${currentUser.tasks.assignedTo[index].colorCodes.length - 4}`;
    textColor = "rgb(255, 255, 255)";
  }
  return /*html*/ `
  <div class="board-circle-style board-left-indent" style="background-color: ${iconColor}; color: ${textColor};">
    <span>
        ${initials}
    </span>
  </div>
`;
}

/**
 * Generates HTML template for the card info section.
 * @param {number} idx - The index of the card.
 * @param {string} bgColor - The background color of the category.
 * @param {string} prio - The priority of the task.
 * @param {string} date - The due date of the task.
 * @returns {string} The HTML template for the card info section.
 */
function templateCardInfoHTML(idx, bgColor, prio, date) {
  let firstLetterUpperCasePrio =
    currentUser.tasks.prios[idx].charAt(0).toUpperCase() + currentUser.tasks.prios[idx].slice(1);
  return /*html*/ `
    <div class="card-info-wrapper">
        <div id="card-info-section-id" class="card-info-section">
            <div class="close-board-info-at" onclick="closeCardInfo()">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9998 8.36587L2.0998 13.2659C1.91647 13.4492 1.68314 13.5409 1.3998 13.5409C1.11647 13.5409 0.883138 13.4492 0.699805 13.2659C0.516471 13.0825 0.424805 12.8492 0.424805 12.5659C0.424805 12.2825 0.516471 12.0492 0.699805 11.8659L5.5998 6.96587L0.699805 2.06587C0.516471 1.88254 0.424805 1.6492 0.424805 1.36587C0.424805 1.08254 0.516471 0.849202 0.699805 0.665869C0.883138 0.482536 1.11647 0.390869 1.3998 0.390869C1.68314 0.390869 1.91647 0.482536 2.0998 0.665869L6.9998 5.56587L11.8998 0.665869C12.0831 0.482536 12.3165 0.390869 12.5998 0.390869C12.8831 0.390869 13.1165 0.482536 13.2998 0.665869C13.4831 0.849202 13.5748 1.08254 13.5748 1.36587C13.5748 1.6492 13.4831 1.88254 13.2998 2.06587L8.3998 6.96587L13.2998 11.8659C13.4831 12.0492 13.5748 12.2825 13.5748 12.5659C13.5748 12.8492 13.4831 13.0825 13.2998 13.2659C13.1165 13.4492 12.8831 13.5409 12.5998 13.5409C12.3165 13.5409 12.0831 13.4492 11.8998 13.2659L6.9998 8.36587Z" fill="white"></path>
                </svg>
            </div>
            <div id="board-info-category-bg-id" style="background-color: ${bgColor};" class="board-info-category">
                <span id="board-info-category-id">${currentUser.tasks.categories[idx]}</span>
            </div>
            <div id="board-content-container-id" class="board-content-container">
                <div class="board-info-title">
                    <span id="board-title-id">${currentUser.tasks.titles[idx]}</span>
                </div>  
                <div class="board-info-description board-info-margin">
                    <span id="board-description-id">${currentUser.tasks.descriptions[idx]}</span>
                </div>  
                <div class="board-info-table board-info-margin ">
                    <div class="board-info-date-content">
                        <span class="board-info-prop">Due date:</span>
                        <span id="board-date-id" >${date}</span>
                    </div>
                    <div class="board-info-prio-container">
                        <span class="board-info-prop prio-margin">Priority:</span>
                        <div class="board-info-prio-content">
                             <span id="board-prio-cat-id"> ${firstLetterUpperCasePrio}</span>
                            <img id="board-prio-img-id" src="./assets/img/board_${prio}.png" alt="Medium">
                        </div>
                    </div>
                </div>
                <div class="board-info-margin">
                    <span id="board-info-no-users-assigned-id" class="board-info-prop board-info-big-size">Assigned To:</span>
                    <div id="board-info-assignedTo-id" class="board-info-assignedTo"></div>
                </div> 
                <div id="no-subtasks-id"  class="board-info-margin">
                    <span  class="board-info-prop board-info-big-size">Subtasks</span>
                    <div id="board-info-subtasks-id" class="board-info-subtasks"></div>
                </div> 
            </div>
            <div class="board-info-menu-container">
                <div class="board-info-menu" onclick="deleteBoardCard('${idx}')" >
                    <svg width="24" height="24" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.00098 18C2.45098 18 1.98014 17.8042 1.58848 17.4125C1.19681 17.0208 1.00098 16.55 1.00098 16V3C0.717643 3 0.480143 2.90417 0.288477 2.7125C0.0968099 2.52083 0.000976562 2.28333 0.000976562 2C0.000976562 1.71667 0.0968099 1.47917 0.288477 1.2875C0.480143 1.09583 0.717643 1 1.00098 1H5.00098C5.00098 0.716667 5.09681 0.479167 5.28848 0.2875C5.48014 0.0958333 5.71764 0 6.00098 0H10.001C10.2843 0 10.5218 0.0958333 10.7135 0.2875C10.9051 0.479167 11.001 0.716667 11.001 1H15.001C15.2843 1 15.5218 1.09583 15.7135 1.2875C15.9051 1.47917 16.001 1.71667 16.001 2C16.001 2.28333 15.9051 2.52083 15.7135 2.7125C15.5218 2.90417 15.2843 3 15.001 3V16C15.001 16.55 14.8051 17.0208 14.4135 17.4125C14.0218 17.8042 13.551 18 13.001 18H3.00098ZM3.00098 3V16H13.001V3H3.00098ZM5.00098 13C5.00098 13.2833 5.09681 13.5208 5.28848 13.7125C5.48014 13.9042 5.71764 14 6.00098 14C6.28431 14 6.52181 13.9042 6.71348 13.7125C6.90514 13.5208 7.00098 13.2833 7.00098 13V6C7.00098 5.71667 6.90514 5.47917 6.71348 5.2875C6.52181 5.09583 6.28431 5 6.00098 5C5.71764 5 5.48014 5.09583 5.28848 5.2875C5.09681 5.47917 5.00098 5.71667 5.00098 6V13ZM9.00098 13C9.00098 13.2833 9.09681 13.5208 9.28848 13.7125C9.48014 13.9042 9.71764 14 10.001 14C10.2843 14 10.5218 13.9042 10.7135 13.7125C10.9051 13.5208 11.001 13.2833 11.001 13V6C11.001 5.71667 10.9051 5.47917 10.7135 5.2875C10.5218 5.09583 10.2843 5 10.001 5C9.71764 5 9.48014 5.09583 9.28848 5.2875C9.09681 5.47917 9.00098 5.71667 9.00098 6V13Z" fill="#2A3647"/>
                    </svg>
                    <span class="desktop-edit-span-large">Delete</span>
                </div>
                <div  class="board-info-line" ></div>
                <div class="board-info-menu" onclick="openEditBoardCard('${idx}')">
                     <svg width="24" height="24" viewBox="0 0 19 19" fill="none"  xmlns="http://www.w3.org/2000/svg" >
                        <path d="M2.00098 17H3.40098L12.026 8.375L10.626 6.975L2.00098 15.6V17ZM16.301 6.925L12.051 2.725L13.451 1.325C13.8343 0.941667 14.3051 0.75 14.8635 0.75C15.4218 0.75 15.8926 0.941667 16.276 1.325L17.676 2.725C18.0593 3.10833 18.2593 3.57083 18.276 4.1125C18.2926 4.65417 18.1093 5.11667 17.726 5.5L16.301 6.925ZM14.851 8.4L4.25098 19H0.000976562V14.75L10.601 4.15L14.851 8.4Z"  fill="#2A3647"/>
                    </svg>
                    <span class="desktop-edit-span-small">Edit</span>
                </div>
            </div>
        </div>
    </div>
    `;
}

/**
 * Generates HTML template for the assigned to information.
 * @param {string} iconColor - The color of the circle icon.
 * @param {string} initials - The initials of the assigned contact.
 * @param {string} contact - The name of the assigned contact.
 * @param {string} textColor - The color of the text.
 * @returns {string} The HTML template for the assigned to information.
 */
function templateInfoAssignedToHTML(iconColor, initials, contact, textColor) {
  return /*html*/ `
  <div class="board-info-assignedTo-content">
      <div class="board-info-circle-style" style="background-color: ${iconColor}; color: ${textColor};">
        <span class="board-info-small-size">
            ${initials}
        </span>
      </div>
      <div>
        <span class="board-info-big-size">
            ${contact}
        </span>
      </div>
  </div>
`;
}

/**
 * Generates HTML template for subtask information.
 * @param {string} task - The subtask description.
 * @param {boolean} isChecked - Indicates if the subtask is checked or not.
 * @param {number} index - The index of the subtask.
 * @param {number} cardIndex - The index of the card containing the subtask.
 * @returns {string} The HTML template for the subtask information.
 */
function templateInfoSubtasksHTML(task, isChecked, index, cardIndex) {
  if (!isChecked) {
    hmtlCode = `
    <rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
    `;
  } else {
    hmtlCode = `
    <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
    <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }
  return /*html*/ `
  <div class="board-info-task" onclick="toggleSubtaskCheckbox('${index}', '${cardIndex}')" >
    <svg id="board-info-Subtaks${index}-id" width="16" height="16" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" data-checked="${
    isChecked ? "true" : "false"
  }">
        ${hmtlCode}
    </svg>
    <span class="board-info-big-size">
        ${task}
    </span>
  </div>
`;
}

/**
 * Generates HTML template for checked subtask.
 * @returns {string} The HTML template for the checked subtask.
 */
function templateCheckedSubtaskHTML() {
  return /*html*/ `
    <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
    <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
`;
}

/**
 * Generates HTML template for unchecked subtask.
 * @returns {string} The HTML template for the unchecked subtask.
 */
function templateNotCheckedSubtaskHTML() {
  return /*html*/ `
    <rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
`;
}

/**
 * Generates HTML template for empty board message.
 * @param {string} section - The section of the board.
 * @returns {string} The HTML template for the empty board message.
 */
function emptyBoardMsgToHTML(section) {
  let feedback = "";
  if (section === "done") feedback = "done";
  if (section === "inProgress") feedback = "in progress";
  if (section === "awaitFeedback") feedback = "await feedback";
  if (section === "toDo") feedback = "to do";
  return /*html*/ `
  <div id="noTaskMsg-container-id" class="noTaskMsg-container">
      <span class="noTaskMsg">
          No tasks ${feedback}
      </span>
  </div>
`;
}
