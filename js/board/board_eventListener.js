/**
 * Sets up drag event listeners for all draggable elements.
 */
function setDragEventListeners() {
  const allDragElements = document.querySelectorAll(".board-card");
  allDragElements.forEach((el) => {
    el.addEventListener("drag", handleDrag);
    el.addEventListener("touchmove", function (eve) {
      eve.preventDefault();
      const touchobj = eve.touches[0];
      handleDrag(touchobj);
    });
    el.addEventListener("touchend", function (eve) {
      const touchobj = eve.changedTouches[0];
      if (isInsideRect(touchobj, "toDo")) moveTo("toDo");
      else if (isInsideRect(touchobj, "inProgress")) moveTo("inProgress");
      else if (isInsideRect(touchobj, "awaitFeedback")) moveTo("awaitFeedback");
      else if (isInsideRect(touchobj, "done")) moveTo("done");
      else toggleVisibility(`draggedCard${currentCard}-id`, true, "board-card-tilt");
    });
  });
}

/**
 * Adds event listeners to the search input fields for both desktop and mobile views.
 * Whenever there is an input event, the filterToDos function is called to filter tasks based on the search query.
 */
document.getElementById("search-desktop-id").addEventListener("input", filterToDos);
document.getElementById("search-mobile-id").addEventListener("input", filterToDos);

/**
 * Adds a dragend event listener to the document.
 * When a drag operation ends, it resets the height of hover containers and toggles the visibility of the dragged card.
 * If the drag operation is valid, it restores the tilt effect to the dragged card.
 */
document.addEventListener("dragend", () => {
  resetNewHoverContainerHeight();
  if (validDragEl) toggleVisibility(`draggedCard${currentCard}-id`, true, "board-card-tilt");
  validDragEl = false;
});

/**
 * Closes the "Edit Card Info" overlay when clicked outside of the overlay or on the close and menu buttons.
 * Removes the event listener once the overlay is closed.
 */
function closeEditCardInfoByEventListener() {
  const clickHandler = (event) => {
    const cardInfoSection = document.getElementById("at-section-id");
    const closeButtonFilled = event.target.closest("#close-edit-at-id");
    const closeButtonBlank = event.target.closest("#close-board-at-id");
    const editMButton = event.target.closest("#at-ok-btn");
    if (!cardInfoSection.contains(event.target)) {
      closeOverlay();
      document.removeEventListener("click", clickHandler);
    } else if (closeButtonFilled || editMButton || closeButtonBlank)
      document.removeEventListener("click", clickHandler);
  };
  document.addEventListener("click", clickHandler);
}
