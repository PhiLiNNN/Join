function contactsInit() {
    renderContacts();
}


function renderContacts() {

}


function addContactScreenMobile() {
    const content = document.getElementById("contacts-content-id");
    content.innerHTML = addContactFormMobileHTML();
    hideHeaderAndFooter();
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
