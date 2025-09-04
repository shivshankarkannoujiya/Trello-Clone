let draggedCard = null
let rightClickedCard = null
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage)

function addTask(colID) {
    const input = document.getElementById(`${colID}-input`)
    const taskText = input.value.trim()
    if (taskText === "") return;
    
    const taskDate = new Date().toLocaleString()
    console.log(taskDate)
    const taskElement = createTaskElement(
        taskText,
        taskDate,
        'div',
        'card',
        {
            draggable: true
        },
        {
            dragstart: dragStartHandler,
            dragend: dragEndHandler,
            contextmenu: function(event){
                event.preventDefault()
                rightClickedCard = this
                showUpdateMenu(event.pageX, event.pageY)
            },
        }
    ) 

    const tasksContainer = document.getElementById(`${colID}-tasks`)
    tasksContainer.appendChild(taskElement)
    updateTaskCount(colID)
    saveTaskToLocalStorage(colID, taskText, taskDate)
    input.value = ""
}

function editTask() {let draggedCard = null
let rightClickedCard = null
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage)

function addTask(colID) {
    const input = document.getElementById(`${colID}-input`)
    const taskText = input.value.trim()
    if (taskText === "") return;
    
    const taskDate = new Date().toLocaleString()
    console.log(taskDate)
    const taskElement = createTaskElement(
        taskText,
        taskDate,
        'div',
        'card',
        {
            draggable: true
        },
        {
            dragstart: dragStartHandler,
            dragend: dragEndHandler,
            contextmenu: function(event){
                event.preventDefault()
                rightClickedCard = this
                showUpdateMenu(event.pageX, event.pageY)
            },
        }
    ) 

    const tasksContainer = document.getElementById(`${colID}-tasks`)
    tasksContainer.appendChild(taskElement)
    updateTaskCount(colID)
    saveTaskToLocalStorage(colID, taskText, taskDate)
    input.value = ""
}

function editTask() {
    console.log(rightClickedCard)
    if (rightClickedCard !== null) {

        const contentElement = rightClickedCard.querySelector(".task-content")
         const dateElement = rightClickedCard.querySelector(".task-date") 
        if (!contentElement) return;

        const newTaskText = prompt(`Edit Task:`, contentElement.textContent)
        if (newTaskText !== null && newTaskText.trim() !== "") {
            contentElement.textContent = newTaskText
            if (dateElement) {
                dateElement.textContent = `Last edited: ${new Date().toLocaleString()}`
            }
        }
    }
}

function deleteTask() { 
    if (rightClickedCard !== null) {
        const parentColID = rightClickedCard.parentElement.id.replace("-tasks", "")
        rightClickedCard.remove()
        updateTaskCount(parentColID)
    }
}

function dragStartHandler() {
    this.classList.add("dragging")
    draggedCard = this;
}

function dragEndHandler() {
    this.classList.remove("dragging")
    draggedCard = null
}

function dragOverHandler(event) {
    event.preventDefault()
    const oldColID = draggedCard.parentElement.id.replace("-tasks", "")
    this.appendChild(draggedCard)
    const newColID = this.id.replace("-tasks", "")
    updateTaskCount(oldColID)
    updateTaskCount(newColID)
}

const columnTaskContainers = document.querySelectorAll(".column .tasks")
columnTaskContainers.forEach((colTaskContainer) => {
    colTaskContainer.addEventListener("dragover", dragOverHandler)
})


const updateMenu = document.querySelector(".update-menu")
function showUpdateMenu(mousePositionX, mousePositionY) {
    updateMenu.style.left = `${mousePositionX}px`
    updateMenu.style.top = `${mousePositionY}px`
    updateMenu.style.display = "block"
}

// Hide menu on click outside
document.addEventListener("click", () => {
    updateMenu.style.display = "none"
})


document.querySelectorAll(".column input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const colID = input.id.split("-")[0]
            addTask(colID)
        }
    } )
})


function updateTaskCount(colID) {
    const taskCount = document.querySelectorAll(`#${colID}-tasks .card`).length 
    document.getElementById(`${colID}-count`).textContent = taskCount
}


function saveTaskToLocalStorage(colID, taskText, taskDate) {
    const tasks = JSON.parse(localStorage.getItem(colID)) || []
    tasks.push({
        text: taskText,
        date: taskDate
    })

    localStorage.setItem(colID, JSON.stringify(tasks))
}
function loadTasksFromLocalStorage() {
    ["todo", "doing", "done"].forEach((colID) => {
        const tasks = JSON.parse(localStorage.getItem(colID)) || []
        tasks.forEach(({ text, date }) => {
            const taskElement = createTaskElement(text, date);
            document.getElementById(`${colID}-tasks`).append(taskElement)
        })
    })
}
function updateTaskToLocalStorage(){}

