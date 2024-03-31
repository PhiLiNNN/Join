let savedName, savedEmail, savedPhone, savedIndex, savedBg, savedTextColor, savedInitials;

function templateAddContactHTML() {
  return /*html*/ `
    <div id="ac-card-content-id" class="card-content">
        <div  class="card-header">
            <div class="header-content-wrapper">
                <svg width="102" height="122" viewBox="0 0 102 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M72.6549 0H50.4971V25.4923H72.6549V0Z" fill="white"/>
                    <path d="M50.4971 46.2251H72.655V82.1779C72.7562 90.8292 70.2941 99.3153 65.5815 106.557C60.9284 113.594 51.9459 121.966 35.3275 121.966C17.2263 121.966 6.67577 113.406 0.98291 108.715L14.9594 91.4743C20.5159 96.0112 25.8679 99.7435 35.4128 99.7435C42.6396 99.7435 45.5202 96.7988 47.2076 94.2307C49.5015 90.6637 50.6881 86.4923 50.6165 82.2464L50.4971 46.2251Z" fill="white"/>
                    <path d="M39.1964 30.1318H17.0386V52.3884H39.1964V30.1318Z" fill="#29ABE2"/>
                    <path d="M84.2624 111.522C84.2624 116.265 81.8591 118.815 78.5013 118.815C75.1436 118.815 72.9448 115.785 72.9448 111.762C72.9448 107.739 75.2117 104.554 78.6888 104.554C82.1659 104.554 84.2624 107.687 84.2624 111.522ZM75.5185 111.711C75.5185 114.57 76.6605 116.675 78.6206 116.675C80.5808 116.675 81.6886 114.45 81.6886 111.539C81.6886 108.988 80.666 106.592 78.6206 106.592C76.5753 106.592 75.5185 108.903 75.5185 111.711Z" fill="white"/>
                    <path d="M88.66 104.76V118.593H86.2056V104.76H88.66Z" fill="white"/>
                    <path d="M91.3188 118.593V104.76H94.046L96.9776 110.461C97.7323 111.952 98.4038 113.483 98.9889 115.049C98.8355 113.337 98.7673 111.368 98.7673 109.177V104.76H101.017V118.593H98.4775L95.5118 112.772C94.7266 111.243 94.0267 109.671 93.4153 108.064C93.4153 109.776 93.5346 111.711 93.5346 114.09V118.576L91.3188 118.593Z" fill="white"/>
                </svg>
                <h1>Add Contact</h1>
                <span>Tasks are better with a team!</span>
                <div class="ac-bottom-line"></div>
            </div>
            <div class="close-ac-card-mobile" onclick="closeAddNewContact()">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9998 8.36587L2.0998 13.2659C1.91647 13.4492 1.68314 13.5409 1.3998 13.5409C1.11647 13.5409 0.883138 13.4492 0.699805 13.2659C0.516471 13.0825 0.424805 12.8492 0.424805 12.5659C0.424805 12.2825 0.516471 12.0492 0.699805 11.8659L5.5998 6.96587L0.699805 2.06587C0.516471 1.88254 0.424805 1.6492 0.424805 1.36587C0.424805 1.08254 0.516471 0.849202 0.699805 0.665869C0.883138 0.482536 1.11647 0.390869 1.3998 0.390869C1.68314 0.390869 1.91647 0.482536 2.0998 0.665869L6.9998 5.56587L11.8998 0.665869C12.0831 0.482536 12.3165 0.390869 12.5998 0.390869C12.8831 0.390869 13.1165 0.482536 13.2998 0.665869C13.4831 0.849202 13.5748 1.08254 13.5748 1.36587C13.5748 1.6492 13.4831 1.88254 13.2998 2.06587L8.3998 6.96587L13.2998 11.8659C13.4831 12.0492 13.5748 12.2825 13.5748 12.5659C13.5748 12.8492 13.4831 13.0825 13.2998 13.2659C13.1165 13.4492 12.8831 13.5409 12.5998 13.5409C12.3165 13.5409 12.0831 13.4492 11.8998 13.2659L6.9998 8.36587Z" fill="white"/>
                </svg>
            </div>
            <div class="ac-card-circle-mobile">
                <img src="./assets/img/person_white.png" alt="">
            </div>
        </div>
        <div class="card-footer">
            <div class="close-ac-card-desktop"  onclick="closeAddNewContact()">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9998 8.36587L2.0998 13.2659C1.91647 13.4492 1.68314 13.5409 1.3998 13.5409C1.11647 13.5409 0.883138 13.4492 0.699805 13.2659C0.516471 13.0825 0.424805 12.8492 0.424805 12.5659C0.424805 12.2825 0.516471 12.0492 0.699805 11.8659L5.5998 6.96587L0.699805 2.06587C0.516471 1.88254 0.424805 1.6492 0.424805 1.36587C0.424805 1.08254 0.516471 0.849202 0.699805 0.665869C0.883138 0.482536 1.11647 0.390869 1.3998 0.390869C1.68314 0.390869 1.91647 0.482536 2.0998 0.665869L6.9998 5.56587L11.8998 0.665869C12.0831 0.482536 12.3165 0.390869 12.5998 0.390869C12.8831 0.390869 13.1165 0.482536 13.2998 0.665869C13.4831 0.849202 13.5748 1.08254 13.5748 1.36587C13.5748 1.6492 13.4831 1.88254 13.2998 2.06587L8.3998 6.96587L13.2998 11.8659C13.4831 12.0492 13.5748 12.2825 13.5748 12.5659C13.5748 12.8492 13.4831 13.0825 13.2998 13.2659C13.1165 13.4492 12.8831 13.5409 12.5998 13.5409C12.3165 13.5409 12.0831 13.4492 11.8998 13.2659L6.9998 8.36587Z" fill="white"/>
                </svg>
            </div>
            <div class="footer-grid">
                <div class="ac-card-circle-wrapper">
                    <div class="ac-card-circle-desktop">
                        <img src="./assets/img/person_white.png" alt="">
                    </div>
                </div>
                <div class="footer-right">
                    <div class="card-inputs">
                        <div id="ac-name-border-id" class="input_global input_ac cursor">
                            <input id="ac-name-input-id"  type="text" placeholder="Name" autocomplete="on">
                            <div class="tooltip">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="#2a3647" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                                </svg>
                                <div class="tooltiptext">Valid inputs:
                                <ul>
                                    <li>First name only</li>
                                    <li>First name last name (with space)</li>
                                    <li>Double name (e.g., Lisa-Marie)</li>
                                </ul>
                                </div>
                            </div>
                            <img src="./assets/img/person.png" alt="">
                            <span id="ac-empty-name-id" class="ac-err-msg d-none">This field is required!</span>
                            <span id="ac-invalid-name-id" class="ac-err-msg d-none">Name must be at least 2 letters.</span>
                            <span id="ac-no-special-chars-id" class="ac-err-msg d-none">No special characters are allowed.</span>
                            <span id="ac-hyphens-name-id" class="ac-err-msg d-none">Check your hyphen!</span>
                        </div> 
                        <div id="ac-mail-border-id" class="input_global input_ac cursor">
                        <input id="ac-mail-input-id"  type="text" placeholder="Email" autocomplete="on">
                            <img src="./assets/img/mail.png" alt="">
                            <span id="ac-empty-email-id" class="ac-err-msg d-none">This field is required!</span>
                            <span id="ac-invalid-email-id" class="ac-err-msg d-none">Enter a valid email (e.g., user@example.com)!</span>
                            <span id="ac-existing-email-id" class="ac-err-msg d-none">This email is already in your contacts!</span>
                        </div> 
                        <div id="ac-phone-border-id" class="input_global input_ac cursor">
                        <input id="ac-phone-input-id" type="tel" placeholder="Phone" autocomplete="on" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                            <img src="./assets/img/call.png" alt="">
                            <span id="ac-empty-phone-id" class="ac-err-msg d-none">This field is required!</span>
                            <span id="ac-invalid-phone-id" class="ac-err-msg d-none">Min. 3 digits required!</span>
                        </div> 
                    </div>
                    
                    <div class="ac-btn-container">
                        <input id="ac-color-input-id"  class="color-style"  type="color" value="#43da86" />
                        <button class="ac-btn-white" onclick="closeAddNewContact()">
                            <span>Cancel</span>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button> 
                        <button class="ac-btn-fill" onclick="addNewContact()"> 
                            <span>Create contact</span>
                            <img src="./assets/img/check.png" alt="">
                        </button> 
                    </div>
                </div>
            </div>
      </div>
  `;
}

