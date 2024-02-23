function templateSignUpPopup() {
    return /*html*/`
      <div class="form-header"> 
        <img class="back-arrow" src="./assets/img/back_arrow.png" alt="backwards button" onclick="closeSignUp()">
        <h1>Sign up</h1>
        <div  class="line"></div>
        </div>
      <div class="login-fields-container">
        <div class="login-fields-gap">
        <div id="login-user-name-border-id" class="login-input">
            <input type="name" name="name" id="add-user-name-id" placeholder="Name" required autocomplete="off">
            <img class="login-name" src="./assets/img/person.png" alt="login image">
          </div>
          <div id="login-user-e-mail-border-id" class="login-input">
            <input type="email" name="loginUserEMail" id="add-user-e-mail-id" placeholder="Email" required autocomplete="on">
            <img class="login-email" src="./assets/img/mail.png" alt="">
          </div>
          <div id="login-user-password-border-id" class="login-input">
            <input type="password" name="loginUserPassword" id="add-user-password-id" placeholder="Password" required minlength="2" autocomplete="new-password">
            <img class="login-lock" src="./assets/img/lock.png" alt="">
          </div>
          <div id="login-user-password-confirm-border-id" class="login-input">
            <input type="password" name="confirmPassword" id="add-user-confirm-password-id" placeholder="Confirm Password" required minlength="2" autocomplete="new-password">
            <img class="login-lock" src="./assets/img/lock.png" alt="">
          </div>
        </div>
        <div class="signin-flex-container">
          <div class="pp-checkbox-container">
            <img id="privacy-checkbox-id" src="./assets/img/checkbox.svg" alt="privacy checkbox" onclick="toggleRememberMeCheckbox(event)">
            <p>I accept the <a href="#">Privacy Policy</a></p>
          </div>
          <button class="filled-btn width-small" onclick="addUser()">Sign in</button>
        </div>
      </div>
    `;
}

/** <div class="login-container">
        <div class="form-header"> 
          <h1>Sign up</h1>
          <div  class="line"></div>
         </div>
        <div class="login-fields-container">
          <div class="login-fields-gap">
          <div id="login-user-name-border-id" class="login-input">
              <input type="name" name="name" id="login-user-name-id" placeholder="Name" required autocomplete="off">
              <img class="login-email" src="./assets/img/person.png" alt="">
            </div>
            <div id="login-user-e-mail-border-id" class="login-input">
              <input type="email" name="loginUserEMail" id="login-user-e-mail-id" placeholder="Email" required autocomplete="on">
              <img class="login-email" src="./assets/img/mail.png" alt="">
            </div>
            <div id="login-user-password-border-id" class="login-input">
              <input type="password" name="loginUserPassword" id="login-user-password-id" placeholder="Password" required minlength="2" autocomplete="new-password">
              <img class="login-lock" src="./assets/img/lock.png" alt="">
            </div>
            <div id="login-user-password-confirm-border-id" class="password-confirm-input">
              <input type="password" name="confirmPassword" id="login-user-confirm-password-id" placeholder="Confirm  Password" required minlength="2" autocomplete="new-password">
              <img class="login-lock" src="./assets/img/lock.png" alt="">
            </div>
          </div>
          <div class="remember-me-checkbox-container">
            <img id="privacy-checkbox-id" src="./assets/img/checkbox.png" alt="privacy checkbox" onclick="toggleRememberMeCheckbox()">
            <p>I accept the <span> Privacy Policy <span/></p>
          </div>
        </div>
        <div class="login-btns-container">
          <button class="filled-btn">Sign in</button>
        </div>
      </div>
*/


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
          <input class="addContactInputNameMobile" name="addContactInputNameMobile" id="addContactInputNameMobileID" type="text" required placeholder="Name">
          <input class="addContactInputMailAddresssMobile" name="addContactInputMailAddresssMobile" id="addContactInputMailAddresssMobileID" type="text" required placeholder="E Mail">
          <input class="addContactInputPhoneMobile" name="addContactInputPhoneMobile" id="addContactInputPhoneMobileID" type="text" required placeholder="Phone">          
          <img class="createContactButtonImg" src="../assets/img/contacts/createContactButton.svg" alt="createContactButton" onclick="createContactMobile()">         
        </div>
      </form>
    `;
}