function createTaskElement(
    taskText,
    taskDate,
    tagName,
    classes = [],
    attributes = {},
    events = {}
) {
    const element = document.createElement(tagName)

    const taskContentElement = document.createElement("p")
    taskContentElement.textContent = taskText
    taskContentElement.classList.add("task-content")
    
    let dateElement = null
    if (taskDate) {
        dateElement = document.createElement("small")
        dateElement.textContent = taskDate
        dateElement.classList.add("task-date")
    }

    element.appendChild(taskContentElement)
    if(dateElement) element.appendChild(dateElement)

    if (Array.isArray(classes)) {
        element.classList.add(...classes)
    } else if(typeof classes === "string"){
        element.classList.add(classes)
    }

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value)
    }

    for (const [event, handler] of Object.entries(events)) {
        element.addEventListener(event, handler)
    }
 
    return element
}
    console.log(rightClickedCard)
    if (rightClickedCard !== null) {

        const contentElement = rightClickedCard.querySelector(".task-content")
         const dateElement = rightClickedCard.querySelector(".task-date") 
        if (!contentElement) return;

        const newTaskText = prompt(`Edit Task:`, contentElement.textContent)
        if (newTaskText !== null && newTaskText.trim() !== "") {
            contentElement.textContent = newTaskText
            if (dateElement) {
                dateElement.textContent = `Last edited: ${new Date().toLocaleString()}`
            }
        }
    }
}

function deleteTask() { 
    if (rightClickedCard !== null) {
        const parentColID = rightClickedCard.parentElement.id.replace("-tasks", "")
        rightClickedCard.remove()
        updateTaskCount(parentColID)
    }
}

function dragStartHandler() {
    this.classList.add("dragging")
    draggedCard = this;
}

function dragEndHandler() {
    this.classList.remove("dragging")
    draggedCard = null
}

function dragOverHandler(event) {
    event.preventDefault()
    const oldColID = draggedCard.parentElement.id.replace("-tasks", "")
    this.appendChild(draggedCard)
    const newColID = this.id.replace("-tasks", "")
    updateTaskCount(oldColID)
    updateTaskCount(newColID)
}

const columnTaskContainers = document.querySelectorAll(".column .tasks")
columnTaskContainers.forEach((colTaskContainer) => {
    colTaskContainer.addEventListener("dragover", dragOverHandler)
})


const updateMenu = document.querySelector(".update-menu")
function showUpdateMenu(mousePositionX, mousePositionY) {
    updateMenu.style.left = `${mousePositionX}px`
    updateMenu.style.top = `${mousePositionY}px`
    updateMenu.style.display = "block"
}

// Hide menu on click outside
document.addEventListener("click", () => {
    updateMenu.style.display = "none"
})


document.querySelectorAll(".column input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const colID = input.id.split("-")[0]
            addTask(colID)
        }
    } )
})


function updateTaskCount(colID) {
    const taskCount = document.querySelectorAll(`#${colID}-tasks .card`).length 
    document.getElementById(`${colID}-count`).textContent = taskCount
}


function saveTaskToLocalStorage(colID, taskText, taskDate) {
    const tasks = JSON.parse(localStorage.getItem(colID)) || []
    tasks.push({
        text: taskText,
        date: taskDate
    })

    localStorage.setItem(colID, JSON.stringify(tasks))
}

function loadTasksFromLocalStorage() {
    ["todo", "doing", "done"].forEach((colID) => {
        const tasks = JSON.parse(localStorage.getItem(colID)) || []
        tasks.forEach(({ text, date }) => {
            const taskElement = createTaskElement(text, date);
            document.getElementById(`${colID}-tasks`).append(taskElement)
        })
    })
}
function updateTaskToLocalStorage(){}

function createTaskElement(
    taskText,
    taskDate,
    tagName,
    classes = [],
    attributes = {},
    events = {}
) {
    const element = document.createElement(tagName)

    const taskContentElement = document.createElement("p")
    taskContentElement.textContent = taskText
    taskContentElement.classList.add("task-content")
    
    let dateElement = null
    if (taskDate) {
        dateElement = document.createElement("small")
        dateElement.textContent = taskDate
        dateElement.classList.add("task-date")
    }

    element.appendChild(taskContentElement)
    if(dateElement) element.appendChild(dateElement)

    if (Array.isArray(classes)) {
        element.classList.add(...classes)
    } else if(typeof classes === "string"){
        element.classList.add(classes)
    }

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value)
    }

    for (const [event, handler] of Object.entries(events)) {
        element.addEventListener(event, handler)
    }
 
    return element
}