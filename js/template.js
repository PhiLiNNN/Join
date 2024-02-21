function templateSignUpPopup() {
    return /*html*/`
        <div class="sign-up-popup">
            <form class="sign-up-form-style" onsubmit="addUser(); return false ">
                <button onclick="closeSignUp()">X</button>
                <h1>Sign Up</h1>
                <input type="text" name="addUserName" id="add-user-name-id" placeholder="Name" required minlength="2">
                <input type="email" name="addUserEMail" id="add-user-e-mail-id" placeholder="E Mail" required minlength="2">
                <input type="password" name="addUserPassword" id="add-user-password-id" placeholder="Password" required minlength="2">
                <input type="password" name="addUserPasswordConfirmation" id="add-user-password-confirmation-id" placeholder="Password confirmation" required minlength="2">
                <div class="accept-policy-box" onclick="validateCheckBoxClicked()">
                    <input  id="privacy-check-id" type="checkbox" name="acceptPolicy" value="acceptPolicy"/>
                    <span class="accept-policy ">I accept the Privacy policy</span>
                    <div id="privacy-error-message-id" class="error-message-register-checkbox d-none">Please accept the Privacy policy to proceed with registration.</div>
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    `;
}