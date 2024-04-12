// Initialize variables
const taskList = document.getElementById('task-list'); // Reference to the task list element in the html 
const newTaskInput = document.getElementById('new-task'); // Reference to the input field for new tasks in html
const addTaskButton = document.getElementById('add-task'); // Reference to the button to add tasks in the html
const successMessage = document.getElementById('success-message'); // Reference to the success message element in the html

let tasks = []; // Array to store  all the tasks that auser puts

// Load tasks from local storage (if available)
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks'); // Retrieve tasks from local storage
    if (storedTasks) { // If tasks are found in local storage
        tasks = JSON.parse(storedTasks); // Parse JSON string to array
        renderTasks(); // Render tasks on the page
    }
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert tasks array to JSON string and store in local storage
}

// Render tasks in the list
function renderTasks() {
    taskList.innerHTML = ''; // Clear the task list
    tasks.forEach((task) => { // Loop through each task
        // Create list item for each task
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');

        // Create checkbox for task completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed; // Set checkbox state based on task completion status
        checkbox.addEventListener('change', () => { // Add event listener for checkbox change
            // Toggle task completion status
            task.completed = !task.completed;
            // Save tasks to local storage and re-render
            saveTasks();
            renderTasks();
        });

        // Create span for task text
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text; // Set task text content

        // Create actions container for edit and delete buttons
        const actions = document.createElement('div');
        actions.classList.add('actions');

        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => { // Add event listener for edit button click
            // Prompt user to edit task text
            const newText = prompt('Edit task:', task.text);
            if (newText) { // If new text is provided
                // Update task text, save tasks, and re-render
                task.text = newText;
                saveTasks();
                renderTasks();
            }
        });

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => { // Add event listener for delete button click
            // Confirm task deletion
            if (confirm('Are you sure you want to delete this task?')) {
                // Remove task from array, save tasks, and re-render
                const taskIndex = tasks.indexOf(task);
                tasks.splice(taskIndex, 1);
                saveTasks();
                renderTasks();
                // Display success message and hide after 2 seconds
                successMessage.textContent = 'Task deleted successfully!';
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 2000);
            }
        });

        // Append buttons to actions container
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        // Append checkbox, task text, and actions to list item
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(actions);

        // Add completed class to completed tasks
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Append list item to task list
        taskList.appendChild(listItem);
    });
}

// Add a new task
function addNewTask() {
    const newTaskText = newTaskInput.value.trim();
    if (newTaskText) { // If new task text is provided
        // Add new task to tasks array, save tasks, and re-render
        tasks.push({ text: newTaskText, completed: false });
        saveTasks();
        renderTasks();
        // Clear input field and display success message, hide after 2 seconds
        newTaskInput.value = '';
        successMessage.textContent = 'Task added successfully!';
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 2000);
    }
}

// Add event listener for adding new task
addTaskButton.addEventListener('click', addNewTask);

// Load tasks on page load
loadTasks();

