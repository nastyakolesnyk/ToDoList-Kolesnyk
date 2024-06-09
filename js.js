document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const deadlineInput = document.getElementById('deadline-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        const deadlineText = deadlineInput.value.trim();
        
        if (taskText) {
            addTask(taskText, deadlineText);
            taskInput.value = '';
            deadlineInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    });

    function addTask(task, deadline) {
        const taskItem = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task;

        const deadlineSpan = document.createElement('span');
        deadlineSpan.textContent = deadline ? new Date(deadline).toLocaleString() : '';

        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.classList.add('complete-checkbox');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        taskItem.append(taskSpan, deadlineSpan, completeCheckbox, editButton, deleteButton);
        taskList.appendChild(taskItem);

        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        editButton.addEventListener('click', () => {
            if (editButton.textContent === 'Edit') {
                taskSpan.innerHTML = `<input type="text" value="${taskSpan.textContent}">`;
                deadlineSpan.innerHTML = `<input type="datetime-local" value="${deadline}">`;
                editButton.textContent = 'Save';
                editButton.classList.add('save-button');
                editButton.classList.remove('edit-button');
            } else {
                const taskInput = taskSpan.querySelector('input');
                const deadlineInput = deadlineSpan.querySelector('input');
                taskSpan.textContent = taskInput.value;
                deadlineSpan.textContent = deadlineInput.value ? new Date(deadlineInput.value).toLocaleString() : '';
                editButton.textContent = 'Edit';
                editButton.classList.add('edit-button');
                editButton.classList.remove('save-button');
            }
        });

        completeCheckbox.addEventListener('change', () => {
            if (completeCheckbox.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
        });
    }
});
