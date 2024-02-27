function templateSignUpPopup() {
    return /*html*/`
      <div class="form-header"> 
        <img class="back-arrow" src="./assets/img/back_arrow.png" alt="backwards button" onclick="closeSignUp()">
        <h1>Sign up</h1>
        <div  class="line"></div>
        </div>
      <div class="login-fields-container">
        <div class="login-fields-gap">
        <div id="add-name-border-id" class="login-input">
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
          <div id="add-email-border-id" class="login-input">
            <input type="email" name="loginUserEMail" id="add-email-id" placeholder="Email" autocomplete="on">
            <img class="login-email" src="./assets/img/mail.png" alt="">
            <span id="empty-add-email-id" class="err-msg d-none">This field is required!</span>
            <span id="invalid-add-email-id" class="err-msg d-none">Enter a valid email (e.g., user@example.com)!</span>
            <span id="existing-add-email-id" class="err-msg d-none">This email address is already registered!</span>
          </div>
          <div id="add-pw-border-id" class="login-input">
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
          <div id="add-confirm-pw-border-id" class="login-input">
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
      <form id="add-contact-form-mobile-id" onsubmit="createContactMobile(); return false;">
        <div class="addContactContainerFooterMobile">
          <input class="addContactInputNameMobile" name="addContactInputNameMobile" id="add-contact-input-name-mobile-id" type="text" placeholder="Name">
          <input class="addContactInputMailAddresssMobile" name="addContactInputMailAddresssMobile" id="add-contact-input-mail-addresss-mobile-id" type="text" placeholder="E Mail">
          <input class="addContactInputPhoneMobile" name="addContactInputPhoneMobile" id="add-contact-input-phone-mobile-id" type="text" placeholder="Phone">          
          <img class="createContactButtonImg" src="../assets/img/contacts/createContactButton.svg" alt="createContactButton" onclick="createContactMobile()">         
        </div>
      </form>
    `;
}