// Form elements
const form = document.querySelector('form');
const input = document.querySelector('input');
const submitButton = document.querySelector('#submit-button');
const errorMessage = document.querySelector('.error-message');

// taskboard elements
const tasklist = document.querySelector('#tasklist');
const clearAll = document.querySelector('#clear-all');

function init() {
    submitButton.addEventListener('click', addTask);
    clearAll.addEventListener('click', clearTasklist);
}

// Update reference for checkboxes and delete icons
function update() {
    checkmarkTask();
    removeTask();
    editTask();
}

// Checkmark task
function checkmarkTask() {
    let checkbox = document.querySelectorAll('.taskCheckbox');

    checkbox.forEach((element) => {
        element.addEventListener('click', () => {
            if (element.checked) {
                element.nextElementSibling.classList.add('completed');
            } else {
                element.nextElementSibling.classList.remove('completed');
            }
            saveTask();
        });
    });
}

// Remove single task
function removeTask() {
    let deleteIcon = document.querySelectorAll('.delete_icon');
    
    deleteIcon.forEach((element) => {
        element.addEventListener('click', () => {
            element.parentElement.remove();
            saveTask();
        });
    });
}

// Edit a task
// Note: take a look at Lightbox.js
let taskToChange;

function editTask() {
    let label = document.querySelectorAll('.task_label');

    label.forEach((element) => {
        element.addEventListener('click', () => {
            openLightbox();
            lightboxInput.value = element.textContent;
            taskToChange = element;
        }
    )})
}

// Remove multiple whitespaces and special characters
let sanitizedText;

function sanitizer(element) {
    let inputText = element.value.replace(/^\s+|\s+$/g, ''); // remove multiple whitespaces
    sanitizedText = inputText.replace(/[^\w\s]/gi, ''); // remove all special chars
}

// Create a new task
function addTask() {
    event.preventDefault();
    sanitizer(input);

    if (sanitizedText) {
        let task = document.createElement('li');
        task.className = 'task';
        task.innerHTML = `<input type="checkbox" class="taskCheckbox">
                          <label class="task_label">${sanitizedText}</label>
                          <span class="delete_icon">
                            <i class="delete far fa-times-circle"></i>
                          </span>`;
        tasklist.appendChild(task);
        input.value = '';
        errorMessage.classList.remove('visible');
    } else {
        errorMessage.classList.add('visible');
    }

    update();
    saveTask();
}

// Save a task when added
let savedTasks;

function saveTask() {
    localStorage.setItem('savedTasks', tasklist.innerHTML);
}

// Load tasks
function loadSavedTasks() {
    savedTasks = localStorage.getItem('savedTasks');

    if (savedTasks) {
        tasklist.innerHTML = savedTasks;
        let label = document.querySelectorAll('.task_label');

        // Set checkbox status
        label.forEach((element) => {
            if (element.classList.contains('completed')) {
                element.previousElementSibling.checked = true;
            } else {
                element.previousElementSibling.checked = false;
            }
            
            saveTask();
        });
    }
}

// Clear all tasks
function clearTasklist(tasks) {
    tasks = document.querySelectorAll('.task');

    for (task of tasks) {
        task.remove();
    }
    
    if (tasks) {
        tasks = localStorage.removeItem('savedTasks');
    }

    errorMessage.classList.remove('visible');
    input.focus();
}

init();
loadSavedTasks();
update();
