let rmCheckboxConfirmed = false;
let ppCheckboxConfirmed = false;
let users = {};
let newUserArray = [];
let emptyInput = true;
let visibilityOn, visibilityOnConfirm;
let inputType = "password";
let inputTypeConfirm = "password";
let password,
  confirmPassword = false;

/**
 * Initializes the application by setting up various aspects such as loading user data,
 * setting up password visibility toggling, and other initialization tasks.
 * @returns {Promise<void>} A Promise that resolves when initialization is complete.
 */
async function init() {
  setFavicon();
  // localStorage.removeItem("currentUser");
  showLoader();
  try {
    users = await loadUsersFromBackend("users");
  } catch (error) {
    console.error("Error updating current user :", error);
  } finally {
    hideLoader();
  }
  rememberMeCheck();
  addPasswordVisibilityListener(
    "login-pw-border-id",
    "lock-id",
    "login-pw-visibility-off-id",
    "login-pw-visibility-id",
    (password = true),
    (confirmPassword = false)
  );
}

/**
 * Registers a new user if the registration validation check passes and the privacy policy checkbox is confirmed.
 * If successful, displays a success message, closes the sign-up form, and resets inputType to "password".
 * @returns {Promise<void>} A Promise that resolves once the registration process is complete.
 */
async function register() {
  if (!(registerValidationCheck() && ppCheckboxConfirmed)) return;
  await addNewUser();
  toggleSuccessesMsg();
  closeSignUp();
  inputType = "password";
}

/**
 * Adds a new user to the backend by sending user data.
 * @returns {Promise<void>} A Promise that resolves once the new user is successfully added to the backend.
 */
async function addNewUser() {
  const newUser = generateNewUserObject();
  createRegisteredUserData(newUser);
  showLoader();
  try {
    await addNewUserToBackend(newUser);
  } catch (error) {
    console.error("Error sending user data to the backend:", error);
  } finally {
    hideLoader();
  }
}

/**
 * Creates registered user data by extracting input values and initializing contact data.
 * @param {Object} newUser - The new user object to which the data will be added.
 */
function createRegisteredUserData(newUser) {
  let name = document.getElementById("add-name-id").value;
  let mailInputEl = document.getElementById("add-email-id").value;
  const initializedName = setValidNameInItialsToUpperCase(name);
  const newCon = {
    name: initializedName,
    email: mailInputEl.toLowerCase(),
    phone: "",
    colorCode: "#43da86",
    textColorCode: "black",
  };
  newUser.contacts.push(newCon);
}

/**
 * Generates a new user object using the values entered in the registration form.
 * @returns {Object} A new user object containing user details, contacts, and tasks.
 */
function generateNewUserObject() {
  const userName = document.getElementById("add-name-id").value;
  const userEMail = document.getElementById("add-email-id").value;
  const userPassword = document.getElementById("add-pw-id").value;
  const userPasswordConfirm = document.getElementById("add-confirm-pw-id").value;
  return dummy_obj(userName, userEMail, userPassword, userPasswordConfirm);
}

/**
 * Validates the checkbox clicked event and toggles the visibility of privacy policy error messages.
 */
function validateCheckBoxClicked() {
  toggleVisibility("pp-id", ppCheckboxConfirmed, "err-msg-color");
}

/**
 * Handles field validation for the registration form.
 * @param {boolean[]} boolArr - An array of boolean values indicating validation results for different input fields and there borders.
 * @returns {boolean} Returns true if all fields pass validation, otherwise false.
 */
function handlerFieldValidationRegister(boolArr) {
  toggleVisibility("empty-add-name-id", boolArr[0]);
  toggleVisibility("invalid-add-name-id", boolArr[1]);
  toggleVisibility("no-special-chars-id", boolArr[2]);
  toggleVisibility("empty-add-email-id", boolArr[3]);
  toggleVisibility("invalid-add-email-id", boolArr[4]);
  toggleVisibility("existing-add-email-id", boolArr[5]);
  toggleVisibility("empty-add-pw-id", boolArr[6]);
  toggleVisibility("invalid-add-pw-id", boolArr[7]);
  toggleVisibility("empty-confirm-pw-id", boolArr[8]);
  toggleVisibility("invalid-confirm-pw-id", boolArr[9]);
  toggleVisibility("add-name-border-id", !boolArr[10], "error-border");
  toggleVisibility("add-email-border-id", !boolArr[11], "error-border");
  toggleVisibility("add-pw-border-id", !boolArr[12], "error-border");
  toggleVisibility("add-confirm-pw-border-id", !boolArr[13], "error-border");
  toggleVisibility("hyphens-add-name-id", boolArr[14]);
  toggleVisibility("spaces-add-name-id", boolArr[15]);
  return !boolArr.some(Boolean);
}

