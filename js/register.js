const STORAGE_TOKEN = "VORXWOHN4ATC5QT3Z5TB4EP1VRUAGMHB44HR2ZKT"; // Das ist unser TOKEN für Join Gruppe 2
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let checkboxConfirmed = false;
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


function toggleVisibility(elementId, show = true) {
    const element = document.getElementById(elementId);
    show ? element.classList.remove('d-none') : element.classList.add('d-none');
}


function signUp() {
    toggleVisibility('sign-up-popup-id', true);
    let signUpPopupElement = document.getElementById('sign-up-popup-id');
    signUpPopupElement.innerHTML += templateSignUpPopup();
}


function closeSignUp() {
    toggleVisibility('sign-up-popup-id', false);
    let signUpPopupElement = document.getElementById('sign-up-popup-id');
    signUpPopupElement.innerHTML = ""; 
}


function login() {
    const loginUserEmail = document.getElementById("login-user-e-mail-id").value;
    const loginUserPassword = document.getElementById("login-user-password-id").value;
    const emailBorder = document.getElementById("login-user-e-mail-border-id");
    const passwordBorder = document.getElementById("login-user-password-border-id");
    const foundUser = users.find(user => user.userEMail === loginUserEmail);
    emailBorder.classList.toggle('login-input-error', !foundUser);
    passwordBorder.classList.toggle('login-input-error', !foundUser || foundUser.userPassword !== loginUserPassword);
    if (foundUser && foundUser.userPassword === loginUserPassword) {
        saveCurrentUser(foundUser);
        localStorage.setItem('users', JSON.stringify(users)); // Speichert die "users" lokal ab um später dort Kontakte zu speichern
        console.log("Found user:", foundUser); // Überprüfen, ob ein Benutzer gefunden wurde
        window.location.assign("../summary.html");
    }    
}


function saveCurrentUser(foundUser) {
    if (!foundUser) {
        console.error("Cannot save null user.");
        return;
    }
    currentUser = foundUser; // Setzen Sie den aktuellen Benutzer
    localStorage.setItem('currentUser', JSON.stringify(currentUser));  // Speichert den "currentUser" lokal ab
    console.log("Saved currentUser:", currentUser); // Überprüfen, ob currentUser erfolgreich gespeichert wurde
}


function toggleRememberMeCheckbox() {
    const loginUserEmail = document.getElementById("uncheckbox-id");
    checkboxConfirmed = !checkboxConfirmed;
    loginUserEmail.src = checkboxConfirmed
        ? './assets/img/checkbox_confirmed.png'
        : './assets/img/checkbox.png';
}



