let currentUser;
let isUserLoggedIn;

function legalsInit() {
  const isUserLoggedIn = checkUserLogIn();
  const header = document.getElementById("header-id");
  const footer = document.getElementById("footer-id");
  const headerHTML = isUserLoggedIn ? templateHeaderHTML(false) : templateHeaderHTML(true);
  const footerHTML = isUserLoggedIn ? templateFooterHTML(false) : templateFooterHTML(true);
  header.innerHTML = headerHTML;
  footer.innerHTML = footerHTML;

  if (isUserLoggedIn) {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    loadHeaderInitials();
  }
}

async function helpInit() {
  await includeHTML();
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  loadHeaderInitials();
}

function templateHeaderHTML(isVisible) {
  const visibilityStyle = isVisible ? "visibility: hidden;" : "visibility: visible;";
  return /*html*/ `
    <div class="header-gap">
        <img class="header-logo" src="/assets/img/logo.png" alt="join logo" />
        <span class="header-info">Kanban Project Management Tool</span>
        <div class="header-menu-container" style="${visibilityStyle}">
          <a href="/help.html">
          <img  class="header-logo" src="/assets/img/help.png" alt="join logo" />
          </a>
          <div id="header-initials-id" class="header-profil" onclick="togglelogoutContainer()"></div>
          <div id="logout-id" class="logout-dropdown">
              <a href="/privacy_policy.html" >Privacy Policy</a>
              <a href="/legal_notice.html">Legal Notice</a>
              
              <a href="./index.html">Log out</a>
          </div>
        </div>
        </div>
      </div>
  `;
}
function templateFooterHTML(isVisible) {
  const visibilityStyle = isVisible ? "visibility: hidden;" : "visibility: visible;";
  return /*html*/ `
    <div class="footer-wrapper">
        <div class="desktop-logo">
            <img src="/assets/img/footer_logo.png" alt="Join Logo">
        </div>
        <div  class="menu-wrapper">
            <div class="menu-content" style="${visibilityStyle}" >
                <div class="footer-icon-box">
                    <a href="/summary.html" class="footer-link">
                        <img src="/assets/img/summary_Icons.png" alt="Summary" class="footer-icon"> 
                        Summary
                    </a>
                </div>
                <div class="footer-icon-box">
                    <a href="/board.html" class="footer-link">
                        <img src="/assets/img/Board_Icons.png" alt="Board" class="footer-icon">
                        Board
                    </a>
                </div>
                <div class="footer-icon-box">
                    <a href="/add_task.html" class="footer-link">
                        <img src="/assets/img/Add_Tasks_Icon.png" alt="Add Tasks" class="footer-icon">
                        Add Tasks
                    </a>
                </div>
                <div class="footer-icon-box">
                    <a href="/contacts.html" class="footer-link">
                        <img src="/assets/img/Contacts_Icons.png" alt="Contacts" class="footer-icon">
                        Contacts
                    </a>
                    </div>
                </div>
            </div>
        </div>
       
        <div class="desktop-data-box">
            <a href="/privacy_policy.html" class="desktop-data-link">Privacy Policy</a>
            <a href="/legal_notice.html" class="desktop-data-link">Legal notice</a>
        </div>
        
    </div>
  `;
}

function goBack() {
  window.history.back();
}

function showLegals(page) {
  if (page === "policy") window.location.assign("../privacy_policy.html");
  else if (page === "legal") window.location.assign("../legal_notice.html");
}
