let currentUser;



function contactsInit() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser)
}


function addNewContact() {
    document.body.style.overflow = 'hidden';
    const element = document.getElementById('ad-overlay-id');
    element.innerHTML = templateAddContactHTML();
    toggleVisibility('ad-overlay-id', true);
    setTimeout(() => {  toggleVisibility('card-content-id', false,  'card-visible');
     }, 30);
}

function closeAddNewContact() {
    toggleVisibility('card-content-id', true,  'card-visible');
    setTimeout(() => {
        toggleVisibility('ad-overlay-id', false);
        document.body.style.overflow = 'auto';
    }, 300); 
    
}