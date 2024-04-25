/**
 * Performs a guest login by pre-filling the login form with guest credentials and logging in automatically.
 */
function guestLogin() {
  const guestEmail = "guest@login.de";
  const guestPassword = "Guest!login1";
  document.getElementById("login-user-e-mail-id").value = guestEmail.toLowerCase();
  document.getElementById("login-user-password-id").value = guestPassword;
  login();
}

/**
 * Validates login credentials and handles related error messages.
 * @returns {boolean} - Indicates whether the login input fields are valid or not.
 */
function loginValidationCheck() {
  const loginUserEmail = document.getElementById("login-user-e-mail-id").value;
  const lowerCaseEmail = loginUserEmail.toLowerCase();
  const loginUserPassword = document.getElementById("login-user-password-id").value;
  const boolArr = [false, false, false, false, false, false, false];
  if (lowerCaseEmail === "" && loginUserPassword === "")
    boolArr[0] = boolArr[4] = boolArr[5] = boolArr[6] = true;
  else if (lowerCaseEmail === "" && loginUserPassword !== "") boolArr[0] = boolArr[5] = true;
  else if (lowerCaseEmail !== "" && loginUserPassword === "")
    if (!validateLoginEmail(lowerCaseEmail))
      boolArr[1] = boolArr[4] = boolArr[5] = boolArr[6] = true;
    else boolArr[4] = boolArr[6] = true;
  else if (lowerCaseEmail !== "" && loginUserPassword !== "")
    if (!validateLoginEmail(lowerCaseEmail)) boolArr[1] = boolArr[5] = true;
    else if (validateLoginEmail(lowerCaseEmail) && !(lowerCaseEmail in users))
      boolArr[2] = boolArr[5] = true;
    else if (users[lowerCaseEmail].userPassword !== loginUserPassword)
      boolArr[3] = boolArr[6] = true;
  handlerFieldValidationLogin(boolArr);
  return !boolArr.some(Boolean);
}

/**
 * Attempts to log in the user after validating the login credentials.
 * If successful, sets the current user in localStorage and redirects to the summary page.
 */
async function login() {
  if (loginValidationCheck()) {
    const loggedInUser = loadCurrentUser();
    saveLoginData(loggedInUser);
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    window.location.assign(`./summary.html`);
  }
}

/**
 * Saves the login data of the logged-in user in the local storage.
 * @param {object} loggedInUser - The logged-in user object containing user email.
 */
function saveLoginData(loggedInUser) {
  if (rmCheckboxConfirmed && loggedInUser.userEMail !== "guest@login.de") {
    const userEmail = {email: loggedInUser.userEMail};
    localStorage.setItem("userEmail", JSON.stringify(userEmail));
  } else localStorage.removeItem("userEmail");
}

/**
 * Resets the input fields in the login form and clears validation states.
 */
function resetLoginInputs() {
  const boolArr = Array(7).fill(false);
  handlerFieldValidationLogin(boolArr);
  document.getElementById("login-user-e-mail-id").value = "";
  document.getElementById("login-user-password-id").value = "";
  const pwInput = document.getElementById("lock-id");
  pwInput.src = "./assets/img/lock.png";
}

/**
 * Checks if the "Remember Me" option is enabled and fills the login form with stored user email and password.
 * If the "Remember Me" option is enabled, this function retrieves the user's email from local storage,
 * fills the login form with the stored email and password, and updates the visibility of the password visibility icon.
 * If the "Remember Me" option is not enabled, this function does nothing.
 */
function rememberMeCheck() {
  const userEmailString = localStorage.getItem("userEmail");
  if (userEmailString) {
    const userEmailObject = JSON.parse(userEmailString);
    userMail = userEmailObject.email;
    document.getElementById("login-user-e-mail-id").value = users[userMail].userEMail;
    document.getElementById("login-user-password-id").value = users[userMail].userPassword;
    toggleVisibility("login-pw-visibility-off-id", true);
    toggleVisibility("lock-id", false);
    rmCheckboxConfirmed = true;
    document.getElementById("uncheckbox-id").src = "./assets/svg/checkbox_confirmed.svg";
  }
}
