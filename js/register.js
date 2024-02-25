const STORAGE_TOKEN = "VORXWOHN4ATC5QT3Z5TB4EP1VRUAGMHB44HR2ZKT"; // Das ist unser TOKEN für Join Gruppe 2
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let rmCheckboxConfirmed = false;
let ppCheckboxConfirmed = false;
let users = [];
let currentUser = null;


async function init() {
    await loadUsers();
    addPasswordVisibilityListener('login-pw-border-id', 'lock-id');
}


async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
        console.log('hier',users)
    } catch(e){
        console.error('Loading error:', e);
    }
}


function validateName(name, boolArr) {
    const specialCharRegex  = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/0123456789]/;
    const checkForDoppleHyphen = name.split("-").length - 1;
    if (name.trim() === "") 
        boolArr[0] = boolArr[9] = true;
    else if (specialCharRegex.test(name)) 
        boolArr[2] = boolArr[9] = true;
    else if (name.length < 2 && checkForDoppleHyphen === 0) 
        boolArr[1] = boolArr[9] = true;
    else if (checkForDoppleHyphen !== 0 && (!name.match(/[a-zA-Z]-[a-zA-Z]{2,}/) || name.indexOf('-') < 2 || name.split('-').pop() === '')) 
        boolArr[1] = boolArr[9] = true;
}


function validateRegisterEmail(email, boolArr) {
    if (email.trim() === "") 
        boolArr[3] = boolArr[10] = true;
    else if (!email.includes('@') || email.indexOf('@') === 0 || email.split('@').pop() === '') 
        boolArr[4] = boolArr[10] = true;
}


function validatePassword(password, boolArr) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/.test(password);
    const hasDigit = /[0123456789]/.test(password);
    if (password.trim() === "") 
        boolArr[5] = boolArr[11] = true;
    else if (!hasUpperCase || !hasSpecialChar || !hasDigit || password.length < 6 )  
        boolArr[6] = boolArr[11] = true;
}


function validateConfirmPassword(password, confirmPassword, boolArr) {
    if (confirmPassword.trim() === "") 
        boolArr[7] = boolArr[12] = true;
    else if (password !== confirmPassword  )  
        boolArr[8] = boolArr[12] = true;
}


function validateCheckBoxClicked() {
    toggleVisibility('pp-id', ppCheckboxConfirmed, 'err-msg-color');
}


function handlerFieldValidationRegister(boolArr) {
    toggleVisibility('empty-add-name-id', boolArr[0]);
    toggleVisibility('invalid-add-name-id', boolArr[1]);
    toggleVisibility('no-special-chars-id', boolArr[2]);
    toggleVisibility('empty-add-email-id', boolArr[3]);
    toggleVisibility('invalid-add-email-id', boolArr[4]);
    toggleVisibility('empty-add-pw-id', boolArr[5]);
    toggleVisibility('invalid-add-pw-id', boolArr[6]);
    toggleVisibility('empty-confirm-pw-id', boolArr[7]);
    toggleVisibility('invalid-confirm-pw-id', boolArr[8]);
    toggleVisibility('add-name-border-id', !boolArr[9],'error-border')
    toggleVisibility('add-email-border-id', !boolArr[10],'error-border')
    toggleVisibility('add-pw-border-id', !boolArr[11],'error-border')
    toggleVisibility('add-confirm-pw-border-id', !boolArr[12],'error-border')
    return !boolArr.some(Boolean);
}


function registerValidationCheck() {
    const name = document.getElementById("add-name-id").value;
    const email = document.getElementById("add-email-id").value;
    const password = document.getElementById("add-pw-id").value;
    const confirmPassword = document.getElementById("add-confirm-pw-id").value;
    const checkBox = document.getElementById('privacy-check-id');
    const boolArr = [false, false, false, false, false, false, false, false, false, false, false, false, false];
    validateName(name, boolArr);
    validateRegisterEmail(email, boolArr);
    validatePassword(password, boolArr);
    validateConfirmPassword(password, confirmPassword, boolArr);
    validateCheckBoxClicked(checkBox);
    return handlerFieldValidationRegister(boolArr);
}


// work in progress
async function addUser() {             
    // const inputs = getUserInputs();
    if(!registerValidationCheck()){
        return;
    }
    // try {
    //     await addUserToBackend(...inputs);
    //     resetUserInputs();
    // } catch (error) {
    //     handleError(error);
    // }
    toggleSuccessesMsg();
    closeSignUp();
}


function toggleSuccessesMsg() {
    const successMsg =  document.getElementById('success-msg-id');
    successMsg.classList.toggle('d-none')
    window.setTimeout(() => {
        successMsg.classList.toggle('d-none');
    }, 800);
}


async function addUserToBackend(userName, userEMail, userPassword, userPasswordConfirm) {
    let newUser = { userName, userEMail, userPassword, userPasswordConfirm };
    users.push(newUser);
    await setItem("users", JSON.stringify(users));
}


function getUserInputs() {
    const userName = document.getElementById("add-name-id").value;
    const userEMail = document.getElementById("add-email-id").value;
    const userPassword = document.getElementById("add-pw-id").value;
    const userPasswordConfirm = document.getElementById("add-confirm-pw-id").value;
    return [userName, userEMail, userPassword, userPasswordConfirm];
}


function resetRegisterInputs() {
    const boolArr = [false, false, false, false, false, false, false, false, false, false, false, false, false];
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
    const pwInput = document.getElementById('lock-id');
    showImage(pwInput, './assets/img/lock.png');
}


function handleError(error) {
    console.error("Error sending user data to the backend:", error);
}


