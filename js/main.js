'use strict'



function onInit() {
    renderTodos()
}


function renderTodos() {

    const todos = getTodosForDisplay()

    var strHTMLs

    if (!Array.isArray(todos)) {
        strHTMLs = [`<h2>${todos}</h2> `]
    } else {
        strHTMLs = todos.map((todo, idx) => {

            const crateAt = renderTodoTime(todo.createdAt)

            return `
        <div class="todo-item idx-${idx}">
        <div class="txt ${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')" >  ${todo.txt}</div>
        <div>  ${crateAt}</div>
        <div>  ${todo.importance}</div>
        <div><button onclick="onRemoveTodo(event,'${todo.id}')" >✖</button></div>
        <div><div class="order-arrows"><button onclick="onSetOrder('${todo.id}',true)" class="up">⬆</button><button onclick="onSetOrder('${todo.id}',false)" class="down">⬇</button></div></div>
        </div>
        `})
    }

    document.querySelector('.todo-container').innerHTML = strHTMLs.join('')
      
        if (_isSort()){
            const elOrderButtons = document.querySelectorAll('.order-arrows')
            elOrderButtons.forEach(button => button.classList.add('hide'))
        }else  if (todos.length > 0 && Array.isArray(todos)) renderArrowButtons()
    
        document.querySelector('span.total').innerText = getTotalCount()
    document.querySelector('span.active').innerText = getActiveCount()
}

function renderTodoTime(date) {
    date = new Date(date)
    return date.getHours() + ":" + ((date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes())
}

function renderArrowButtons() {
    var elArrows = document.querySelectorAll('.order-arrows')
    elArrows[0].querySelector('.up').classList.add('hide')
    elArrows[elArrows.length - 1].querySelector('.down').classList.add('hide')
}

function onSetOrder(todoId, isUp) {
    _setTodosOrder(todoId, isUp)
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (!confirm(`Are you sure you want to remove ${_getTodoBy(todoId)}?`)) return
    console.log('Removing:', todoId)
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    console.log('Toggling:', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=txt]')
    const txt = elTxt.value
    if (!txt) {
        alert(`Invalid toto, please try again`)
        return
    }
    const importance = +ev.target.importance.value
    if (importance < 1 || importance > 3) {
        alert(`Invalid importance, please use number 1-3`)
        return
    }
    addTodo(txt, importance)
    renderTodos()
    elTxt.value = ''
    ev.target.importance.value = ''
}

function onSetFilter(filterBy) {
    console.log('filterBy:', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(sortBy) {
    console.log('Sort By:', sortBy)
    setSort(sortBy)
    renderTodos()
}


function onSetFilterByTxt(txt) {
    console.log('Filtering by txt', txt)
    setFilterByTxt(txt)
    renderTodos()
}
