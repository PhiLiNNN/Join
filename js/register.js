const STORAGE_TOKEN = "VORXWOHN4ATC5QT3Z5TB4EP1VRUAGMHB44HR2ZKT"; // Das ist unser TOKEN für Join Gruppe 2
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let rmCheckboxConfirmed = false;
let ppCheckboxConfirmed = false;
let users = [];
let currentUser = null;


async function init() {
    await loadUsers();
}


async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
        console.log('hier',users)
    } catch(e){
        console.error('Loading error:', e);
    }
}





function handlerFieldValidationLogin(boolArr) {
    toggleVisibility('empty-add-name-id', boolArr[0]);
    toggleVisibility('invalid-add-name-id', boolArr[1]);
    toggleVisibility('no-special-chars-id', boolArr[2]);
    toggleVisibility('empty-add-email-id', boolArr[2]);
    toggleVisibility('invalid-add-email-id', boolArr[2]);
    toggleVisibility('empty-add-pw-id', boolArr[4]);
    toggleVisibility('invalid-add-pw-id', boolArr[3]);
    toggleVisibility('empty-confirm-pw-id', boolArr[3]);
    toggleVisibility('invalid-confirm-pw-id', boolArr[3]);
    toggleErrorBorderVisibility('register-name-border-id', boolArr[5])
    toggleErrorBorderVisibility('register-email-border-id', boolArr[5])
    toggleErrorBorderVisibility('register-pw-border-id', boolArr[6])
    toggleErrorBorderVisibility('register-confirm-pw-border-id', boolArr[6])
    return !boolArr.some(Boolean);
}

function registerValidationCheck() {
    const name = document.getElementById("add-name-id").value;
    const email = document.getElementById("add-email-id").value;
    const password = document.getElementById("add-pw-id").value;
    const confirmPassword = document.getElementById("add-confirm-pw-id").value;
}

// work in progress
async function addUser() {             
    const inputs = getUserInputs();
    // if (!validateCheckBoxClicked()) {
    //     return;
    // }
    // if (!checkPasswordMatch(inputs)) {
    //     return;
    // }
    // try {
    //     await addUserToBackend(...inputs);
    //     resetUserInputs();
    // } catch (error) {
    //     handleError(error);
    // }
    toggleSuccessesMsg();
}





function toggleSuccessesMsg() {
    const successMsg =  document.getElementById('success-msg-id');
    successMsg.classList.toggle('d-none')
    window.setTimeout(() => {
        successMsg.classList.toggle('d-none');
    }, 800);
    closeSignUp();
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


function resetUserInputs() {
    document.getElementById("add-name-id").value = "";
    document.getElementById("add-email-id").value = "";
    document.getElementById("add-pw-id").value = "";
    document.getElementById("add-confirm-pw-id").value = "";
}



function handleError(error) {
    console.error("Error sending user data to the backend:", error);
}


function validateCheckBoxClicked() {
    let checkBox = document.getElementById('privacy-check-id');
    if (!checkBox.checked) {
        toggleVisibility('privacy-error-message-id', true); 
        return false;               
    } else {
         toggleVisibility('privacy-error-message-id', false);
         return true;   
    }
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
    toggleVisibility('sign-up-popup-id', true);
    toggleVisibility('signup-container-id', false);
    toggleVisibility('login-id', false);
    let signUpPopupElement = document.getElementById('sign-up-popup-id');
    signUpPopupElement.innerHTML += templateSignUpPopup();
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
    if(loginValidationCheck()) 
        window.location.assign("../summary.html");
}

function handlerFieldValidationLogin(boolArr) {
    toggleVisibility('empty-email-id', boolArr[0]);
    toggleVisibility('this-is-no-email-id', boolArr[1]);
    toggleVisibility('invalid-email-id', boolArr[2]);
    toggleVisibility('invalid-password-id', boolArr[3]);
    toggleVisibility('empty-password-id', boolArr[4]);
    toggleErrorBorderVisibility('login-email-border-id', boolArr[5])
    toggleErrorBorderVisibility('login-pw-border-id', boolArr[6])
    return !boolArr.some(Boolean);
}

function loginValidationCheck() {
    const loginUserEmail = document.getElementById("login-user-e-mail-id").value;
    const loginUserPassword = document.getElementById("login-user-password-id").value;
    const foundUser = users.find(user => user.userEMail === loginUserEmail)
    if (loginUserEmail === '' && loginUserPassword === '')
        return handlerFieldValidationLogin([true, false, false, false, true, true, true]);
    else if (loginUserEmail === '' && loginUserPassword !== '') 
        return handlerFieldValidationLogin ([true, false, false, false, false, true, false]);
    else if (loginUserEmail !== '' && loginUserPassword === '') 
        if (!validateEmail(loginUserEmail))
            return handlerFieldValidationLogin([false, true, false, false, true, true, true]);   
        else 
            return handlerFieldValidationLogin([false, false, false, false, true, false, true]);
    else if (loginUserEmail !== '' && loginUserPassword !== '') 
        if (!validateEmail(loginUserEmail)) 
            return handlerFieldValidationLogin([false, true, false, false, false, true, false]);  
        else if (validateEmail(loginUserEmail) && !foundUser) 
            return handlerFieldValidationLogin([false, false, true, false, false, true, false]);  
        else if (foundUser.userPassword !== loginUserPassword) 
            return handlerFieldValidationLogin([false, false, false, true, false, false, true]);  
        else
            return handlerFieldValidationLogin([false, false, false, false, false, false, false]); 
}

function validateEmail(email) {
    return email !== '' && email.includes('@') && email.indexOf('@') !== 0 && email.split('@').pop() !== '';
}

function toggleErrorBorderVisibility(elementId, show = true) {
    const element = document.getElementById(elementId);
    show ? element.classList.add('error-border') : element.classList.remove('error-border');
}

function toggleVisibility(elementId, show = true) {
    const element = document.getElementById(elementId);
    show ? element.classList.remove('d-none') : element.classList.add('d-none');
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
        console.log('rmCheckboxConfirmed',rmCheckboxConfirmed)
        loginCheckbox.src = rmCheckboxConfirmed
            ? './assets/img/checkbox_confirmed.svg'
            : './assets/img/checkbox.svg';
        ppCheckboxConfirmed = false;
    } else if (event.target.id === 'privacy-checkbox-id') {
        
        console.log('ppCheckboxConfirmed',ppCheckboxConfirmed)
        ppCheckbox.src = ppCheckboxConfirmed
            ? './assets/img/checkbox_confirmed.svg'
            : './assets/img/checkbox.svg'; 
    }
}