function templateCreateLettersHTML(letter) {
  return /*html*/ `
    <div class="letter-style"> ${letter}</div>
    <div id="letter-${letter}-id" class="contacts-container"></div>
  `;
}

function templateCreateContactsHTML(name, email, phone, bgColor, txtColor, initials, index) {
  return /*html*/ `
    <div  id="contact-${index}-id" class="contact-style" onclick="openContact('${name}','${email}',
                                                                                '${phone}','${index}','${bgColor}',
                                                                                '${txtColor}','${initials}')">
        <div class="contact-circle" style="background-color: ${bgColor}; color: ${txtColor};">${initials}</div>
        <div class="contact-content">
            <span>${name}</span>
            <span>${email}</span>
        </div>
    </div>
  `;
}

function templateEditContactHTML() {
  return /*html*/ `
    <div id="edit-card-content-id" class="card-content">
        <div  class="card-header">
            <div class="header-content-wrapper">
                <svg width="102" height="122" viewBox="0 0 102 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M72.6549 0H50.4971V25.4923H72.6549V0Z" fill="white"/>
                    <path d="M50.4971 46.2251H72.655V82.1779C72.7562 90.8292 70.2941 99.3153 65.5815 106.557C60.9284 113.594 51.9459 121.966 35.3275 121.966C17.2263 121.966 6.67577 113.406 0.98291 108.715L14.9594 91.4743C20.5159 96.0112 25.8679 99.7435 35.4128 99.7435C42.6396 99.7435 45.5202 96.7988 47.2076 94.2307C49.5015 90.6637 50.6881 86.4923 50.6165 82.2464L50.4971 46.2251Z" fill="white"/>
                    <path d="M39.1964 30.1318H17.0386V52.3884H39.1964V30.1318Z" fill="#29ABE2"/>
                    <path d="M84.2624 111.522C84.2624 116.265 81.8591 118.815 78.5013 118.815C75.1436 118.815 72.9448 115.785 72.9448 111.762C72.9448 107.739 75.2117 104.554 78.6888 104.554C82.1659 104.554 84.2624 107.687 84.2624 111.522ZM75.5185 111.711C75.5185 114.57 76.6605 116.675 78.6206 116.675C80.5808 116.675 81.6886 114.45 81.6886 111.539C81.6886 108.988 80.666 106.592 78.6206 106.592C76.5753 106.592 75.5185 108.903 75.5185 111.711Z" fill="white"/>
                    <path d="M88.66 104.76V118.593H86.2056V104.76H88.66Z" fill="white"/>
                    <path d="M91.3188 118.593V104.76H94.046L96.9776 110.461C97.7323 111.952 98.4038 113.483 98.9889 115.049C98.8355 113.337 98.7673 111.368 98.7673 109.177V104.76H101.017V118.593H98.4775L95.5118 112.772C94.7266 111.243 94.0267 109.671 93.4153 108.064C93.4153 109.776 93.5346 111.711 93.5346 114.09V118.576L91.3188 118.593Z" fill="white"/>
                </svg>
                <h1>Edit Contact</h1>
                <span>Tasks are better with a team!</span>
                <div class="ac-bottom-line"></div>
            </div>
            <div class="close-ac-card-mobile" onclick="closeEditContact()">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9998 8.36587L2.0998 13.2659C1.91647 13.4492 1.68314 13.5409 1.3998 13.5409C1.11647 13.5409 0.883138 13.4492 0.699805 13.2659C0.516471 13.0825 0.424805 12.8492 0.424805 12.5659C0.424805 12.2825 0.516471 12.0492 0.699805 11.8659L5.5998 6.96587L0.699805 2.06587C0.516471 1.88254 0.424805 1.6492 0.424805 1.36587C0.424805 1.08254 0.516471 0.849202 0.699805 0.665869C0.883138 0.482536 1.11647 0.390869 1.3998 0.390869C1.68314 0.390869 1.91647 0.482536 2.0998 0.665869L6.9998 5.56587L11.8998 0.665869C12.0831 0.482536 12.3165 0.390869 12.5998 0.390869C12.8831 0.390869 13.1165 0.482536 13.2998 0.665869C13.4831 0.849202 13.5748 1.08254 13.5748 1.36587C13.5748 1.6492 13.4831 1.88254 13.2998 2.06587L8.3998 6.96587L13.2998 11.8659C13.4831 12.0492 13.5748 12.2825 13.5748 12.5659C13.5748 12.8492 13.4831 13.0825 13.2998 13.2659C13.1165 13.4492 12.8831 13.5409 12.5998 13.5409C12.3165 13.5409 12.0831 13.4492 11.8998 13.2659L6.9998 8.36587Z" fill="white"/>
                </svg>
            </div>
            <div class="ac-card-circle-mobile" style="background-color: ${savedBg}; color: ${savedTextColor}">
                ${savedInitials}
            </div>
        </div>
        <div class="card-footer">
            <div class="close-ac-card-desktop"  onclick="closeEditContact()">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9998 8.36587L2.0998 13.2659C1.91647 13.4492 1.68314 13.5409 1.3998 13.5409C1.11647 13.5409 0.883138 13.4492 0.699805 13.2659C0.516471 13.0825 0.424805 12.8492 0.424805 12.5659C0.424805 12.2825 0.516471 12.0492 0.699805 11.8659L5.5998 6.96587L0.699805 2.06587C0.516471 1.88254 0.424805 1.6492 0.424805 1.36587C0.424805 1.08254 0.516471 0.849202 0.699805 0.665869C0.883138 0.482536 1.11647 0.390869 1.3998 0.390869C1.68314 0.390869 1.91647 0.482536 2.0998 0.665869L6.9998 5.56587L11.8998 0.665869C12.0831 0.482536 12.3165 0.390869 12.5998 0.390869C12.8831 0.390869 13.1165 0.482536 13.2998 0.665869C13.4831 0.849202 13.5748 1.08254 13.5748 1.36587C13.5748 1.6492 13.4831 1.88254 13.2998 2.06587L8.3998 6.96587L13.2998 11.8659C13.4831 12.0492 13.5748 12.2825 13.5748 12.5659C13.5748 12.8492 13.4831 13.0825 13.2998 13.2659C13.1165 13.4492 12.8831 13.5409 12.5998 13.5409C12.3165 13.5409 12.0831 13.4492 11.8998 13.2659L6.9998 8.36587Z" fill="white"/>
                </svg>
            </div>
            <div class="footer-grid">
                <div class="ac-card-circle-wrapper">
                    <div class="ac-card-circle-desktop" style="background-color: ${savedBg}; color: ${savedTextColor}">
                        ${savedInitials}
                    </div>
                </div>
                <div class="footer-right">
                    <div class="card-inputs">
                        <div id="ec-name-border-id" class="input_global input_ac cursor">
                            <input id="ec-name-input-id"  type="text" placeholder="Name" autocomplete="on" value="${savedName}">
                            <div class="tooltip">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="#2a3647" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                                </svg>
                                <div class="tooltiptext">Valid inputs:
                                <ul>
                                    <li>First name only</li>
                                    <li>First name last name (with space)</li>
                                    <li>Double name (e.g., Lisa-Marie)</li>
                                </ul>
                                </div>
                            </div>
                            <img src="./assets/img/person.png" alt="">
                            <span id="ec-empty-name-id" class="ac-err-msg d-none">This field is required!</span>
                            <span id="ec-invalid-name-id" class="ac-err-msg d-none">Name must be at least 2 letters.</span>
                            <span id="ec-no-special-chars-id" class="ac-err-msg d-none">No special characters are allowed.</span>
                            <span id="ec-hyphens-name-id" class="ac-err-msg d-none">Check your hyphen!</span>
                        </div> 
                        <div id="ec-mail-border-id" class="input_global input_ac cursor">
                            <input id="ec-mail-input-id"  type="text" placeholder="Email" autocomplete="on"  value="${savedEmail}">
                            <img src="./assets/img/mail.png" alt="">
                            <span id="ec-empty-email-id" class="ac-err-msg d-none">This field is required!</span>
                            <span id="ec-invalid-email-id" class="ac-err-msg d-none">Enter a valid email (e.g., user@example.com)!</span>
                            <span id="ec-existing-email-id" class="ac-err-msg d-none">This email is already in your contacts!</span>
                        </div> 
                        <div id="ec-phone-border-id" class="input_global input_ac cursor">
                            <input id="ec-phone-input-id"  type="tel" placeholder="Phone" autocomplete="on"  value="${savedPhone}">
                            <img src="./assets/img/call.png" alt="">
                            <span id="ec-empty-phone-id" class="ac-err-msg d-none">This field is required!</span>
                            <span id="ec-invalid-phone-id" class="ac-err-msg d-none">Min. 3 digits required!</span>
                        </div> 
                    </div>
                    
                    <div class="ac-btn-container">
                        <input id="ec-color-input-id"  class="color-style"  type="color" value="#43da86" />
                        <button class="ec-btn-white" onclick="deleteContact()"> 
                            <span>Delete</span>
                        </button> 
                        <button class="ec-btn-fill" onclick="saveEditContact()"> 
                            <span>Save</span>
                            <img src="./assets/img/check.png" alt="">
                        </button> 
                    </div>
                </div>
            </div>
      </div>
  `;
}

