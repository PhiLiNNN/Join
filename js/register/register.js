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
  return {
    userName: userName,
    userEMail: userEMail.toLowerCase(),
    userPassword: userPassword,
    userPasswordConfirm: userPasswordConfirm,
    contacts: [
      {name: 'Ash Ketchum', email: 'ash@pokemon.com', phone: '159159159', colorCode: '#f94144', textColorCode: 'white'},
      {name: 'Bart Simpson', email: 'bart@simpsons.com', phone: '1234567890', colorCode: '#f3722c', textColorCode: 'black'},
      {name: 'Bisasam', email: 'bisasam@pokemon.com', phone: '2468101214', colorCode: '#09be6d', textColorCode: 'white'},
      {name: 'Duffman', email: 'duffman@duff.com', phone: '3434343434', colorCode: '#277da1', textColorCode: 'white'},
      {name: 'Eichhörnchen Scrat', email: 'scrat@iceage.com', phone: '4242424242', colorCode: '#f9c74f', textColorCode: 'black'},
      {name: 'Eric Cartman', email: 'cartman@southpark.com', phone: '0303030303', colorCode: '#577590', textColorCode: 'white'},
      {name: 'Faultier Sid', email: 'sid@iceage.com', phone: '6767676767', colorCode: '#43aa8b', textColorCode: 'black'},
      {name: 'Glumanda', email: 'glumanda@pokemon.com', phone: '9876543210', colorCode: '#ff4500', textColorCode: 'white'},
      {name: 'Helloworld', email: 'planet@vegetacom', phone: '01751234658', colorCode: '#43da86', textColorCode: 'black'},
      {name: 'Homer Simpson', email: 'homer@springfield.com', phone: '1234567890', colorCode: '#d0d256', textColorCode: 'black'},
      {name: 'Kakarott', email: 'planet@vegeta.com', phone: '01751234658', colorCode: '#82e1f2', textColorCode: 'black'},
      {name: 'Kenny Mccormick', email: 'kenny@southpark.com', phone: '3692581470', colorCode: '#4d908e', textColorCode: 'white'},
      {name: 'Mammut Manny', email: 'manny@iceage.com', phone: '9876543210', colorCode: '#bb3e03', textColorCode: 'white'},
      {name: 'Max', email: 'max.katze@bluewin.ch', phone: '0041796545860', colorCode: '#daa344', textColorCode: 'black'},
      {name: 'Mr Burns', email: 'mr.burns@springfield.com', phone: '5757575757', colorCode: '#0a9396', textColorCode: 'white'},
      {name: 'Patrick Star', email: 'patrick@spongebob.com', phone: '987987987', colorCode: '#8fda44', textColorCode: 'black'},
      {name: 'Philipp Wendschuch', email: 'phndschuch@web.de', phone: '017367593', colorCode: '#43da86', textColorCode: 'black'},
      {name: 'Pika Pikachu', email: 'pikachu@pokemon.com', phone: '5757575757', colorCode: '#f1d627', textColorCode: 'black'},
      {name: 'Son Goku', email: 'goku@dbz.com', phone: '8989898989', colorCode: '#ff0066', textColorCode: 'white'},
      {name: 'Spongebob Schwammkopf', email: 'spongebob@spongebob.com', phone: '1234567890', colorCode: '#c6d747', textColorCode: 'black'},
      {name: 'Stan Marsh', email: 'stan@southpark.com', phone: '9876543210', colorCode: '#4462da', textColorCode: 'white'},
      {name: 'Vegeta', email: 'vegeta@dbz.com', phone: '9876543210', colorCode: '#005f73', textColorCode: 'white'},
      {name: 'Silas Voss', email: 'Silas@voss.com', phone: '1525664356', colorCode: '#43da86', textColorCode: 'black'}],

    tasks: {
      titles: ["Verloren im Poké-Dschungel","Duff Time!","OMG, Sie haben Kenny getötet!","Crossover-Chaos!","Geheimen Krabbenburger-Zutat","D`oh & Dare: Homer vs. Bart","Scrat´s Nuss-Odyssee"],
      descriptions: [" Schnapp dir deinen Pokéball und mach dich bereit für ein wildes Abenteuer! Verirre dich durch hohe Gräser, erkunde geheimnisvolle Höhlen und triff auf Pokémon, die darauf warten, von dir entdeckt zu werden. Aber pass auf - Team Rocket könnte hinter jeder Ecke lauern! ","Duffman und Homer Simpson treffen sich für ein episches Bier-Duell! \"Sie rauchen 2 Zigaretten?!..!!!\"","","Springfield trifft auf Pokémon, Ice Age, South Park, SpongeBob Schwammkopf und Dragonball Z!","Irgendwo in Bikini Bottom ist die geheime Krabbenburger-Zutat.","Homer und Bart liefern sich ein episches Duell","Scrat ist wieder mal auf der Jagd nach seiner geliebten Nuss, aber wo ist sie?"],
      assignedTo: [ 
        {colorCodes:['rgb(249, 65, 68)', 'rgb(9, 190, 109)', 'rgb(255, 69, 0)', 'rgb(241, 214, 39)'], initials:['AK', 'B', 'G', 'PP'], textColors:['rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(0, 0, 0)'], userMails:['ash@pokemon.com', 'bisasam@pokemon.com', 'glumanda@pokemon.com', 'pikachu@pokemon.com'], userNames: ['Ash Ketchum', 'Bisasam', 'Glumanda', 'Pika Pikachu']},
        {colorCodes:['rgb(39, 125, 161)', 'rgb(208, 210, 86)', 'rgb(249, 65, 68)', 'rgb(243, 114, 44)'], initials: ['D', 'HS', 'AK', 'BS'], textColors: ['rgb(255, 255, 255)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'rgb(0, 0, 0)'], userMail: ['duffman@duff.com', 'homer@springfield.com', 'ash@pokemon.com', 'bart@simpsons.com'], userNames: ['Duffman', 'Homer Simpson', 'Ash Ketchum', 'Bart Simpson']},
        {colorCodes:['rgb(87, 117, 144)', 'rgb(68, 98, 218)'], initials: ['EC', 'SM'], textColors: ['rgb(255, 255, 255)', 'rgb(255, 255, 255)'], userMails: ['cartman@southpark.com', 'stan@southpark.com'], userNames: ['Eric Cartman', 'Stan Marsh']},
        {colorCodes:["rgb(249, 65, 68)","rgb(243, 114, 44)","rgb(9, 190, 109)","rgb(39, 125, 161)","rgb(249, 199, 79)","rgb(87, 117, 144)","rgb(67, 170, 139)","rgb(255, 69, 0)","rgb(208, 210, 86)","rgb(77, 144, 142)","rgb(187, 62, 3)","rgb(218, 163, 68)","rgb(10, 147, 150)","rgb(143, 218, 68)","rgb(241, 214, 39)","rgb(255, 0, 102)","rgb(198, 215, 71)","rgb(68, 98, 218)","rgb(0, 95, 115)"],
         initials:['AK', 'BS', 'B', 'D', 'ES', 'EC', 'FS', 'G', 'HS', 'KM', 'MM', 'M', 'MB', 'PS', 'PP', 'SG', 'SS', 'SM', 'V'],
         textColors: ["rgb(255, 255, 255)","rgb(0, 0, 0)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(0, 0, 0)","rgb(255, 255, 255)","rgb(0, 0, 0)","rgb(255, 255, 255)","rgb(0, 0, 0)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(0, 0, 0)","rgb(255, 255, 255)","rgb(0, 0, 0)","rgb(0, 0, 0)","rgb(255, 255, 255)","rgb(0, 0, 0)","rgb(255, 255, 255)","rgb(255, 255, 255)"],
         userMails: ["ash@pokemon.com","bart@simpsons.com","bisasam@pokemon.com","duffman@duff.com","scrat@iceage.com","cartman@southpark.com","sid@iceage.com","glumanda@pokemon.com","homer@springfield.com","kenny@southpark.com","manny@iceage.com","max.katze@bluewin.ch","mr.burns@springfield.com","patrick@spongebob.com","pikachu@pokemon.com","goku@dbz.com","spongebob@spongebob.com","stan@southpark.com","vegeta@dbz.com"],
         userNames: ["Ash Ketchum","Bart Simpson","Bisasam","Duffman","Eichhörnchen Scrat","Eric Cartman","Faultier Sid","Glumanda","Homer Simpson","Kenny Mccormick","Mammut Manny","Max","Mr Burns","Patrick Star","Pika Pikachu","Son Goku","Spongebob Schwammkopf","Stan Marsh","Vegeta"]},
         {colorCodes: ['rgb(143, 218, 68)', 'rgb(198, 215, 71)'],initials: ['PS', 'SS'], textColors: ['rgb(0, 0, 0)', 'rgb(0, 0, 0)'], userMails: ['patrick@spongebob.com', 'spongebob@spongebob.com'], userNames: ['Patrick Star', 'Spongebob Schwammkopf']},
         {colorCodes: ['rgb(243, 114, 44)', 'rgb(208, 210, 86)'], initials: ['BS', 'HS'], textColors: ['rgb(0, 0, 0)', 'rgb(0, 0, 0)'], userMails: ['bart@simpsons.com', 'homer@springfield.com'], userNames:['Bart Simpson', 'Homer Simpson']},
         {colorCodes: ['rgb(249, 199, 79)', 'rgb(67, 170, 139)', 'rgb(187, 62, 3)'], initials: ['ES', 'FS', 'MM'], textColors: ['rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'], userMails: ['scrat@iceage.com', 'sid@iceage.com', 'manny@iceage.com'], userNames: ['Eichhörnchen Scrat', 'Faultier Sid', 'Mammut Manny']}
      ],
      prios: ["urgent","low","urgent","low","medium","low","low"],
      categories: ["User Story","Research","Technical Task","Enhancement","Feature Request","Other","Infrastructure"],
      subtasks:[
        {done:[true, true], tasks: ['Finde deinen Weg durch den Poké-Dschungel.', 'Besiege Team Rocket!']},
        {done: [false, false, false], tasks: ['Trinke ein Duff Beer schneller als Homer.', 'Stelle sicher, dass der Kühlschrank für weitere Du', 'sdawfawf']},
        {done: [], tasks: []},
        {done: [true], tasks: ['Bart und Ash gegen Mr. Burns und Team Rocket.']},
        {done: [true, false], tasks: ['Hilf Patrick, den besten Sonnenplatz am Meeresboden zu finden!', 'Finde die geheime Krabbenburger-Zutat! ']},
        {done: [], tasks: []},
        {done: [false, false], tasks: ['Hilf Scrat, seine Nuss ui finden!', 'Überzeuge Sid und Manny, Scrat bei seiner Suche zu helfen!']},
      ],
      dates: ["2024-04-26","2024-04-21","2024-04-24","2024-04-28","2024-04-18","2024-05-03","2024-04-22"],
      board: ["done","done","toDo","inProgress","inProgress","toDo","awaitFeedback"],
    },
  };
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