/**
 * Validates the registration form fields and checkbox.
 * @returns {boolean} Returns true if all fields pass validation, otherwise false.
 */
function registerValidationCheck() {
  const name = document.getElementById("add-name-id").value;
  const email = document.getElementById("add-email-id").value;
  const password = document.getElementById("add-pw-id").value;
  const confirmPassword = document.getElementById("add-confirm-pw-id").value;
  const checkBox = document.getElementById("privacy-check-id");
  const boolArr = Array(16).fill(false);
  validateName(name, boolArr);
  validateRegisterEmail(email.toLowerCase(), boolArr);
  validatePassword(password, boolArr);
  validateConfirmPassword(password, confirmPassword, boolArr);
  validateCheckBoxClicked(checkBox);
  return handlerFieldValidationRegister(boolArr);
}

/**
 * Toggles the visibility of the success message.
 */
function toggleSuccessesMsg() {
  toggleVisibility("success-msg-id", true);
  setTimeout(() => {
    toggleVisibility("success-msg-id", false, "slide-sm");
    setTimeout(() => {
      toggleVisibility("success-msg-id", true, "slide-sm");
    }, 900);
  }, 300);
  setTimeout(() => {
    toggleVisibility("success-msg-id", false);
  }, 2000);
}

/**
 * Resets the input fields in the registration form and clears validation states.
 */
function resetRegisterInputs() {
  const boolArr = Array(16).fill(false);
  handlerFieldValidationLogin(boolArr);
  document.getElementById("add-name-id").value = "";
  document.getElementById("add-email-id").value = "";
  document.getElementById("add-pw-id").value = "";
  document.getElementById("add-confirm-pw-id").value = "";
}

/**
 * Resets the previous password input types and visibility states for registration.
 */
function resetPrevRegisterPwImgAndTypes() {
  inputType = "password";
  inputTypeConfirm = "password";
  visibilityOn = false;
  visibilityOnConfirm = false;
}

/**
 * Displays the sign-up popup and initializes its elements.
 */
function signUp() {
  resetPrevRegisterPwImgAndTypes();
  resetLoginInputs();
  renderSignUpOverlay();
  addPasswordVisibilityListener(
    "add-pw-border-id",
    "register-lock-id",
    "register-pw-visibility-off-id",
    "register-pw-visibility-id",
    (password = true),
    (confirmPassword = false)
  );
  addPasswordVisibilityListener(
    "add-confirm-pw-border-id",
    "register-confirm-lock-id",
    "register-confirm-pw-visibility-off-id",
    "register-confirm-pw-visibility-id",
    (password = false),
    (confirmPassword = true)
  );
}

/**
 * Renders the sign-up overlay by appending the sign-up popup HTML to the specified element.
 */
function renderSignUpOverlay() {
  let signUpPopupElement = document.getElementById("sign-up-popup-id");
  signUpPopupElement.innerHTML += templateSignUpPopup();
  toggleVisibility("sign-up-popup-id", true);
  toggleVisibility("signup-container-id", false);
  toggleVisibility("login-id", false);
}

/**
 * Closes the sign-up popup and resets related elements and states.
 */
function closeSignUp() {
  document.getElementById("login-user-password-id").type = "password";
  toggleVisibility("lock-id", true);
  toggleVisibility("login-pw-visibility-off-id", false);
  toggleVisibility("login-pw-visibility-id", false);
  toggleVisibility("sign-up-popup-id", false);
  toggleVisibility("signup-container-id", true);
  toggleVisibility("login-id", true);
  document.getElementById("sign-up-popup-id").innerHTML = "";
  ppCheckboxConfirmed = false;
  inputType = "password";
  rememberMeCheck();
}

/**
 * Handles the validation of login input fields and toggles visibility of error messages.
 * @param {boolean[]} boolArr - Array indicating validation status for each field.
 */
function handlerFieldValidationLogin(boolArr) {
  toggleVisibility("empty-email-id", boolArr[0]);
  toggleVisibility("this-is-no-email-id", boolArr[1]);
  toggleVisibility("invalid-email-id", boolArr[2]);
  toggleVisibility("invalid-password-id", boolArr[3]);
  toggleVisibility("empty-password-id", boolArr[4]);
  toggleVisibility("login-email-border-id", !boolArr[5], "error-border");
  toggleVisibility("login-pw-border-id", !boolArr[6], "error-border");
}

/**
 * Toggles the state of the privacy policy checkbox and updates its appearance.
 * @param {Event} event - The event object triggered by the checkbox click.
 */
