function generateTaskHTML(index, prio, bgColor) {
  const progressWidth = ((0 / currentUser.tasks.subtasks[index].length) * 100).toFixed(2);
  return /*html*/ `
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
            <div class="subtasks-block">
              <div class="progress-bar">
                <div class="progress" style="width: ${progressWidth}%"></div> 
              </div>
              <span >0/${currentUser.tasks.subtasks[index].length} Subtasks</span>
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
    </div>`;
}

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

function templateCardInfoHTML(idx, bgColor, prio, date) {
  return /*html*/ `
    <div class="card-info-wrapper">
        <div id="card-info-section-id" class="card-info-section">
            <div class="close-board-at" onclick="closeCardInfo()">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9998 8.36587L2.0998 13.2659C1.91647 13.4492 1.68314 13.5409 1.3998 13.5409C1.11647 13.5409 0.883138 13.4492 0.699805 13.2659C0.516471 13.0825 0.424805 12.8492 0.424805 12.5659C0.424805 12.2825 0.516471 12.0492 0.699805 11.8659L5.5998 6.96587L0.699805 2.06587C0.516471 1.88254 0.424805 1.6492 0.424805 1.36587C0.424805 1.08254 0.516471 0.849202 0.699805 0.665869C0.883138 0.482536 1.11647 0.390869 1.3998 0.390869C1.68314 0.390869 1.91647 0.482536 2.0998 0.665869L6.9998 5.56587L11.8998 0.665869C12.0831 0.482536 12.3165 0.390869 12.5998 0.390869C12.8831 0.390869 13.1165 0.482536 13.2998 0.665869C13.4831 0.849202 13.5748 1.08254 13.5748 1.36587C13.5748 1.6492 13.4831 1.88254 13.2998 2.06587L8.3998 6.96587L13.2998 11.8659C13.4831 12.0492 13.5748 12.2825 13.5748 12.5659C13.5748 12.8492 13.4831 13.0825 13.2998 13.2659C13.1165 13.4492 12.8831 13.5409 12.5998 13.5409C12.3165 13.5409 12.0831 13.4492 11.8998 13.2659L6.9998 8.36587Z" fill="white"></path>
                </svg>
            </div>
            <div class="category-container">
                <span style="background-color: ${bgColor};" class="category-block">${currentUser.tasks.categories[idx]}</span>
            </div>
            <div > 
                <div class="board-info-title">
                    <span>${currentUser.tasks.titles[idx]}</span>
                </div>  
                <div class="board-info-description">
                    <span>${currentUser.tasks.descriptions[idx]}</span>
                </div>  
                <table class="board-info-table">
                    <tr>
                        <td class="board-info-color">Due date:</td>
                        <td>${date}</td>
                    </tr>
                    <tr>
                        <td class="board-info-color">Priority:</td>
                        <td><div class="board-info-prio-content">
                        ${currentUser.tasks.prios[idx]}
                        <img src="./assets/img/board_${prio}.png" alt="Medium">
                    </div></td>
                    </tr>
            </table>
            </div> 
            <div id="board-info-assigendTo-id">
                <span class="board-info-color board-info-big-size">Assigned To:</span>
  
            </div> 
            <div >
                <div >
                    <div ></div>
                    <div ></div>
                </div>
                <div>
                    <div >1/2 Subtasks</div>
                </div>
            </div>  
            <div>
                <div >
                    <div >Subtasks</div>
                    <div >
                        <input type="checkbox"><span>${currentUser.tasks.subtasks[idx]}</span>
                    </div>
                </div>
            </div>  
            <div >
                <div ><img src="./assets/img/board_delete.png" alt="Delete"><span>Delete</span></div>
                <div ></div>
                <div ><img src="./assets/img/board_edit.png" alt="Edit"><span>Edit</span></div>
            </div>
        </div>
    </div>
    `;
}
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
function emptyBoardMsgToHTML() {
  return /*html*/ `
    <span class="noTaskMsg">
        No tasks to do
    </span>
`;
}
