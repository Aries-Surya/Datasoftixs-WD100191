document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");

    // Load tasks from local storage
    loadTasks();

    // Add task event
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = "";
        }
    });

    // Toggle dark mode event
    toggleDarkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Function to add a task
    function addTask(taskText) {
        const taskItem = document.createElement("div");
        taskItem.className = "task";
        taskItem.draggable = true;
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button>Delete</button>
        `;
        taskList.appendChild(taskItem);

        // Save task to local storage
        saveTask(taskText);

        // Add delete event
        taskItem.querySelector("button").addEventListener("click", () => {
            taskItem.remove();
            removeTask(taskText);
        });

        // Add drag-and-drop events
        addDragAndDropEvents(taskItem);
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(taskText => addTask(taskText));
    }

    // Function to save task to local storage
    function saveTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to remove task from local storage
    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to add drag-and-drop events
    function addDragAndDropEvents(taskItem) {
        taskItem.addEventListener('dragstart', () => {
            taskItem.classList.add('dragging');
        });

        taskItem.addEventListener('dragend', () => {
            taskItem.classList.remove('dragging');
            saveTaskOrder();
        });

        taskList.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = getDragAfterElement(taskList, e.clientY);
            const draggingElement = document.querySelector('.dragging');
            if (afterElement == null) {
                taskList.appendChild(draggingElement);
            } else {
                taskList.insertBefore(draggingElement, afterElement);
            }
        });
    }

    // Function to get the element after which the dragged element should be placed
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Function to save the order of tasks to local storage
    function saveTaskOrder() {
        const tasks = [...taskList.querySelectorAll('.task span')].map(span => span.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});