function toggleCheckbox(event) {
  const loginCheckbox = document.getElementById("uncheckbox-id");
  const ppCheckbox = document.getElementById("privacy-checkbox-id");
  ppCheckboxConfirmed = !ppCheckboxConfirmed;
  if (event.target.id === "uncheckbox-id") {
    rmCheckboxConfirmed = !rmCheckboxConfirmed;
    loginCheckbox.src = rmCheckboxConfirmed
      ? "./assets/svg/checkbox_confirmed.svg"
      : "./assets/svg/checkbox.svg";
    ppCheckboxConfirmed = false;
  } else if (event.target.id === "privacy-checkbox-id") {
    ppCheckbox.src = ppCheckboxConfirmed
      ? "./assets/svg/checkbox_confirmed.svg"
      : "./assets/svg/checkbox.svg";
  }
}

/**
 * Adds an input event listener to toggle password visibility and update related images.
 * @param {string} elementId - The ID of the input element to listen to.
 * @param {string} lockImgId - The ID of the lock image element.
 * @param {string} visibilityOffImgId - The ID of the visibility off image element.
 * @param {string} visibilityOnImgId - The ID of the visibility on image element.
 * @param {boolean} password - Indicates whether the input is a password field.
 * @param {boolean} confirmPassword - Indicates whether the input is a confirm password field.
 */
function addPasswordVisibilityListener(
  elementId,
  lockImgId,
  visibilityOffImg,
  visibilityOnImg,
  password,
  confirmPassword
) {
  const inputElement = document.getElementById(elementId);
  inputElement.addEventListener("input", function (event) {
    const passwordNotEmpty = isValueNotEmpty(event.target.value);
    toggleVisibility(lockImgId, !passwordNotEmpty);
    if (inputType === "text" && password)
      setRightImg(visibilityOnImg, visibilityOffImg, true, false);
    else if (inputType === "password" && password)
      setRightImg(visibilityOnImg, visibilityOffImg, false, true);
    if (inputTypeConfirm === "text" && confirmPassword)
      setRightImg(visibilityOnImg, visibilityOffImg, true, false);
    else if (inputTypeConfirm === "password" && confirmPassword)
      setRightImg(visibilityOnImg, visibilityOffImg, false, true);
    if (!passwordNotEmpty) setRightImg(visibilityOnImg, visibilityOffImg, false, false);
  });
}

/**
 * Toggles the visibility of password-related images based on the specified parameters.
 * @param {string} visibilityOnImg - The ID of the visibility on image element.
 * @param {string} visibilityOffImg - The ID of the visibility off image element.
 * @param {boolean} visibilityOn - Indicates whether the visibility is set to on.
 * @param {boolean} visibilityOff - Indicates whether the visibility is set to off.
 */
function setRightImg(visibilityOnImg, visibilityOffImg, visbilityOn, visibilityOff) {
  toggleVisibility(visibilityOnImg, visbilityOn);
  toggleVisibility(visibilityOffImg, visibilityOff);
}

/**
 * Toggles the visibility of password input fields and updates related elements.
 * @param {object} event - The event object triggered by the input field.
 * @param {string} ImgId - The ID of the image element.
 * @param {string} whichform - Indicates whether the password is for password or confirmation.
 * @param {number} value - The value to determine the visibility of the password.
 */
function togglePasswordVisibility(event, ImgId, whichform, value) {
  if ((whichform === "password" || whichform === "registerPw") && value === 1) visibilityOn = true;
  else if ((whichform === "password" || whichform === "registerPw") && value === -1)
    visibilityOn = false;
  else if (whichform === "confirmPw" && value === 1) visibilityOnConfirm = true;
  else if (whichform === "confirmPw" && value === -1) visibilityOnConfirm = false;
  toggleVisibility(event.target.id, false);
  toggleVisibility(ImgId, true);
  inputType = visibilityOn ? "text" : "password";
  inputTypeConfirm = visibilityOnConfirm ? "text" : "password";
  updatePasswordInput(whichform, inputType);
  if (whichform === "confirmPw") updatePasswordInput("confirmPw", inputTypeConfirm);
}

/**
 * Updates the type of password input field based on the specified form.
 * @param {string} whichform - Indicates the form for which the password input type needs to be updated.
 * @param {string} inputType - The type of input (e.g., "password" or "text").
 */
function updatePasswordInput(whichform, inputType) {
  const passwordInput = getPasswordInput(whichform);
  passwordInput.type = inputType;
}

/**
 * Retrieves the password input element based on the specified form.
 * @param {string} whichform - Indicates the form for which the password input element needs to be retrieved.
 * @returns {HTMLElement} - The password input element.
 */
function getPasswordInput(whichform) {
  const formMap = {
    password: "login-user-password-id",
    registerPw: "add-pw-id",
    confirmPw: "add-confirm-pw-id",
  };
  const elementId = formMap[whichform];
  return document.getElementById(elementId);
}

/**
 * Loads the current user based on the email entered during login.
 * @returns {object} - The user object corresponding to the logged-in user.
 */
function loadCurrentUser() {
  const loginUserEmail = document.getElementById("login-user-e-mail-id").value;
  return users[loginUserEmail.toLowerCase()];
}
