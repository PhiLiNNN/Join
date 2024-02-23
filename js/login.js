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
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Found user:", foundUser);
        window.location.assign("../summary.html");
    }    
}


function saveCurrentUser(foundUser) {
    if (!foundUser) {
        console.error("Cannot save null user.");
        return;
    }
    currentUser = foundUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    console.log("Saved currentUser:", currentUser);
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