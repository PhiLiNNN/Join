let currentUser;



function contactsInit() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser)
}


function addNewContact() {
    const elememt = document.getElementById('ad-overlay-id');
    elememt.classList.remove('d-none');
    elememt.innerHTML = templateAddContactHTML();
}

function closeAddNewContact() {
    const elememt = document.getElementById('ad-overlay-id');
    elememt.classList.add('d-none');
}