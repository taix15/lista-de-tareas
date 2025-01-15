const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

let tasks = [];

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
        taskInput.value = ''; // Limpiar el input
    }
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('flex', 'items-center', 'justify-between', 'p-2', 'border', 'rounded');

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.completed) {
          taskText.classList.add('line-through'); 
      }
      
        li.appendChild(taskText);

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('flex', 'items-center', 'space-x-2');

        // Botón para marcar como completada
        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✓';
        completeBtn.classList.add('px-2', 'py-1', 'bg-green-500', 'text-white', 'rounded', 'hover:bg-green-600');
        completeBtn.addEventListener('click', () => toggleComplete(index));
        actionsDiv.appendChild(completeBtn);

        // Botón para borrar tarea
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✗';
        deleteBtn.classList.add('px-2', 'py-1', 'bg-red-500', 'text-white', 'rounded', 'hover:bg-red-600');
        deleteBtn.addEventListener('click', () => deleteTask(index));
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    });

    updateTaskCount();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function updateTaskCount() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    taskCount.textContent = `Tareas: ${totalTasks} | Completadas: ${completedTasks}`;
}
