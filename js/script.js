const STORAGE_TOKEN = "JE8COTEM5YPGTTDSPWOO02FS2X8RG2C05Z8ESTXU"; // Das ist unser TOKEN für Join Gruppe 2
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
    let checkBox = document.getElementById("privacy-check-ID");
    let errorMessage = document.getElementById("privacy-error-message");
    if (!checkBox.checked) {
        errorMessage.style.display = "block";
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
        return false;
    }
    let userName = document.getElementById("user-name-id");
    let userEMail = document.getElementById("user-e-mail-id");
    let userPassword = document.getElementById("user-password-id");
    let userPasswordConfirm = document.getElementById("user-password-confirmation-id");
    users.push({userName: userName.value, userEMail: userEMail.value, userPassword: userPassword.value, userPasswordConfirm: userPasswordConfirm.value});
    // Hier backend speicherung hinzufügen
    console.log(users, "User erfolgreich erstellt");
    
    // Daten an das Backend senden
    try {
        await setItem("users", users);
        console.log("Benutzerdaten erfolgreich an das Backend gesendet");
        // Umleitung auf die Startseite
        window.location.assign("../index.html");
    } catch (error) {
        console.error("Fehler beim Senden der Benutzerdaten an das Backend:", error);
        // Hier könntest du entsprechend reagieren, wenn das Senden der Benutzerdaten fehlschlägt
    }
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
    try {
      const payload = { key, value, token: STORAGE_TOKEN };
      const response = await fetch(STORAGE_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error during setItem:", error);
      throw error;
    }
  }