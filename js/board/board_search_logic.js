/**
 * Clears the inner HTML content of the specified board elements.
 * @param {HTMLElement} toDoEl - The element representing the "To Do" column.
 * @param {HTMLElement} inProgEl - The element representing the "In Progress" column.
 * @param {HTMLElement} awaitFedEl - The element representing the "Awaiting Feedback" column.
 * @param {HTMLElement} doneEl - The element representing the "Done" column.
 */
function clearElementInnerHTML(toDoEl, inProgEl, awaitFedEl, doneEl) {
  toDoEl.innerHTML = "";
  inProgEl.innerHTML = "";
  awaitFedEl.innerHTML = "";
  doneEl.innerHTML = "";
}

/**
 * Filters the all tasks based on the search input value.
 */
function filterToDos() {
  const searchInputElement = window.innerWidth < 761 ? "search-mobile-id" : "search-desktop-id";
  const searchInput = document.getElementById(searchInputElement).value.toLowerCase();
  const uniqueList = getUniqueIndices(searchInput);
  noTasksFoundFeedback(uniqueList);
  renderFilteredCards(uniqueList);
  checkIfSectionIsEmpty();
  getHoverContainerGeometry();
  setDragEventListeners();
  truncateTextIfTooLong(".description-block", 40);
  truncateTextIfTooLong(".title-block", 40);
}

/**
 * Provides feedback if no tasks are found based on the provided unique list(search input).
 * If the unique list is empty, it displays an error message and hides it after a timeout.
 * @param {number[]} uniqueList - The list of unique indices of tasks.
 */
function noTasksFoundFeedback(uniqueList) {
  if (uniqueList.length === 0) {
    setTimeout(() => {
      toggleVisibility("search-desktop-err-id", false);
      toggleVisibility("search-mobile-err-id", false);
    }, 1000);
    toggleVisibility("search-desktop-err-id", true);
    toggleVisibility("search-mobile-err-id", true);
  }
}

/**
 * Retrieves unique indices of elements in an array based on the provided search input.
 * @param {string} input - The input string to search for.
 * @returns {number[]} Returns an array of unique indices.
 */
function getUniqueIndices(input) {
  return (uniqueList = [
    ...new Set([
      ...descriptions
        .map((description, index) => ({description, index}))
        .filter(({description}) => description.toLowerCase().includes(input))
        .map(({index}) => index),
      ...titles
        .map((title, index) => ({title, index}))
        .filter(({title}) => title.toLowerCase().includes(input))
        .map(({index}) => index),
    ]),
  ]);
}
