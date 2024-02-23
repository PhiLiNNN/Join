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


async function addUser() { 
    const inputs = getUserInputs();
    if (!validateCheckBoxClicked()) {
        return;
    }
    if (!checkPasswordMatch(inputs)) {
        return;
    }
    try {
        await addUserToBackend(...inputs);
        handleSuccess();
        resetUserInputs();
    } catch (error) {
        handleError(error);
    }
}


function getUserInputs() {
    const userName = document.getElementById("add-user-name-id").value;
    const userEMail = document.getElementById("add-user-e-mail-id").value;
    const userPassword = document.getElementById("add-user-password-id").value;
    const userPasswordConfirm = document.getElementById("add-user-password-confirmation-id").value;
    return [userName, userEMail, userPassword, userPasswordConfirm];
}


function resetUserInputs() {
    document.getElementById("add-user-name-id").value = "";
    document.getElementById("add-user-e-mail-id").value = "";
    document.getElementById("add-user-password-id").value = "";
    document.getElementById("add-user-password-confirmation-id").value = "";
}


async function addUserToBackend(userName, userEMail, userPassword, userPasswordConfirm) {
    let newUser = { userName, userEMail, userPassword, userPasswordConfirm };
    users.push(newUser);
    await setItem("users", JSON.stringify(users));
}


function handleSuccess() {
    toggleVisibility('sign-up-popup-id', false);
    console.log("User data sent successfully to the backend");
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
    if (!loginValidationCheck()) {
        return;
    }

    window.location.assign("../summary.html");
}

function loginValidationCheck() {
    const loginUserEmail = document.getElementById("login-user-e-mail-id").value;
    const loginUserPassword = document.getElementById("login-user-password-id").value;
    const foundUser = users.find(user => user.userEMail === loginUserEmail);
    toggleErrorBorderVisibility('login-user-e-mail-border-id', loginUserEmail === '');
    toggleVisibility('empty-email-id', loginUserEmail === '');
    if (loginUserEmail === '' || !foundUser) {
        toggleVisibility('invalid-email-id', loginUserEmail !== '');
        toggleVisibility('invalid-password-id', false);
        toggleVisibility('empty-password-id', false);
        toggleErrorBorderVisibility('login-user-password-border-id', false);
    } else {
        toggleVisibility('invalid-email-id', false);
        toggleErrorBorderVisibility('login-user-password-border-id', loginUserPassword === '');
        toggleVisibility('empty-password-id', loginUserPassword === '');
        if (loginUserPassword === '' || foundUser.userPassword !== loginUserPassword) {
            toggleVisibility('invalid-password-id', loginUserPassword !== '');
        } else {
            toggleVisibility('invalid-password-id', false);
            toggleErrorBorderVisibility('login-user-password-border-id', false);
            saveCurrentUser();
            return true;
        }
    }
    return false;
}

function toggleErrorBorderVisibility(elementId, show = true) {
    const element = document.getElementById(elementId);
    element.classList.toggle('login-input-error', show);
}

function toggleVisibility(elementId, show = true) {
    const element = document.getElementById(elementId);
    element.classList.toggle('d-none', !show);
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