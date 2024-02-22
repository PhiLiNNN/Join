function contactsInit() {
    renderContacts();
    renderAddContactButtonMobile();
}


function renderContacts() {

}


function renderAddContactButtonMobile() {
    const content = document.getElementById("contacts-content-id");
    const addContactButtonContainer = document.createElement("div");
    addContactButtonContainer.classList.add("addContactButtonContainerMobile");
    addContactButtonContainer.innerHTML =/*html*/ `
        <img src="./assets/img/contacts/addContactButtonMobile.svg" class="addContactImage" onclick="addContactScreenMobile()">`;
    content.appendChild(addContactButtonContainer);
}


function addContactScreenMobile() {
    const content = document.getElementById("contacts-content-id");
    content.innerHTML = addContactFormMobileHTML();
    hideHeaderAndFooter();
}

function addContactFormMobileHTML() {
    return /*html*/ `
      <div class="addContactContainerHeaderMobile">
        <div class="addContactCloseXContainerMobile">
          <button class="addContactCloseXButtonMobile" onclick="redirectToContacts()">X</button>
        </div>
        <div class="addContactBlockHeaderMobile">
          <p class="addContactH1Mobile">Add contact</p>
          <p class="addContactTextMobile">Tasks are better with a team!</p>
          <img class="addContactBlueStrokedMobile" src="../assets/img/contacts/addContactBlueStroked.svg" alt="addContactBlueStroked">
        </div>
        <div>
          <img class="addContactBlankUserImgMobile" src="../assets/img/contacts/addContactBlankUserImg.svg" alt="addContactBlankUserImg">
        </div>
      </div>
      <form id="add-contact-form-mobile-id" onsubmit="createContactMobile()">
        <div class="addContactContainerFooterMobile">
          <input class="addContactInputNameMobile" name="addContactInputNameMobile" id="addContactInputNameMobileID" type="text" required placeholder="Name">
          <input class="addContactInputMailAddresssMobile" name="addContactInputMailAddresssMobile" id="addContactInputMailAddresssMobileID" type="text" required placeholder="E Mail">
          <input class="addContactInputPhoneMobile" name="addContactInputPhoneMobile" id="addContactInputPhoneMobileID" type="text" required placeholder="Phone">
          <img class="createContactButtonImg" src="../assets/img/contacts/createContactButton.svg" alt="createContactButton" onclick="createContactMobile()">
        </div>
      </form>
    `;
}


/**
  * Hide header and footer for edit contact and create contact screen on mobile view
  */
function hideHeaderAndFooter() {
    const mobileHeader = document.querySelector(".mobileHeader"); 
    const menuTemplate = document.querySelector(".menuTemplate");
    mobileHeader.style.display = "none";
    menuTemplate.style.display = "none";
  }
  
/**
  * Show header and footer screen on mobile view
  */
function showHeaderAndFooter() {
    const mobileHeader = document.querySelector(".mobileHeader");
    const menuTemplate = document.querySelector(".menuTemplate");
    mobileHeader.style.display = "flex";
    menuTemplate.style.display = "flex";
}

function redirectToContacts() {
    window.location.assign("../contacts.html");
}
