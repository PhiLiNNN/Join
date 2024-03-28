let rmCheckboxConfirmed = (ppCheckboxConfirmed = false);
let users = {};
let newUserArray = [];
let emptyInput = true;
let visibilityOn, visibilityOnConfirm;
let inputType = (inputTypeConfirm = "password");
let password,
  confirmPassword = false;
// pw: tEst1!
async function init() {
  localStorage.clear();
  showLoader();
  try {
    users = await loadUsersFromBackend("users");
  } catch (error) {
    console.error("Error updating current user :", error);
  } finally {
    hideLoader();
  }
  console.log(users);
  // await setItem("users", JSON.stringify({})); //  funktion zum clearen des Backends
  addPasswordVisibilityListener(
    "login-pw-border-id",
    "lock-id",
    "login-pw-visibility-off-id",
    "login-pw-visibility-id",
    (password = true),
    (confirmPassword = false)
  );
}

async function register() {
  if (!(registerValidationCheck() && ppCheckboxConfirmed)) return;
  await addNewUser();
  toggleSuccessesMsg();
  closeSignUp();
  inputType = "password";
}

async function addNewUser() {
  const newUser = generateNewUserObject();
  showLoader();
  try {
    await addNewUserToBackend(newUser);
  } catch (error) {
    console.error("Error sending user data to the backend:", error);
  } finally {
    hideLoader();
  }
}

function generateNewUserObject() {
  const userName = document.getElementById("add-name-id").value;
  const userEMail = document.getElementById("add-email-id").value;
  const userPassword = document.getElementById("add-pw-id").value;
  const userPasswordConfirm = document.getElementById("add-confirm-pw-id").value;
  return {
    userName: userName,
    userEMail: userEMail.toLowerCase(),
    userPassword: userPassword,
    userPasswordConfirm: userPasswordConfirm,
    contacts: [],
    tasks: {
      titles: [],
      descriptions: [],
      assignedTo: [],
      prios: [],
      categories: [],
      subtasks: [],
      dates: [],
      board: [],
    },
  };
}

function validateCheckBoxClicked() {
  toggleVisibility("pp-id", ppCheckboxConfirmed, "err-msg-color");
}

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
  return !boolArr.some(Boolean);
}

function registerValidationCheck() {
  const name = document.getElementById("add-name-id").value;
  const email = document.getElementById("add-email-id").value;
  const password = document.getElementById("add-pw-id").value;
  const confirmPassword = document.getElementById("add-confirm-pw-id").value;
  const checkBox = document.getElementById("privacy-check-id");
  const boolArr = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  validateName(name, boolArr);
  validateRegisterEmail(email.toLowerCase(), boolArr);
  validatePassword(password, boolArr);
  validateConfirmPassword(password, confirmPassword, boolArr);
  validateCheckBoxClicked(checkBox);
  return handlerFieldValidationRegister(boolArr);
}

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

function resetRegisterInputs() {
  const boolArr = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  handlerFieldValidationLogin(boolArr);
  document.getElementById("add-name-id").value = "";
  document.getElementById("add-email-id").value = "";
  document.getElementById("add-pw-id").value = "";
  document.getElementById("add-confirm-pw-id").value = "";
}

function resetLoginInputs() {
  const boolArr = [false, false, false, false, false, false, false];
  handlerFieldValidationLogin(boolArr);
  document.getElementById("login-user-e-mail-id").value = "";
  document.getElementById("login-user-password-id").value = "";
  const pwInput = document.getElementById("lock-id");
  pwInput.src = "./assets/img/lock.png";
}

function signUp() {
  inputType = "password";
  resetLoginInputs();
  toggleVisibility("sign-up-popup-id", true);
  toggleVisibility("signup-container-id", false);
  toggleVisibility("login-id", false);
  let signUpPopupElement = document.getElementById("sign-up-popup-id");
  signUpPopupElement.innerHTML += templateSignUpPopup();
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
}

function login() {
  if (loginValidationCheck()) {
    const loggedInUser = loadCurrentUser();
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    window.location.assign("../summary.html");
  }
}

function handlerFieldValidationLogin(boolArr) {
  toggleVisibility("empty-email-id", boolArr[0]);
  toggleVisibility("this-is-no-email-id", boolArr[1]);
  toggleVisibility("invalid-email-id", boolArr[2]);
  toggleVisibility("invalid-password-id", boolArr[3]);
  toggleVisibility("empty-password-id", boolArr[4]);
  toggleVisibility("login-email-border-id", !boolArr[5], "error-border");
  toggleVisibility("login-pw-border-id", !boolArr[6], "error-border");
}

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

function toggleCheckbox(event) {
  const loginCheckbox = document.getElementById("uncheckbox-id");
  const ppCheckbox = document.getElementById("privacy-checkbox-id");
  ppCheckboxConfirmed = !ppCheckboxConfirmed;
  if (event.target.id === "uncheckbox-id") {
    rmCheckboxConfirmed = !rmCheckboxConfirmed;
    loginCheckbox.src = rmCheckboxConfirmed
      ? "./assets/img/checkbox_confirmed.svg"
      : "./assets/img/checkbox.svg";
    ppCheckboxConfirmed = false;
  } else if (event.target.id === "privacy-checkbox-id") {
    ppCheckbox.src = ppCheckboxConfirmed
      ? "./assets/img/checkbox_confirmed.svg"
      : "./assets/img/checkbox.svg";
  }
}

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

function setRightImg(visibilityOnImg, visibilityOffImg, visbilityOn, visibilityOff) {
  toggleVisibility(visibilityOnImg, visbilityOn);
  toggleVisibility(visibilityOffImg, visibilityOff);
}

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

function updatePasswordInput(whichform, inputType) {
  const passwordInput = getPasswordInput(whichform);
  passwordInput.type = inputType;
}

function getPasswordInput(whichform) {
  const formMap = {
    password: "login-user-password-id",
    registerPw: "add-pw-id",
    confirmPw: "add-confirm-pw-id",
  };
  const elementId = formMap[whichform];
  return document.getElementById(elementId);
}

function loadCurrentUser() {
  const loginUserEmail = document.getElementById("login-user-e-mail-id").value;
  return users[loginUserEmail.toLowerCase()];
}

function guestLogin() {
  const guestEmail = "guest@login.de";
  const guestPassword = "Guest!login1";
  document.getElementById("login-user-e-mail-id").value = guestEmail.toLowerCase();
  document.getElementById("login-user-password-id").value = guestPassword;
  login();
}
