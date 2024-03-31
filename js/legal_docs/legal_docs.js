let currentUser;
let isUserLoggedIn;

function legalsInit(event) {
  const isUserLoggedIn = checkUserLogIn();
  const header = document.getElementById("header-id");
  const footer = document.getElementById("footer-id");
  const headerHTML = isUserLoggedIn ? templateHeaderHTML(false) : templateHeaderHTML(true);
  const footerHTML = isUserLoggedIn ? templateFooterHTML(false) : templateFooterHTML(true);
  header.innerHTML = headerHTML;
  footer.innerHTML = footerHTML;
  console.log("event :>> ", event);

  if (isUserLoggedIn) {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (event.target.activeElement.id === "policy-id")
      toggleVisibility("policy-menu-id", false, "highlight-menu");
    else if (event.target.activeElement.id === "legal-id")
      toggleVisibility("legal-menu-id", false, "highlight-menu");
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
      <svg class="header-logo"  viewBox="0 0 101 122" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M71.6721 0H49.5143V25.4923H71.6721V0Z" fill="#2A3647"/>
        <path d="M49.5142 46.2251H71.6721V82.1779C71.7733 90.8292 69.3112 99.3153 64.5986 106.557C59.9455 113.594 50.963 121.966 34.3446 121.966C16.2434 121.966 5.69286 113.406 0 108.715L13.9765 91.4743C19.533 96.0112 24.885 99.7435 34.4299 99.7435C41.6567 99.7435 44.5372 96.7988 46.2247 94.2307C48.5186 90.6637 49.7052 86.4923 49.6335 82.2464L49.5142 46.2251Z" fill="#2A3647"/>
        <path d="M38.2137 30.1318H16.0559V52.3884H38.2137V30.1318Z" fill="#29ABE2"/>
        <path d="M83.2793 111.522C83.2793 116.265 80.8761 118.815 77.5183 118.815C74.1605 118.815 71.9618 115.785 71.9618 111.762C71.9618 107.739 74.2287 104.554 77.7058 104.554C81.1829 104.554 83.2793 107.687 83.2793 111.522ZM74.5355 111.711C74.5355 114.57 75.6775 116.675 77.6376 116.675C79.5977 116.675 80.7056 114.45 80.7056 111.539C80.7056 108.988 79.6829 106.592 77.6376 106.592C75.5923 106.592 74.5355 108.903 74.5355 111.711Z" fill="#2A3647"/>
        <path d="M87.6768 104.76V118.593H85.2224V104.76H87.6768Z" fill="#2A3647"/>
        <path d="M90.3358 118.593V104.76H93.0629L95.9946 110.461C96.7493 111.952 97.4207 113.483 98.0058 115.049C97.8524 113.337 97.7843 111.368 97.7843 109.177V104.76H100.034V118.593H97.4945L94.5288 112.772C93.7436 111.243 93.0437 109.671 92.4323 108.064C92.4323 109.776 92.5516 111.711 92.5516 114.09V118.576L90.3358 118.593Z" fill="#2A3647"/>
      </svg>
        <span class="header-info">Kanban Project Management Tool</span>
        <div class="header-menu-container" style="${visibilityStyle}">
          <a href="/help.html">
          <img  class="header-logo" src="/assets/img/help.png" alt="join logo" />
          </a>
          <div id="header-initials-id" class="header-profil" onclick="togglelogoutContainer()"></div>
          <div id="logout-id" class="logout-dropdown">
              <a href="/privacy_policy.html" >Privacy Policy</a>
              <a  href="/legal_notice.html">Legal Notice</a>
              
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
                  <svg
        width="101"
        height="122"
        viewBox="0 0 101 122"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path class="change-color" d="M71.6725 0H49.5146V25.4923H71.6725V0Z" fill="white" />
        <path
          class="change-color"
          d="M49.5142 46.2251H71.6721V82.1779C71.7733 90.8292 69.3112 99.3153 64.5986 106.557C59.9455 113.594 50.963 121.966 34.3446 121.966C16.2434 121.966 5.69286 113.406 0 108.715L13.9765 91.4743C19.533 96.0112 24.885 99.7435 34.4299 99.7435C41.6567 99.7435 44.5372 96.7988 46.2247 94.2307C48.5186 90.6637 49.7052 86.4923 49.6335 82.2464L49.5142 46.2251Z"
          fill="white" />
        <path d="M38.2135 30.1318H16.0557V52.3884H38.2135V30.1318Z" fill="#29ABE2" />
        <path
          class="change-color"
          d="M83.2795 111.522C83.2795 116.265 80.8762 118.815 77.5184 118.815C74.1607 118.815 71.9619 115.785 71.9619 111.762C71.9619 107.739 74.2288 104.554 77.7059 104.554C81.183 104.554 83.2795 107.687 83.2795 111.522ZM74.5356 111.711C74.5356 114.57 75.6776 116.675 77.6377 116.675C79.5978 116.675 80.7057 114.45 80.7057 111.539C80.7057 108.988 79.6831 106.592 77.6377 106.592C75.5924 106.592 74.5356 108.903 74.5356 111.711Z"
          fill="white" />
        <path
          class="change-color"
          d="M87.6771 104.76V118.593H85.2227V104.76H87.6771Z"
          fill="white" />
        <path
          class="change-color"
          d="M90.3359 118.593V104.76H93.0631L95.9947 110.461C96.7494 111.952 97.4209 113.483 98.006 115.049C97.8526 113.337 97.7844 111.368 97.7844 109.177V104.76H100.034V118.593H97.4946L94.5289 112.772C93.7437 111.243 93.0438 109.671 92.4324 108.064C92.4324 109.776 92.5517 111.711 92.5517 114.09V118.576L90.3359 118.593Z"
          fill="white" />
      </svg>
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
          <div id="policy-menu-id" class="desktop-data-content" showLegals="legals('policy')">
            <a  href="/privacy_policy.html" class="desktop-data-link">Privacy Policy</a>
          </div>
          <div id="legal-menu-id"class="desktop-data-content" showLegals="legals('legal')">
            <a  href="/legal_notice.html" class="desktop-data-link">Legal notice</a>
          </div>
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
