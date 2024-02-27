function button() {
    const currentUser = requestToBackend() ;
    console.log('currentuser', currentUser)
}


async function requestToBackend() {
    try {
        const result = await getItem('currentUser');
        return JSON.parse(result) || [];
    } catch (e) {
        console.error('Loading error:', e);
        return [];
    }
}