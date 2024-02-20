
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