function templateShowContact(name, email, phone, index, bgColor, txtColor, initials) {
  savedName = name;
  savedEmail = email;
  savedPhone = phone;
  savedBg = bgColor;
  savedTextColor = txtColor;
  savedInitials = initials;
  savedIndex = index;
  return /*html*/ `
    <div class="open-contacts-header">
        <div class="open-contacts-arrow" onclick="closeContact()">
          <svg width="25" height="24" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00972 9.88554H23.1871C24.0362 9.88554 24.7246 10.5739 24.7246 11.4231C24.7246 12.2722 24.0362 12.9606 23.1871 12.9606H6.00972L13.17 20.1209C13.7704 20.7213 13.7704 21.6946 13.17 22.295C12.5697 22.8954 11.5963 22.8954 10.996 22.295L1.53824 12.8373C0.757188 12.0562 0.757188 10.7899 1.53824 10.0089L10.996 0.55115C11.5963 -0.0492049 12.5697 -0.0492048 13.17 0.55115C13.7704 1.1515 13.7704 2.12487 13.17 2.72523L6.00972 9.88554Z" fill="#29ABE2"/>
          </svg>
        </div>
          
        <h1>Contacts</h1>
        <span>Better with a team</span>
        <div class="horizontal-bar"></div>
      </div>
      <div class="open-contacts-name">
        <div class="open-contacts-circle" style="background-color: ${bgColor}; color: ${txtColor};">
          ${initials}
        </div>
        <div class="contact-name">
            <span>${name}</span>
            <div class="desktop-menu-container">
                <div class="desktop-menu" onclick="editContact()">
                     <svg width="24" height="24" viewBox="0 0 19 19" fill="none"  xmlns="http://www.w3.org/2000/svg" >
                        <path d="M2.00098 17H3.40098L12.026 8.375L10.626 6.975L2.00098 15.6V17ZM16.301 6.925L12.051 2.725L13.451 1.325C13.8343 0.941667 14.3051 0.75 14.8635 0.75C15.4218 0.75 15.8926 0.941667 16.276 1.325L17.676 2.725C18.0593 3.10833 18.2593 3.57083 18.276 4.1125C18.2926 4.65417 18.1093 5.11667 17.726 5.5L16.301 6.925ZM14.851 8.4L4.25098 19H0.000976562V14.75L10.601 4.15L14.851 8.4Z"  fill="#2A3647"/>
                    </svg>
                    <span class="desktop-edit-span-small">Edit</span>
                </div>
                <div  class="desktop-menu" onclick="deleteContact()">
                    <svg width="24" height="24" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.00098 18C2.45098 18 1.98014 17.8042 1.58848 17.4125C1.19681 17.0208 1.00098 16.55 1.00098 16V3C0.717643 3 0.480143 2.90417 0.288477 2.7125C0.0968099 2.52083 0.000976562 2.28333 0.000976562 2C0.000976562 1.71667 0.0968099 1.47917 0.288477 1.2875C0.480143 1.09583 0.717643 1 1.00098 1H5.00098C5.00098 0.716667 5.09681 0.479167 5.28848 0.2875C5.48014 0.0958333 5.71764 0 6.00098 0H10.001C10.2843 0 10.5218 0.0958333 10.7135 0.2875C10.9051 0.479167 11.001 0.716667 11.001 1H15.001C15.2843 1 15.5218 1.09583 15.7135 1.2875C15.9051 1.47917 16.001 1.71667 16.001 2C16.001 2.28333 15.9051 2.52083 15.7135 2.7125C15.5218 2.90417 15.2843 3 15.001 3V16C15.001 16.55 14.8051 17.0208 14.4135 17.4125C14.0218 17.8042 13.551 18 13.001 18H3.00098ZM3.00098 3V16H13.001V3H3.00098ZM5.00098 13C5.00098 13.2833 5.09681 13.5208 5.28848 13.7125C5.48014 13.9042 5.71764 14 6.00098 14C6.28431 14 6.52181 13.9042 6.71348 13.7125C6.90514 13.5208 7.00098 13.2833 7.00098 13V6C7.00098 5.71667 6.90514 5.47917 6.71348 5.2875C6.52181 5.09583 6.28431 5 6.00098 5C5.71764 5 5.48014 5.09583 5.28848 5.2875C5.09681 5.47917 5.00098 5.71667 5.00098 6V13ZM9.00098 13C9.00098 13.2833 9.09681 13.5208 9.28848 13.7125C9.48014 13.9042 9.71764 14 10.001 14C10.2843 14 10.5218 13.9042 10.7135 13.7125C10.9051 13.5208 11.001 13.2833 11.001 13V6C11.001 5.71667 10.9051 5.47917 10.7135 5.2875C10.5218 5.09583 10.2843 5 10.001 5C9.71764 5 9.48014 5.09583 9.28848 5.2875C9.09681 5.47917 9.00098 5.71667 9.00098 6V13Z" fill="#2A3647"/>
                    </svg>
                    <span class="desktop-edit-span-large">Delete</span>
                </div>
            </div>
        </div>
      </div>
      <div class="contact-info">
        <h2>Contact Information</h2>
        <div class="contact-method">
            <span>Email</span>
            <a href="mailto:${email}">${email}</a>
        </div>
        <div class="contact-method">
            <span>Phone</span>
            <span>${phone}</span>
        </div>
      </div>
    `;
}

