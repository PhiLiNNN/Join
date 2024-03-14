
function templateAddContactHTML() {
  return /*html*/ `
    <div id="ac-card-content-id" class="card-content">
        <div  class="card-header">
            <div class="header-content-wrapper">
                <img src="./assets/img/footer_logo.png" alt="">
                <h1>Add Contact</h1>
                <span>Tasks are better with a team!</span>
                <div class="ac-bottom-line"></div>
            </div>
            <div class="close-ac-card-mobile" onclick="closeAddNewContact()">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9998 8.36587L2.0998 13.2659C1.91647 13.4492 1.68314 13.5409 1.3998 13.5409C1.11647 13.5409 0.883138 13.4492 0.699805 13.2659C0.516471 13.0825 0.424805 12.8492 0.424805 12.5659C0.424805 12.2825 0.516471 12.0492 0.699805 11.8659L5.5998 6.96587L0.699805 2.06587C0.516471 1.88254 0.424805 1.6492 0.424805 1.36587C0.424805 1.08254 0.516471 0.849202 0.699805 0.665869C0.883138 0.482536 1.11647 0.390869 1.3998 0.390869C1.68314 0.390869 1.91647 0.482536 2.0998 0.665869L6.9998 5.56587L11.8998 0.665869C12.0831 0.482536 12.3165 0.390869 12.5998 0.390869C12.8831 0.390869 13.1165 0.482536 13.2998 0.665869C13.4831 0.849202 13.5748 1.08254 13.5748 1.36587C13.5748 1.6492 13.4831 1.88254 13.2998 2.06587L8.3998 6.96587L13.2998 11.8659C13.4831 12.0492 13.5748 12.2825 13.5748 12.5659C13.5748 12.8492 13.4831 13.0825 13.2998 13.2659C13.1165 13.4492 12.8831 13.5409 12.5998 13.5409C12.3165 13.5409 12.0831 13.4492 11.8998 13.2659L6.9998 8.36587Z" fill="white"/>
                </svg>
            </div>
            <div class="ac-card-circle-mobile">
                <img src="./assets/img/person_white.png" alt="">
            </div>
        </div>
        <div class="card-footer">
            <div class="close-ac-card-desktop"  onclick="closeAddNewContact()">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9998 8.36587L2.0998 13.2659C1.91647 13.4492 1.68314 13.5409 1.3998 13.5409C1.11647 13.5409 0.883138 13.4492 0.699805 13.2659C0.516471 13.0825 0.424805 12.8492 0.424805 12.5659C0.424805 12.2825 0.516471 12.0492 0.699805 11.8659L5.5998 6.96587L0.699805 2.06587C0.516471 1.88254 0.424805 1.6492 0.424805 1.36587C0.424805 1.08254 0.516471 0.849202 0.699805 0.665869C0.883138 0.482536 1.11647 0.390869 1.3998 0.390869C1.68314 0.390869 1.91647 0.482536 2.0998 0.665869L6.9998 5.56587L11.8998 0.665869C12.0831 0.482536 12.3165 0.390869 12.5998 0.390869C12.8831 0.390869 13.1165 0.482536 13.2998 0.665869C13.4831 0.849202 13.5748 1.08254 13.5748 1.36587C13.5748 1.6492 13.4831 1.88254 13.2998 2.06587L8.3998 6.96587L13.2998 11.8659C13.4831 12.0492 13.5748 12.2825 13.5748 12.5659C13.5748 12.8492 13.4831 13.0825 13.2998 13.2659C13.1165 13.4492 12.8831 13.5409 12.5998 13.5409C12.3165 13.5409 12.0831 13.4492 11.8998 13.2659L6.9998 8.36587Z" fill="white"/>
                </svg>
            </div>
            <div class="footer-grid">
                <div class="ac-card-circle-wrapper">
                    <div class="ac-card-circle-desktop">
                        <img src="./assets/img/person_white.png" alt="">
                    </div>
                </div>
                <div class="footer-right">
                    <div class="card-inputs">
                        <div id="ac-name-border-id" class="input_global input_ac cursor">
                            <input id="ac-name-input-id"  type="text" placeholder="Name" autocomplete="on">
                            <img src="./assets/img/person.png" alt="">
                        </div> 
                        <div id="ac-mail-border-id" class="input_global input_ac cursor">
                        <input id="ac-mail-input-id"  type="text" placeholder="Email" autocomplete="on">
                            <img src="./assets/img/mail.png" alt="">
                        </div> 
                        <div id="ac-phone-border-id" class="input_global input_ac cursor">
                        <input id="ac-phone-input-id"  type="tel" placeholder="Phone" autocomplete="on">
                            <img src="./assets/img/call.png" alt="">
                        </div> 
                    </div>
                    
                    <div class="ac-btn-container">
                        <input id="ac-color-input-id"  class="color-style"  type="color" value="#43da86" />
                        <button class="ac-btn-white" onclick="closeAddNewContact()">
                            <span>Cancel</span>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button> 
                        <button class="ac-btn-fill" onclick="addNewContact(event)"> 
                            <span>Create contact</span>
                            <img src="./assets/img/check.png" alt="">
                        </button> 
                    </div>
                </div>
            </div>
      </div>
  `;
}

