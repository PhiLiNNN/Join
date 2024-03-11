function templateSignUpPopup() {
  return /*html*/`
    <div class="form-header"> 
      <img class="back-arrow" src="./assets/img/back_arrow.png" alt="backwards button" onclick="closeSignUp()">
      <h1>Sign up</h1>
      <div  class="line"></div>
      </div>
    <div class="login-fields-container">
      <div class="login-fields-gap">
      <div id="add-name-border-id" class="input_global">
          <input type="name" name="name" id="add-name-id" placeholder="Name" autocomplete="off">
          <span class="tooltip">i
            <div class="tooltiptext">Valid inputs:
              <ul>
                <li>First name only</li>
                <li>First name Last name (with space)</li>
                <li>Double name (e.g., Lisa-Marie)</li>
              </ul>
            </div>
          </span>
          <img class="login-name" src="./assets/img/person.png" alt="login image">
          <span id="empty-add-name-id" class="err-msg d-none">This field is required!</span>
          <span id="invalid-add-name-id" class="err-msg d-none">Name must be at least 2 letters.</span>
          <span id="no-special-chars-id" class="err-msg d-none">No special characters are allowed.</span>
        </div>
        <div id="add-email-border-id" class="input_global">
          <input type="email" name="loginUserEMail" id="add-email-id" placeholder="Email" autocomplete="on">
          <img class="login-email" src="./assets/img/mail.png" alt="">
          <span id="empty-add-email-id" class="err-msg d-none">This field is required!</span>
          <span id="invalid-add-email-id" class="err-msg d-none">Enter a valid email (e.g., user@example.com)!</span>
          <span id="existing-add-email-id" class="err-msg d-none">This email address is already registered!</span>
        </div>
        <div id="add-pw-border-id" class="input_global">
          <input type="password" name="loginUserPassword" id="add-pw-id" placeholder="Password" autocomplete="new-password">
          <span class="tooltip">i
            <div class="tooltiptext">Valid inputs:
              <ul>
                <li>At least one number</li>
                <li>At least one letter</li>
                <li>At least one special character</li>
                <li>6 or more characters</li>
              </ul>
            </div> 
          </span>
          <img id="register-lock-id" class="login-lock" src="./assets/img/lock.png" alt=""> 
          <img id="register-pw-visibility-id" class="visibility-img d-none" src="./assets/img/visibility.png" alt=""  onclick="togglePasswordVisibility(event, 'register-pw-visibility-off-id', 'registerPw', -1)">
          <img id="register-pw-visibility-off-id" class="visibility-off-img d-none" src="./assets/img/visibility_off.png" alt="" onclick="togglePasswordVisibility(event, 'register-pw-visibility-id', 'registerPw', 1)">
          <span id="empty-add-pw-id" class="err-msg d-none">This field is required!</span>
          <span id="invalid-add-pw-id" class="register-pw-visbility-id err-msg d-none">6+ chars, 1 uppercase, 1 special char, 1 digit required.</span>
        </div>
        <div id="add-confirm-pw-border-id" class="input_global">
          <input type="password" name="confirmPassword" id="add-confirm-pw-id" placeholder="Confirm Password" autocomplete="new-password"> 
          <img id="register-confirm-lock-id" class="login-lock" src="./assets/img/lock.png" alt="">
          <img id="register-confirm-pw-visibility-id" class="visibility-img d-none" src="./assets/img/visibility.png" alt=""  onclick="togglePasswordVisibility(event, 'register-confirm-pw-visibility-off-id', 'confirmPw', -1)">
          <img id="register-confirm-pw-visibility-off-id" class="visibility-off-img d-none" src="./assets/img/visibility_off.png" alt=""  onclick="togglePasswordVisibility(event, 'register-confirm-pw-visibility-id', 'confirmPw', 1)">
          <span id="empty-confirm-pw-id" class="err-msg d-none">This field is required!</span>
          <span id="invalid-confirm-pw-id" class="err-msg d-none">Ups! Your password don't match.</span>
        </div>
      </div>
      <div class="signin-flex-container">
        <div class="pp-checkbox-container">
          <img id="privacy-checkbox-id" src="./assets/img/checkbox.svg" alt="privacy checkbox" onclick="toggleCheckbox(event)">
          <p id="pp-id">I accept the <a href="#">Privacy Policy</a></p>
        </div>
        <button class="filled-btn width-small" onclick="register()">Sign in</button>
      </div>
    </div>
  `;
}


