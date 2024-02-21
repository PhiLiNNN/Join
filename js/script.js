const STORAGE_TOKEN = "VORXWOHN4ATC5QT3Z5TB4EP1VRUAGMHB44HR2ZKT"; // Das ist unser TOKEN für Join Gruppe 2
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let users = [];

function init() {
    includeHTML();

}


async function includeHTML() {
    let include = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < include.length; i++) {
        const element = include[i];
        let file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if(resp.ok) {
            include[i].innerHTML = await resp.text();
        } else {
            include[i].innerHTML = 'Page not found';
        }
    }
}

async function addUser(event) {
    const checkBox = document.getElementById("privacy-check-ID");
    let errorMessage = document.getElementById("privacy-error-message");
    if (!checkBox.checked) {
        errorMessage.style.display = "block";
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
        return false;
    }
    const userName = document.getElementById("add-user-name-id").value;
    const userEMail = document.getElementById("add-user-e-mail-id").value;
    const userPassword = document.getElementById("add-user-password-id").value;
    const userPasswordConfirm = document.getElementById("add-user-password-confirmation-id").value;
    let newUser = {userName, userEMail, userPassword, userPasswordConfirm};  
    console.log(newUser);  
    try {        
        await setItem("users", JSON.stringify(newUser));
        console.log("Benutzerdaten erfolgreich an das Backend gesendet");
        users.push(newUser);
        signUpPopup.classList.toggle('d-none');
    } catch (error) {
        console.error("Fehler beim Senden der Benutzerdaten an das Backend:", error);        
    }
    console.log("async function addUser(event) users" , users);
}

function validateCheckBoxClicked() {
    let checkBox = document.getElementById("privacy-check-ID");
    let errorMessage = document.getElementById("privacy-error-message");
    if (!checkBox.checked) {
        errorMessage.style.display = "block";                
    } else {
        errorMessage.style.display = "none";
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
    return fetch(url).then(res => res.json());
}

async function fetchUsersFromBackend() {
    try {
        const usersData = await getItem("users");
        console.log("Benutzerdaten erfolgreich vom Backend abgerufen:", usersData);
        return usersData; // Gib die Benutzerdaten zurück
    } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten vom Backend:", error);
        throw error;
    }
}

async function login() {
    try {
        const usersData = await fetchUsersFromBackend(); // Benutzerdaten aus dem Backend abrufen
        let eMail = document.getElementById(`login-user-e-mail-id`).value;
        let password = document.getElementById(`login-user-password-id`).value;
        let users = JSON.parse(usersData.data.value); // Konvertiere den Benutzerdaten-String in ein Array
        let user = users.find(user => user.userEMail === eMail && user.userPassword === password); // Überprüfung der E-Mail und des Passworts
        if(user) {
            console.log(`User gefunden`);
            window.location.assign("summary.html"); // Weiterleitung bei erfolgreichem Login
        } else {
            console.log(`User nicht gefunden`);
            loginNotification();
        }
    } catch (error) {
        console.error("Fehler beim Login:", error);        
    }
}

function loginNotification() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get(`msg`);
    if(msg) {
        msgBox.innerHTML = msg;
    } else {
        // display none
    }
}


function signUp()  {
    let signUpPopup = document.getElementById('sign-up-popup-id');
    signUpPopup.classList.toggle('d-none');
}