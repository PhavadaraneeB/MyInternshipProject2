document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Initialize tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to display tasks
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${task}
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // Add a new task
    addTaskButton.addEventListener('click', function() {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
            taskInput.value = '';
        }
    });

    // Edit and Delete tasks
    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const updatedTask = prompt('Edit task:', tasks[index]);
            if (updatedTask !== null) {
                tasks[index] = updatedTask;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                displayTasks();
            }
        } else if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        }
    });

    // Initial task display
    displayTasks();
});