function templateAssignedToContainerHTML(contact, index, iconColor, initials, textColor, isSelected) {
  const setSelectedContact = isSelected ? 'selected-contact' : '';
  return /*html*/ `
    <div id="assigned-to-box-${index}" class="assigned-to-box ${setSelectedContact}"  onclick="selectedAssignedToUser(event, ${index})">
      <div class="assigned-to-user">
        <div class="circle-style" style="background-color: ${iconColor}; color: ${textColor};">
          <span>
            ${initials}
          </span>
        </div>
        <span id="contact-id${index}" >${contact}</span>
      </div>
      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
      </svg>
    </div>
  `;
}

function templateSvgCheckboxConfirmedHTML() {
  return /*html*/ `
      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
        <path d="M5 9.96582L9 13.9658L17 2.46582" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  `;
}

function templateSvgDefaultCheckboxHTML() {
  return /*html*/ `
      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
      </svg>
  `;
}

function templateaddedContactsHTML(index, iconColor,  initials, textColor) {
  if (index === 4 ){
    iconColor = '#2a3647'
    initials = `+${assignedTo.colorCodes.length - 4}`
    textColor = 'rgb(255, 255, 255)';
  }
  return /*html*/ `
  <div class="circle-style left-indent" style="background-color: ${iconColor}; color: ${textColor};">
    <span>
        ${initials}
    </span>
  </div>
`;
}