function templateCreateLettersHTML(letter) {
  return /*html*/ `
    <div class="letter-style"> ${letter}</div>
    <div id="letter-${letter}-id" class="contacts-container"></div>
  `;
}

function templateCreateContactsHTML(name, email, phone, bgColor, txtColor, initials, index) {
  return /*html*/ `
    <div  id="contact-${index}-id" class="contact-style" onclick="openContact('${name}','${email}',
                                                                                '${phone}','${index}','${bgColor}',
                                                                                '${txtColor}','${initials}')">
        <div class="contact-circle" style="background-color: ${bgColor}; color: ${txtColor};">${initials}</div>
        <div class="contact-content">
            <span>${name}</span>
            <span>${email}</span>
        </div>
    </div>
  `;
}

function templateEditContactHTML(initials, name, email, phone, bgColor, txtColor ) {
 return /*html*/ `
    <div id="edit-card-content-id" class="card-content">
        <div  class="card-header">
            <div class="header-content-wrapper">
                <img src="./assets/img/footer_logo.png" alt="">
                <h1>Edit Contact</h1>
                <span>Tasks are better with a team!</span>
                <div class="ac-bottom-line"></div>
            </div>
            <div class="close-ac-card-mobile" onclick="closeAddNewContact()">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9998 8.36587L2.0998 13.2659C1.91647 13.4492 1.68314 13.5409 1.3998 13.5409C1.11647 13.5409 0.883138 13.4492 0.699805 13.2659C0.516471 13.0825 0.424805 12.8492 0.424805 12.5659C0.424805 12.2825 0.516471 12.0492 0.699805 11.8659L5.5998 6.96587L0.699805 2.06587C0.516471 1.88254 0.424805 1.6492 0.424805 1.36587C0.424805 1.08254 0.516471 0.849202 0.699805 0.665869C0.883138 0.482536 1.11647 0.390869 1.3998 0.390869C1.68314 0.390869 1.91647 0.482536 2.0998 0.665869L6.9998 5.56587L11.8998 0.665869C12.0831 0.482536 12.3165 0.390869 12.5998 0.390869C12.8831 0.390869 13.1165 0.482536 13.2998 0.665869C13.4831 0.849202 13.5748 1.08254 13.5748 1.36587C13.5748 1.6492 13.4831 1.88254 13.2998 2.06587L8.3998 6.96587L13.2998 11.8659C13.4831 12.0492 13.5748 12.2825 13.5748 12.5659C13.5748 12.8492 13.4831 13.0825 13.2998 13.2659C13.1165 13.4492 12.8831 13.5409 12.5998 13.5409C12.3165 13.5409 12.0831 13.4492 11.8998 13.2659L6.9998 8.36587Z" fill="white"/>
                </svg>
            </div>
            <div class="ac-card-circle-mobile" style="background-color: ${bgColor}; color: ${txtColor}">
                ${initials}
            </div>
        </div>
        <div class="card-footer">
            <div class="close-ac-card-desktop"  onclick="closeAddNewContact()">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9998 8.36587L2.0998 13.2659C1.91647 13.4492 1.68314 13.5409 1.3998 13.5409C1.11647 13.5409 0.883138 13.4492 0.699805 13.2659C0.516471 13.0825 0.424805 12.8492 0.424805 12.5659C0.424805 12.2825 0.516471 12.0492 0.699805 11.8659L5.5998 6.96587L0.699805 2.06587C0.516471 1.88254 0.424805 1.6492 0.424805 1.36587C0.424805 1.08254 0.516471 0.849202 0.699805 0.665869C0.883138 0.482536 1.11647 0.390869 1.3998 0.390869C1.68314 0.390869 1.91647 0.482536 2.0998 0.665869L6.9998 5.56587L11.8998 0.665869C12.0831 0.482536 12.3165 0.390869 12.5998 0.390869C12.8831 0.390869 13.1165 0.482536 13.2998 0.665869C13.4831 0.849202 13.5748 1.08254 13.5748 1.36587C13.5748 1.6492 13.4831 1.88254 13.2998 2.06587L8.3998 6.96587L13.2998 11.8659C13.4831 12.0492 13.5748 12.2825 13.5748 12.5659C13.5748 12.8492 13.4831 13.0825 13.2998 13.2659C13.1165 13.4492 12.8831 13.5409 12.5998 13.5409C12.3165 13.5409 12.0831 13.4492 11.8998 13.2659L6.9998 8.36587Z" fill="white"/>
                </svg>
            </div>
            <div class="footer-grid">
                <div class="ac-card-circle-wrapper">
                    <div class="ac-card-circle-desktop" style="background-color: ${bgColor}; color: ${txtColor}">
                        ${initials}
                    </div>
                </div>
                <div class="footer-right">
                    <div class="card-inputs">
                        <div id="ac-name-border-id" class="input_global input_ac cursor">
                            <input id="ac-name-input-id"  type="text" placeholder="Name" autocomplete="on" value="${name}">
                            <img src="./assets/img/person.png" alt="">
                        </div> 
                        <div id="ac-mail-border-id" class="input_global input_ac cursor">
                        <input id="ac-mail-input-id"  type="text" placeholder="Email" autocomplete="on"  value="${email}">
                            <img src="./assets/img/mail.png" alt="">
                        </div> 
                        <div id="ac-phone-border-id" class="input_global input_ac cursor">
                        <input id="ac-phone-input-id"  type="tel" placeholder="Phone" autocomplete="on"  value="${phone}">
                            <img src="./assets/img/call.png" alt="">
                        </div> 
                    </div>
                    
                    <div class="ac-btn-container">
                        <input id="ac-color-input-id"  class="color-style"  type="color" value="#43da86" />
                        <button class="ac-btn-white" onclick="closeAddNewContact()">
                            <span>Cancel</span>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button> 
                        <button class="ac-btn-fill" onclick="addNewContact()"> 
                            <span>Create contact</span>
                            <img src="./assets/img/check.png" alt="">
                        </button> 
                    </div>
                </div>
            </div>
      </div>
  `;
}


