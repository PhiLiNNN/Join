function generateTaskHTML(index, prio) {
  const progressWidth = ((0 / currentUser.tasks.subtasks[index].length) * 100).toFixed(2);
  return /*html*/ `
    <div id="draggedCard${index}-id" draggable="true" onclick="openCardInfo()" ondragstart="startDragging(event,'${currentUser.tasks.titles[index]}', '${index}')" class="board-card">
        <div class="category-container">
            <span class="category-block">${currentUser.tasks.categories[index]}</span>
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

function templateCardInfoHTML() {
  return /*html*/ `
    <div class="card-info-wrapper">
        <div id="card-info-section-id" class="card-info-section">
            <div >
                <span >${currentUser.tasks.categories}</span>  
                <button  ></button>  
            </div>
            <div > 
                <div >
                    <span>${currentUser.tasks.titles}</span>
                </div>  
                <div >
                    <span>${currentUser.tasks.descriptions}</span>
                </div>  
                <div >
                    <div >
                        <div>Due date:</div>
                        <div>Priority:</div>
                    </div>
                    <div >
                        <div>10/05/2023 ${currentUser.tasks.dates}</div>
                        <div>Medium <img src="./assets/img/board_medium.png" alt="Medium">${currentUser.tasks.prios}</div>
                    </div>
                </div>  
            </div> 
            <div>
                <div>
                    <div >Assigned To:</div>
                    <div >
                        <div >${currentUser.tasks.assignedTo}</div>
                        <div >${currentUser.tasks.assignedTo}</div>
                    </div>
                </div>
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
                        <input type="checkbox"><span>${currentUser.tasks.subtasks}</span>
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

function emptyBoardMsgToHTML() {
  return /*html*/ `
    <span class="noTaskMsg">
        No tasks to do
    </span>
`;
}
