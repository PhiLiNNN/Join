let currentUser;



function contactsInit() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser)
}


function addNewContact() {
    document.body.style.overflow = 'hidden';
    const element = document.getElementById('ad-overlay-id');
    element.classList.remove('d-none');
    element.innerHTML = templateAddContactHTML();
    setTimeout(() => {
        const cardContent = document.getElementById('card-content-id');
        cardContent.classList.add('card-visible');
     }, 30);
}

function closeAddNewContact() {
    const element = document.getElementById('ad-overlay-id');
    const cardContent = document.getElementById('card-content-id');
    cardContent.classList.remove('card-visible');
    setTimeout(() => {
        element.classList.add('d-none');
        document.body.style.overflow = 'auto';
    }, 300); 
    
}