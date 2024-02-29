let isRotated = false;

async function initAddTask() {
    
}

// Funktrion wieder löschen, wenn alles fertig ist
function showHeaderAndFooter() {
  const mobileHeader = document.querySelector(".header-gap");
  const menuTemplate = document.querySelector(".footerCLass");
  mobileHeader.style.display = "flex";
  menuTemplate.style.display = "block";
}



function toggleAssignedToContainer() {
  const arrowElement = document.getElementById('rotate-arrow-id');
  const assignedToContainer = document.getElementById('Assigned-to-contacts-id');
  const contentContainer = document.getElementById('assigned-to-content-id');
  isRotated = !isRotated; 
  if (isRotated) {
    assignedToContainer.innerHTML = templateAssignedToContainerHTML();
    arrowElement.style.transform = 'rotate(180deg)';
    toggleVisibility('Assigned-to-contacts-id', false, className = 'visible');
  } else {
    contentContainer.style.transition = 'opacity 0ms ease';
    toggleVisibility('Assigned-to-contacts-id', true, className = 'visible');
    arrowElement.style.transform = 'none'; 
  }
}


