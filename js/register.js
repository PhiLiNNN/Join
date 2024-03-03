const STORAGE_TOKEN = "VORXWOHN4ATC5QT3Z5TB4EP1VRUAGMHB44HR2ZKT"; 
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let rmCheckboxConfirmed = false;
let ppCheckboxConfirmed = false;
let users = {};
let newUserArray = [];
let emptyInput = true;
let pwVisibility = { pwVisibilityOn: false };
let confirmPwVisibility = { pwVisibilityOn: false };
// let pwVisibilityOn = false;
// let confirmPwVisibilityOn = false;
// test test
// test@test.de
// pw: tEst1!

// work in progress
async function init() {
    users = await loadUsersFromBackend('users');
    console.log(users)
    // await setItem("users", JSON.stringify({}));
    addPasswordVisibilityListener('login-pw-border-id', 
                                'lock-id', 
                                'login-pw-visibility-off-id',
                                'login-pw-visibility-id',
                                pwVisibility);
}

async function loadUsersFromBackend(key) {
    try {
        const result = await getItem(key);
        return JSON.parse(result) || [];
    } catch (e) {
        console.error('Loading error:', e);
        return [];
    }
}

function register() {     
        
    if (!(registerValidationCheck() && ppCheckboxConfirmed))
        return;
    addNewUser();
    toggleSuccessesMsg();
    closeSignUp();
}

async function addNewUser() {
    const newUser = generateNewUserObject();
    newUserArray.push(newUser); 
    await addNewUserToBackend(newUser);
    try {
        await addNewUserToBackend(newUser);

    } catch (error) {
        handleError(error);
    }
}


function generateNewUserObject() {
    const userName = document.getElementById("add-name-id").value;
    const userEMail = document.getElementById("add-email-id").value;
    const userPassword = document.getElementById("add-pw-id").value;
    const userPasswordConfirm = document.getElementById("add-confirm-pw-id").value;
    return {
        'userName': userName,
        'userEMail': userEMail,
        'userPassword': userPassword,
        'userPasswordConfirm': userPasswordConfirm,
        'contacts': [],
        'tasks': {
            'title': '',
            'description': '',
            'assignedTo': [],
            'pro': '',
            'category': '',
            'subtasks': []
        }
    };
}


async function addNewUserToBackend(user) {
    let existingUsers = await loadUsersFromBackend('users');
    existingUsers[user.userEMail] = user;
    await setItem('users', JSON.stringify(existingUsers));
    users = await loadUsersFromBackend('users');
}


function validateName(name, boolArr) {
    const specialCharRegex  = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/0123456789]/;
    const checkForDoubleHyphen = name.split("-").length - 1;
    if (name.trim() === "") 
        boolArr[0] = boolArr[10] = true;
    else if (specialCharRegex.test(name)) 
        boolArr[2] = boolArr[10] = true;
    else if (name.length < 2 && checkForDoubleHyphen === 0) 
        boolArr[1] = boolArr[10] = true;
    else if (checkForDoubleHyphen !== 0 && (!name.match(/[a-zA-Z]-[a-zA-Z]{2,}/) || name.indexOf('-') < 2 || name.split('-').pop() === '')) 
        boolArr[1] = boolArr[10] = true;
}


function validateRegisterEmail(email, boolArr) {
    if (email.trim() === "") 
        boolArr[3] = boolArr[11] = true;
    else if (!email.includes('@') || email.indexOf('@') === 0 || email.split('@').pop() === '') 
        boolArr[4] = boolArr[11] = true;
    else if (email in users) 
        boolArr[5] = boolArr[11] = true;
}


function validatePassword(password, boolArr) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/.test(password);
    const hasDigit = /[0123456789]/.test(password);
    if (password.trim() === "") 
        boolArr[6] = boolArr[12] = true;
    else if (!hasUpperCase || !hasSpecialChar || !hasDigit || password.length < 6 )  
        boolArr[7] = boolArr[12] = true;
}


function validateConfirmPassword(password, confirmPassword, boolArr) {
    if (confirmPassword.trim() === "") 
        boolArr[8] = boolArr[13] = true;
    else if (password !== confirmPassword  )  
        boolArr[9] = boolArr[13] = true;
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
    toggleVisibility('existing-add-email-id', boolArr[5]);
    toggleVisibility('empty-add-pw-id', boolArr[6]);
    toggleVisibility('invalid-add-pw-id', boolArr[7]);
    toggleVisibility('empty-confirm-pw-id', boolArr[8]);
    toggleVisibility('invalid-confirm-pw-id', boolArr[9]);
    toggleVisibility('add-name-border-id', !boolArr[10],'error-border')
    toggleVisibility('add-email-border-id', !boolArr[11],'error-border')
    toggleVisibility('add-pw-border-id', !boolArr[12],'error-border')
    toggleVisibility('add-confirm-pw-border-id', !boolArr[13],'error-border')
    return !boolArr.some(Boolean);
}


