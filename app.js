document.addEventListener("DOMContentLoaded", () => {
    // Load tasks from local storage
    loadTasks();

    // Add event listener to input for pressing Enter key
    document.getElementById("new-task").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

function addTask() {
    const input = document.getElementById("new-task");
    const taskText = input.value.trim();

    if (taskText !== "") {
        // Create task element
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        
        // Create task text element
        const taskTextElement = document.createElement("span");
        taskTextElement.innerText = taskText;
        taskElement.appendChild(taskTextElement);

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(taskElement));
        taskElement.appendChild(deleteButton);

        // Create complete button
        const completeButton = document.createElement("button");
        completeButton.innerText = "Complete";
        completeButton.addEventListener("click", () => toggleCompleted(taskTextElement));
        taskElement.appendChild(completeButton);

        // Append task element to task-list
        document.getElementById("task-list").appendChild(taskElement);

        // Save tasks to local storage
        saveTasks();

        // Clear input field
        input.value = "";
    }
}

function deleteTask(taskElement) {
    taskElement.remove();
    saveTasks();
}

function toggleCompleted(taskTextElement) {
    taskTextElement.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    const taskElements = document.querySelectorAll(".task");

    taskElements.forEach(taskElement => {
        const taskTextElement = taskElement.querySelector("span");
        const isCompleted = taskTextElement.classList.contains("completed");
        tasks.push({ text: taskTextElement.innerText, completed: isCompleted });
    });

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskTextElement = document.createElement("span");
        taskTextElement.innerText = task.text;
        if (task.completed) {
            taskTextElement.classList.add("completed");
        }

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(taskElement));

        const completeButton = document.createElement("button");
        completeButton.innerText = "Complete";
        completeButton.addEventListener("click", () => toggleCompleted(taskTextElement));

        taskElement.appendChild(taskTextElement);
        taskElement.appendChild(deleteButton);
        taskElement.appendChild(completeButton);

        document.getElementById("task-list").appendChild(taskElement);
    });
}
