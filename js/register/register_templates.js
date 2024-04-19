/**
 * Generates the HTML for a sign-up popup.
 * @returns {string} The generated HTML for the sign-up popup.
 */
function templateSignUpPopup() {
  return /*html*/ `
    <div class="low-height-class">
      <svg
        width="61"
        height="82"
        viewBox="0 0 101 122"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path class="change-color" d="M71.6725 0H49.5146V25.4923H71.6725V0Z" fill="white"/>
        <path
          class="change-color"
          d="M49.5142 46.2251H71.6721V82.1779C71.7733 90.8292 69.3112 99.3153 64.5986 106.557C59.9455 113.594 50.963 121.966 34.3446 121.966C16.2434 121.966 5.69286 113.406 0 108.715L13.9765 91.4743C19.533 96.0112 24.885 99.7435 34.4299 99.7435C41.6567 99.7435 44.5372 96.7988 46.2247 94.2307C48.5186 90.6637 49.7052 86.4923 49.6335 82.2464L49.5142 46.2251Z"
          fill="white"/>
        <path d="M38.2135 30.1318H16.0557V52.3884H38.2135V30.1318Z" fill="#29ABE2"/>
        <path
          class="change-color"
          d="M83.2795 111.522C83.2795 116.265 80.8762 118.815 77.5184 118.815C74.1607 118.815 71.9619 115.785 71.9619 111.762C71.9619 107.739 74.2288 104.554 77.7059 104.554C81.183 104.554 83.2795 107.687 83.2795 111.522ZM74.5356 111.711C74.5356 114.57 75.6776 116.675 77.6377 116.675C79.5978 116.675 80.7057 114.45 80.7057 111.539C80.7057 108.988 79.6831 106.592 77.6377 106.592C75.5924 106.592 74.5356 108.903 74.5356 111.711Z"
          fill="white"/>
        <path
          class="change-color"
          d="M87.6771 104.76V118.593H85.2227V104.76H87.6771Z"
          fill="white"/>
        <path
          class="change-color"
          d="M90.3359 118.593V104.76H93.0631L95.9947 110.461C96.7494 111.952 97.4209 113.483 98.006 115.049C97.8526 113.337 97.7844 111.368 97.7844 109.177V104.76H100.034V118.593H97.4946L94.5289 112.772C93.7437 111.243 93.0438 109.671 92.4324 108.064C92.4324 109.776 92.5517 111.711 92.5517 114.09V118.576L90.3359 118.593Z"
          fill="white"/>
      </svg>
    </div>
    <div class="form-header"> 
      <div class="back-arrow-container" onclick="closeSignUp()">
        <svg width="25" height="24" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.00972 9.88554H23.1871C24.0362 9.88554 24.7246 10.5739 24.7246 11.4231C24.7246 12.2722 24.0362 12.9606 23.1871 12.9606H6.00972L13.17 20.1209C13.7704 20.7213 13.7704 21.6946 13.17 22.295C12.5697 22.8954 11.5963 22.8954 10.996 22.295L1.53824 12.8373C0.757188 12.0562 0.757188 10.7899 1.53824 10.0089L10.996 0.55115C11.5963 -0.0492049 12.5697 -0.0492048 13.17 0.55115C13.7704 1.1515 13.7704 2.12487 13.17 2.72523L6.00972 9.88554Z" fill="#29ABE2"/>
        </svg>
      </div>
      <h1>Sign up</h1>
      <div class="line"></div>
    </div>
    <div class="login-fields-container">
      <div class="login-fields-gap">
        <div id="add-name-border-id" class="input_global">
          <input type="name" name="name" id="add-name-id" placeholder="Name" autocomplete="off" maxlength="40">
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
          <img class="login-name" src="./assets/img/person.png" alt="login image">
          <span id="empty-add-name-id" class="err-msg d-none">This field is required!</span>
          <span id="invalid-add-name-id" class="err-msg d-none">Each name part needs 2 letters minimum.</span>
          <span id="no-special-chars-id" class="err-msg d-none">No special characters are allowed.</span>
          <span id="hyphens-add-name-id" class="err-msg d-none">Check your hyphen!</span>
          <span id="spaces-add-name-id" class="err-msg d-none">Check your spaces!</span>
        </div>
        <div id="add-email-border-id" class="input_global">
          <input type="email" name="loginUserEMail" id="add-email-id" placeholder="Email" autocomplete="on" maxlength="50">
          <img class="login-email" src="./assets/img/mail.png" alt="">
          <span id="empty-add-email-id" class="err-msg d-none">This field is required!</span>
          <span id="invalid-add-email-id" class="err-msg d-none">Enter a valid email (e.g., user@example.com)!</span>
          <span id="existing-add-email-id" class="err-msg d-none">This email address is already registered!</span>
        </div>
        <div id="add-pw-border-id" class="input_global">
          <input type="password" name="loginUserPassword" id="add-pw-id" placeholder="Password" autocomplete="new-password" maxlength="50">
          <div class="tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="#2a3647" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
            </svg>
            <div class="tooltiptext">Valid inputs:
              <ul>
                <li>At least one number</li>
                <li>At least one letter</li>
                <li>At least one special character</li>
                <li>6 or more characters</li>
              </ul>
            </div>
          </div>
          <img id="register-lock-id" class="login-lock" src="./assets/img/lock.png" alt=""> 
          <img id="register-pw-visibility-id" class="visibility-img d-none" src="./assets/img/visibility.png" alt=""  onclick="togglePasswordVisibility(event, 'register-pw-visibility-off-id', 'registerPw', -1)">
          <img id="register-pw-visibility-off-id" class="visibility-off-img d-none" src="./assets/img/visibility_off.png" alt="" onclick="togglePasswordVisibility(event, 'register-pw-visibility-id', 'registerPw', 1)">
          <span id="empty-add-pw-id" class="err-msg d-none">This field is required!</span>
          <span id="invalid-add-pw-id" class="register-pw-visbility-id err-msg d-none">6+ chars, 1 uppercase, 1 special char, 1 digit required.</span>
        </div>
        <div id="add-confirm-pw-border-id" class="input_global">
          <input type="password" name="confirmPassword" id="add-confirm-pw-id" placeholder="Confirm Password" autocomplete="new-password" maxlength="50"> 
          <img id="register-confirm-lock-id" class="login-lock" src="./assets/img/lock.png" alt="">
          <img id="register-confirm-pw-visibility-id" class="visibility-img d-none" src="./assets/img/visibility.png" alt="" onclick="togglePasswordVisibility(event, 'register-confirm-pw-visibility-off-id', 'confirmPw', -1)">
          <img id="register-confirm-pw-visibility-off-id" class="visibility-off-img d-none" src="./assets/img/visibility_off.png" alt="" onclick="togglePasswordVisibility(event, 'register-confirm-pw-visibility-id', 'confirmPw', 1)">
          <span id="empty-confirm-pw-id" class="err-msg d-none">This field is required!</span>
          <span id="invalid-confirm-pw-id" class="err-msg d-none">Ups! Your password don't match.</span>
        </div>
      </div>
      <div class="signin-flex-container">
        <div class="pp-checkbox-container cursor">
          <img id="privacy-checkbox-id" src="./assets/img/checkbox.svg" alt="privacy checkbox" onclick="toggleCheckbox(event)">
          <p id="pp-id">I accept the <a onclick="showLegals('policy')">Privacy Policy</a></p>
        </div>
        <button class="filled-btn width-small" onclick="register()">Sign in</button>
      </div>
    </div>
  `;
}