function templateShowContact(name, email, phone, index, bgColor, txtColor, initials) {
 return /*html*/ `
    <div class="open-contacts-header">
        <div class="open-contacts-arrow" onclick="closeContact('${index}')">
          <svg width="25" height="24" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00972 9.88554H23.1871C24.0362 9.88554 24.7246 10.5739 24.7246 11.4231C24.7246 12.2722 24.0362 12.9606 23.1871 12.9606H6.00972L13.17 20.1209C13.7704 20.7213 13.7704 21.6946 13.17 22.295C12.5697 22.8954 11.5963 22.8954 10.996 22.295L1.53824 12.8373C0.757188 12.0562 0.757188 10.7899 1.53824 10.0089L10.996 0.55115C11.5963 -0.0492049 12.5697 -0.0492048 13.17 0.55115C13.7704 1.1515 13.7704 2.12487 13.17 2.72523L6.00972 9.88554Z" fill="#29ABE2"/>
          </svg>
        </div>
          
        <h1>Contacts</h1>
        <span>Better with a team</span>
        <div class="horizontal-bar"></div>
      </div>
      <div class="open-contacts-name">
        <div class="open-contacts-circle" style="background-color: ${bgColor}; color: ${txtColor};">
          ${initials}
        </div>
        <span>${name}</span>
      </div>
      <div class="contact-info">
        <h2>Contact Information</h2>
        <div class="contact-method">
            <span>Email</span>
            <a href="mailto:${email}">${email}</a>
        </div>
        <div class="contact-method">
            <span>Phone</span>
            <span>${phone}</span>
        </div>
      </div>
    `;
}