function templateEditContactMenu() {
  return /*html*/ `
        <div class="ec-menu-content">
          <div class="ec-menu"  onclick=editContact()>
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00098 17H3.40098L12.026 8.375L10.626 6.975L2.00098 15.6V17ZM16.301 6.925L12.051 2.725L13.451 1.325C13.8343 0.941667 14.3051 0.75 14.8635 0.75C15.4218 0.75 15.8926 0.941667 16.276 1.325L17.676 2.725C18.0593 3.10833 18.2593 3.57083 18.276 4.1125C18.2926 4.65417 18.1093 5.11667 17.726 5.5L16.301 6.925ZM14.851 8.4L4.25098 19H0.000976562V14.75L10.601 4.15L14.851 8.4Z"
                fill="#2A3647"
              />
            </svg>
            <span>Edit</span>
          </div>
          <div class="ec-menu" onclick="deleteContact()">
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.00098 18C2.45098 18 1.98014 17.8042 1.58848 17.4125C1.19681 17.0208 1.00098 16.55 1.00098 16V3C0.717643 3 0.480143 2.90417 0.288477 2.7125C0.0968099 2.52083 0.000976562 2.28333 0.000976562 2C0.000976562 1.71667 0.0968099 1.47917 0.288477 1.2875C0.480143 1.09583 0.717643 1 1.00098 1H5.00098C5.00098 0.716667 5.09681 0.479167 5.28848 0.2875C5.48014 0.0958333 5.71764 0 6.00098 0H10.001C10.2843 0 10.5218 0.0958333 10.7135 0.2875C10.9051 0.479167 11.001 0.716667 11.001 1H15.001C15.2843 1 15.5218 1.09583 15.7135 1.2875C15.9051 1.47917 16.001 1.71667 16.001 2C16.001 2.28333 15.9051 2.52083 15.7135 2.7125C15.5218 2.90417 15.2843 3 15.001 3V16C15.001 16.55 14.8051 17.0208 14.4135 17.4125C14.0218 17.8042 13.551 18 13.001 18H3.00098ZM3.00098 3V16H13.001V3H3.00098ZM5.00098 13C5.00098 13.2833 5.09681 13.5208 5.28848 13.7125C5.48014 13.9042 5.71764 14 6.00098 14C6.28431 14 6.52181 13.9042 6.71348 13.7125C6.90514 13.5208 7.00098 13.2833 7.00098 13V6C7.00098 5.71667 6.90514 5.47917 6.71348 5.2875C6.52181 5.09583 6.28431 5 6.00098 5C5.71764 5 5.48014 5.09583 5.28848 5.2875C5.09681 5.47917 5.00098 5.71667 5.00098 6V13ZM9.00098 13C9.00098 13.2833 9.09681 13.5208 9.28848 13.7125C9.48014 13.9042 9.71764 14 10.001 14C10.2843 14 10.5218 13.9042 10.7135 13.7125C10.9051 13.5208 11.001 13.2833 11.001 13V6C11.001 5.71667 10.9051 5.47917 10.7135 5.2875C10.5218 5.09583 10.2843 5 10.001 5C9.71764 5 9.48014 5.09583 9.28848 5.2875C9.09681 5.47917 9.00098 5.71667 9.00098 6V13Z"
                fill="#2A3647"
              />
            </svg>
            <span>Delete</span>
          </div>
    `;
}