function templateSubtaskHTML(index, subtask) {
  return /*html*/ `
    <li id="substask-content-id${index}">
      <span id="editable-span-id${index}"  class="editable-span" contenteditable="false">
        ${subtask}
      </span>
      <div id="subtask-default-container-id${index}" class="subtask-svg ">
        <div class="hidden-Edit_menu">
          <svg onclick="editSubtask(${index})"  width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.00098 17H3.40098L12.026 8.375L10.626 6.975L2.00098 15.6V17ZM16.301 6.925L12.051 2.725L13.451 1.325C13.8343 0.941667 14.3051 0.75 14.8635 0.75C15.4218 0.75 15.8926 0.941667 16.276 1.325L17.676 2.725C18.0593 3.10833 18.2593 3.57083 18.276 4.1125C18.2926 4.65417 18.1093 5.11667 17.726 5.5L16.301 6.925ZM14.851 8.4L4.25098 19H0.000976562V14.75L10.601 4.15L14.851 8.4Z" fill="#2A3647"/>
          </svg>
          <div  class="vertical-line"></div>
          <svg onclick="deleteSubtask(${index})" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.00098 18C2.45098 18 1.98014 17.8042 1.58848 17.4125C1.19681 17.0208 1.00098 16.55 1.00098 16V3C0.717643 3 0.480143 2.90417 0.288477 2.7125C0.0968099 2.52083 0.000976562 2.28333 0.000976562 2C0.000976562 1.71667 0.0968099 1.47917 0.288477 1.2875C0.480143 1.09583 0.717643 1 1.00098 1H5.00098C5.00098 0.716667 5.09681 0.479167 5.28848 0.2875C5.48014 0.0958333 5.71764 0 6.00098 0H10.001C10.2843 0 10.5218 0.0958333 10.7135 0.2875C10.9051 0.479167 11.001 0.716667 11.001 1H15.001C15.2843 1 15.5218 1.09583 15.7135 1.2875C15.9051 1.47917 16.001 1.71667 16.001 2C16.001 2.28333 15.9051 2.52083 15.7135 2.7125C15.5218 2.90417 15.2843 3 15.001 3V16C15.001 16.55 14.8051 17.0208 14.4135 17.4125C14.0218 17.8042 13.551 18 13.001 18H3.00098ZM3.00098 3V16H13.001V3H3.00098ZM5.00098 13C5.00098 13.2833 5.09681 13.5208 5.28848 13.7125C5.48014 13.9042 5.71764 14 6.00098 14C6.28431 14 6.52181 13.9042 6.71348 13.7125C6.90514 13.5208 7.00098 13.2833 7.00098 13V6C7.00098 5.71667 6.90514 5.47917 6.71348 5.2875C6.52181 5.09583 6.28431 5 6.00098 5C5.71764 5 5.48014 5.09583 5.28848 5.2875C5.09681 5.47917 5.00098 5.71667 5.00098 6V13ZM9.00098 13C9.00098 13.2833 9.09681 13.5208 9.28848 13.7125C9.48014 13.9042 9.71764 14 10.001 14C10.2843 14 10.5218 13.9042 10.7135 13.7125C10.9051 13.5208 11.001 13.2833 11.001 13V6C11.001 5.71667 10.9051 5.47917 10.7135 5.2875C10.5218 5.09583 10.2843 5 10.001 5C9.71764 5 9.48014 5.09583 9.28848 5.2875C9.09681 5.47917 9.00098 5.71667 9.00098 6V13Z" fill="#2A3647"/>
          </svg>      
        </div>
      </div>
      <div id="subtask-edited-container-id${index}" class="subtask-svg d-none">
        <svg onclick="deleteSubtask(${index})" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.00098 18C2.45098 18 1.98014 17.8042 1.58848 17.4125C1.19681 17.0208 1.00098 16.55 1.00098 16V3C0.717643 3 0.480143 2.90417 0.288477 2.7125C0.0968099 2.52083 0.000976562 2.28333 0.000976562 2C0.000976562 1.71667 0.0968099 1.47917 0.288477 1.2875C0.480143 1.09583 0.717643 1 1.00098 1H5.00098C5.00098 0.716667 5.09681 0.479167 5.28848 0.2875C5.48014 0.0958333 5.71764 0 6.00098 0H10.001C10.2843 0 10.5218 0.0958333 10.7135 0.2875C10.9051 0.479167 11.001 0.716667 11.001 1H15.001C15.2843 1 15.5218 1.09583 15.7135 1.2875C15.9051 1.47917 16.001 1.71667 16.001 2C16.001 2.28333 15.9051 2.52083 15.7135 2.7125C15.5218 2.90417 15.2843 3 15.001 3V16C15.001 16.55 14.8051 17.0208 14.4135 17.4125C14.0218 17.8042 13.551 18 13.001 18H3.00098ZM3.00098 3V16H13.001V3H3.00098ZM5.00098 13C5.00098 13.2833 5.09681 13.5208 5.28848 13.7125C5.48014 13.9042 5.71764 14 6.00098 14C6.28431 14 6.52181 13.9042 6.71348 13.7125C6.90514 13.5208 7.00098 13.2833 7.00098 13V6C7.00098 5.71667 6.90514 5.47917 6.71348 5.2875C6.52181 5.09583 6.28431 5 6.00098 5C5.71764 5 5.48014 5.09583 5.28848 5.2875C5.09681 5.47917 5.00098 5.71667 5.00098 6V13ZM9.00098 13C9.00098 13.2833 9.09681 13.5208 9.28848 13.7125C9.48014 13.9042 9.71764 14 10.001 14C10.2843 14 10.5218 13.9042 10.7135 13.7125C10.9051 13.5208 11.001 13.2833 11.001 13V6C11.001 5.71667 10.9051 5.47917 10.7135 5.2875C10.5218 5.09583 10.2843 5 10.001 5C9.71764 5 9.48014 5.09583 9.28848 5.2875C9.09681 5.47917 9.00098 5.71667 9.00098 6V13Z" fill="#2A3647"/>
        </svg> 
        <div class="vertical-line"></div>
          <svg onclick="saveEditSubtask(${index})" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_75880_8801" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.000976562" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_75880_8801)">
              <path d="M9.55118 15.15L18.0262 6.675C18.2262 6.475 18.4637 6.375 18.7387 6.375C19.0137 6.375 19.2512 6.475 19.4512 6.675C19.6512 6.875 19.7512 7.1125 19.7512 7.3875C19.7512 7.6625 19.6512 7.9 19.4512 8.1L10.2512 17.3C10.0512 17.5 9.81785 17.6 9.55118 17.6C9.28452 17.6 9.05118 17.5 8.85118 17.3L4.55118 13C4.35118 12.8 4.25535 12.5625 4.26368 12.2875C4.27202 12.0125 4.37618 11.775 4.57618 11.575C4.77618 11.375 5.01368 11.275 5.28868 11.275C5.56368 11.275 5.80118 11.375 6.00118 11.575L9.55118 15.15Z" fill="#2A3647"/>
            </g>
          </svg>    
      </div>
    </li>
  `;
}