/**
 * Push request to backend.
 * Either it is fulfilled successfully (resolved) or it fails (rejected).
 * @param {lokal storage key} key
 * @param {string} value
 * @returns Promise: resolved or rejected.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}


/**
 * Get request to backend.
 * @param {lokal storage key} key
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value);
}


function checkPasswordMatch(inputs) {
    if (inputs[2] !== inputs[3]) {
        console.error("Password and confirmation do not match");
        return false;
    }
    return true;
}


function signUp() {
    resetLoginInputs();
    toggleVisibility('sign-up-popup-id', true);
    toggleVisibility('signup-container-id', false);
    toggleVisibility('login-id', false);
    let signUpPopupElement = document.getElementById('sign-up-popup-id');
    signUpPopupElement.innerHTML += templateSignUpPopup();
    addPasswordVisibilityListener('add-pw-border-id', 'register-lock-id');
    addPasswordVisibilityListener('add-confirm-pw-border-id', 'register-confirm-lock-id');
}


function closeSignUp() {
    toggleVisibility('sign-up-popup-id', false);
    toggleVisibility('signup-container-id', true);
    toggleVisibility('login-id', true);
    ppCheckboxConfirmed = false;
    let signUpPopupElement = document.getElementById('sign-up-popup-id');
    signUpPopupElement.innerHTML = ""; 
}


function login() {
    console.log(loginValidationCheck())
    if(loginValidationCheck()) 
        window.location.assign("../summary.html");
}


function handlerFieldValidationLogin(boolArr) {
    toggleVisibility('empty-email-id', boolArr[0]);
    toggleVisibility('this-is-no-email-id', boolArr[1]);
    toggleVisibility('invalid-email-id', boolArr[2]);
    toggleVisibility('invalid-password-id', boolArr[3]);
    toggleVisibility('empty-password-id', boolArr[4]);
    toggleVisibility('login-email-border-id', !boolArr[5],'error-border')
    toggleVisibility('login-pw-border-id', !boolArr[6],'error-border' )
}


function loginValidationCheck() {
    const loginUserEmail = document.getElementById("login-user-e-mail-id").value;
    const loginUserPassword = document.getElementById("login-user-password-id").value;
    console.log(typeof users)
    const foundUser = users.find(user => user.userEMail === loginUserEmail)
    const boolArr = [false, false, false, false, false, false, false];
    if (loginUserEmail === '' && loginUserPassword === '')
        boolArr[0] = boolArr[4] = boolArr[5] = boolArr[6] = true;
    else if (loginUserEmail === '' && loginUserPassword !== '') 
        boolArr[0] = boolArr[5] = true;
    else if (loginUserEmail !== '' && loginUserPassword === '') 
        if (!validateLoginEmail(loginUserEmail))
            boolArr[1] = boolArr[4] = boolArr[5] = boolArr[6] = true;
        else 
            boolArr[4] = boolArr[6] = true;
    else if (loginUserEmail !== '' && loginUserPassword !== '') 
        if (!validateLoginEmail(loginUserEmail)) 
            boolArr[1] = boolArr[5] = true; 
        else if (validateLoginEmail(loginUserEmail) && !foundUser) 
            boolArr[2] = boolArr[5] = true; 
        else if (foundUser.userPassword !== loginUserPassword) 
            boolArr[3] = boolArr[6] = true; 
    handlerFieldValidationLogin(boolArr);

    return !boolArr.some(Boolean);
}


function validateLoginEmail(email) {
    return email !== '' && email.includes('@') && email.indexOf('@') !== 0 && email.split('@').pop() !== '';
}


function toggleVisibility(elementId, show = true, className = 'd-none') {
    const element = document.getElementById(elementId);
    show ? element.classList.remove(className) : element.classList.add(className);
}


function saveCurrentUser() {
    localStorage.setItem('users', JSON.stringify(users)); // Speichert die "users" lokal ab um später dort Kontakte zu speichern
    // currentUser = foundUser; // Setzen Sie den aktuellen Benutzer
    // localStorage.setItem('currentUser', JSON.stringify(currentUser));  // Speichert den "currentUser" lokal ab
    // console.log("Saved currentUser:", currentUser); // Überprüfen, ob currentUser erfolgreich gespeichert wurde
}


function toggleRememberMeCheckbox(event) {
    const loginCheckbox = document.getElementById("uncheckbox-id");
    const ppCheckbox = document.getElementById("privacy-checkbox-id");
    ppCheckboxConfirmed = !ppCheckboxConfirmed;
    if (event.target.id === 'uncheckbox-id') {
        rmCheckboxConfirmed = !rmCheckboxConfirmed;
        loginCheckbox.src = rmCheckboxConfirmed
            ? './assets/img/checkbox_confirmed.svg'
            : './assets/img/checkbox.svg';
        ppCheckboxConfirmed = false;
    } else if (event.target.id === 'privacy-checkbox-id') {
        ppCheckbox.src = ppCheckboxConfirmed
            ? './assets/img/checkbox_confirmed.svg'
            : './assets/img/checkbox.svg'; 
    }
}

// login-pw-border-id
function addPasswordVisibilityListener(elementId, inputId) {
    const inputElement = document.getElementById(elementId);
    inputElement.addEventListener("input", function(event) {
        handleInputChange(event, inputId);
    });
}


function handleInputChange(event, inputId) {
    const lockImage = document.getElementById(inputId);
    if (isPasswordNotEmpty(event.target.value)) 
        showImage(lockImage, './assets/img/visibility_off.png');
    else 
        showImage(lockImage, './assets/img/lock.png');
}


function isPasswordNotEmpty(passwordInput) {
    
    return passwordInput.trim().length !== 0;
}


function showImage(lockImage, src) {
    lockImage.src = src;
}