function registerValidationCheck() {
    const name = document.getElementById("add-name-id").value;
    const email = document.getElementById("add-email-id").value;
    const password = document.getElementById("add-pw-id").value;
    const confirmPassword = document.getElementById("add-confirm-pw-id").value;
    const checkBox = document.getElementById('privacy-check-id');
    const boolArr = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    validateName(name, boolArr);
    validateRegisterEmail(email, boolArr);
    validatePassword(password, boolArr);
    validateConfirmPassword(password, confirmPassword, boolArr);
    validateCheckBoxClicked(checkBox);
    return handlerFieldValidationRegister(boolArr);
}


function toggleSuccessesMsg() {
    const successMsg =  document.getElementById('success-msg-id');
    successMsg.classList.toggle('d-none')
    window.setTimeout(() => {
        successMsg.classList.toggle('d-none');
    }, 800);
}


function resetRegisterInputs() {
    const boolArr = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];
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


function signUp() {
    pwVisibility.pwVisibilityOn = false;
    resetLoginInputs();
    toggleVisibility('sign-up-popup-id', true);
    toggleVisibility('signup-container-id', false);
    toggleVisibility('login-id', false);
    let signUpPopupElement = document.getElementById('sign-up-popup-id');
    signUpPopupElement.innerHTML += templateSignUpPopup();
    addPasswordVisibilityListener('add-pw-border-id',
                                'register-lock-id', 
                                'register-pw-visibility-off-id',
                                'register-pw-visibility-id',
                                pwVisibility);
    addPasswordVisibilityListener('add-confirm-pw-border-id', 
                                'register-confirm-lock-id',
                                'register-confirm-pw-visibility-off-id',
                                'register-confirm-pw-visibility-id',
                                confirmPwVisibility);
}



function closeSignUp() {
    document.getElementById('login-user-password-id').type = 'password';
    pwVisibility.pwVisibilityOn = false;
    confirmPwVisibility.pwVisibilityOn = false;
    toggleVisibility('lock-id', true);
    toggleVisibility('login-pw-visibility-off-id', false);
    toggleVisibility('login-pw-visibility-id', false);
    toggleVisibility('sign-up-popup-id', false);
    toggleVisibility('signup-container-id', true);
    toggleVisibility('login-id', true);
    document.getElementById('sign-up-popup-id').innerHTML = "";
    ppCheckboxConfirmed = false;
}


async function login() {
    if (loginValidationCheck()) {
        const loggedInUser = loadCurrentUser();
        if (loggedInUser) {
            localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
            await setItem("currentUser", JSON.stringify(loggedInUser)); //   für mich Philipp zum testen
            console.log('Logged in user:', loggedInUser);
            window.location.assign("../summary.html");
           
        } else {
            console.error('Error: Unable to log in user.');
        }
    }
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
        else if (validateLoginEmail(loginUserEmail) && !(loginUserEmail in users) ) 
            boolArr[2] = boolArr[5] = true; 
        else if (users[loginUserEmail].userPassword !== loginUserPassword) 
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


function toggleCheckbox(event) {
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


function addPasswordVisibilityListener(elementId, lockImgId, visibilityOffImg, visibilityOnImg, visibilityObj) {
    const inputElement = document.getElementById(elementId);
    inputElement.addEventListener("input", function(event) {
        const passwordNotEmpty = isPasswordNotEmpty(event.target.value);
        toggleVisibility(lockImgId, !passwordNotEmpty);
        toggleVisibility(visibilityOffImg, passwordNotEmpty && !visibilityObj.pwVisibilityOn);
        toggleVisibility(visibilityOnImg, passwordNotEmpty && visibilityObj.pwVisibilityOn);
        if (!passwordNotEmpty) 
            visibilityObj.pwVisibilityOn = false;
    });
}


function isPasswordNotEmpty(passwordInput) {
    return passwordInput.trim().length !== 0;
}


function showImage(lockImage, src) {
    lockImage.src = src;
}


function togglePasswordVisibility(event, ImgId, whichform, value) {
    let visibilityOn, inputType;
    if ((whichform === 'password' || whichform === 'registerPw') && value === 1) 
        visibilityOn = true;
    else if ((whichform === 'password' || whichform === 'registerPw') && value === -1) 
        visibilityOn = false;
    else if (whichform === 'confirmPw' && value === 1) 
        visibilityOn = true;
    else if (whichform === 'confirmPw' && value === -1) 
        visibilityOn = false;
    toggleVisibility(event.target.id, false);
    toggleVisibility(ImgId, true);
    inputType = visibilityOn ? 'text' : 'password';
    updatePasswordInput(whichform, inputType);
}


function updatePasswordInput(whichform, inputType) {
    const passwordInput = getPasswordInput(whichform);
    passwordInput.type = inputType;
}


function getPasswordInput(whichform) {
    const formMap = {
        'password': 'login-user-password-id',
        'registerPw': 'add-pw-id',
        'confirmPw': 'add-confirm-pw-id'
    };
    const elementId = formMap[whichform];
    return document.getElementById(elementId);
}


function loadCurrentUser() {
    const loginUserEmail = document.getElementById("login-user-e-mail-id").value;
    const loginUserPassword = document.getElementById("login-user-password-id").value;
    if (loginUserEmail in users) {
        const user = users[loginUserEmail];
        if (user.userPassword === loginUserPassword) {
            return user;
        } else {
            console.error("Error: Incorrect password.");
            return null;
        }
    } else {
        console.error("Error: User not found.");
        return null;
    }
}