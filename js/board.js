

let tasks = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'toDo'
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'todo'
}];

let currentDraggedElement;

function updateHTML() {
    let toDo = tasks.filter(t => t['category'] == 'toDo');

    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        const element = toDo[index];
        document.getElementById('toDo').innerHTML += generateTaskHTML(element);
    }

    let  = tasks.filter(t => t['category'] == 'inProgres');

    document.getElementById('inProgres').innerHTML = '';

    for (let index = 0; index < inProgres.length; index++) {
        const element = inProgres[index];
        document.getElementById('inProgres').innerHTML += generateTaskHTML(element);
    }

    let  = tasks.filter(t => t['category'] == 'awaitFeedback');

    document.getElementById('awaitFeedback').innerHTML = '';

    for (let index = 0; index < awaitFeedback.length; index++) {
        const element = awaitFeedback[index];
        document.getElementById('awaitFeedback').innerHTML += generateTaskHTML(element);
    }

    let  = tasks.filter(t => t['category'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTaskHTML(element);
    }

}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTaskHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="task">${element['title']}</div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks [currentDraggedElement]['category'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}