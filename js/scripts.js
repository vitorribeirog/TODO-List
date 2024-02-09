const input = document.getElementById('task-input')
const button = document.getElementById('btn-add-task')
const allList = document.getElementById('tasks')


let taskList = []


// Pega o valor do input e guarda em uma lista
function addNewTask() {
    if (input.value) {
        taskList.push({
            name: input.value,
            completed: false
        })
    }

    input.value = ''

    showTask()
}

// Pega a lista e monta um html para exibir na tela
function showTask() {
    let newLi = ''

    taskList.forEach((task, i) => {
        newLi = newLi + `

            <li class="task ${task.completed && "done"}">
                <img id="checked" src="./img/ckd.png" alt="confirm" onclick="taskCompleted(${i})">
                <p>${task.name}<p>
                <img id="trash" src="./img/tsh.png" alt="delete-item" onclick="removeTask(${i})">
            </li>
    
        `
    })

    allList.innerHTML = newLi

    localStorage.setItem('tasks', JSON.stringify(taskList))
}

// Remove uma tarefa da lista
function removeTask(i) {
    taskList.splice(i, 1)
    localStorage.removeItem('tasks')
    showTask()
}

// Marca a tarefa como concluida
function taskCompleted(i) {
    taskList[i].completed = !taskList[i].completed
    showTask()
}

// Busca no localStorage as tarefas salvas e recarrega a tela reexibindo elas
function reloadTask() {
    const taskLocalStorage = localStorage.getItem('tasks')

    if (taskLocalStorage) {
        taskList = JSON.parse(taskLocalStorage)
    }

    showTask()
}

reloadTask()
button.addEventListener('click', addNewTask)