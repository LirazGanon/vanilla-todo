'use strict'

const STORAGE_KEY = 'todoDB'

var gFilterBy = {
    txt: '',
    status: ''
}

var gSortBy = ''

var gTodos

_createTodos()

function getTodosForDisplay() {
    var todos = gTodos


    if (!todos.length) return getNoTodoMsg(false)

    if (gFilterBy.status) {
        todos = todos.filter(todo =>
            (todo.isDone && gFilterBy.status === 'done') ||
            (!todo.isDone && gFilterBy.status === 'active')
        )
    }

    if (!todos.length) return getNoTodoMsg(gFilterBy.status)
    todos = todos.filter(todo => todo.txt.toLowerCase().includes(gFilterBy.txt.toLowerCase()))

    if (gSortBy) return sortTodoBy(gSortBy, todos)

    return todos

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function _getTodoBy(id) {
    const todo = gTodos.find(todo => todo.id === id)
    return todo.txt
}

function addTodo(txt, importance) {
    // const todo = {
    //     id: _makeId(),
    //     txt,
    //     isDone: false
    // }
    // THE SAME
    const todo = _createTodo(txt, importance)
    gTodos.push(todo)
    _saveTodosToStorage()
}

function setFilter(status) {
    document.querySelector(`.filter-buttons [value="${gFilterBy.status}"]`).classList.remove('bold-button')
    gFilterBy.status = status
    document.querySelector(`.filter-buttons [value="${gFilterBy.status}"]`).classList.add('bold-button')
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt
}

function setSort(value) {
    gSortBy = value
}

function getNoTodoMsg(value) {
    if (!value) return 'No todos '
    return (value === 'active') ? 'No Active Todos' : 'No Done Todos'
}

function sortTodoBy(value, todos) {
    if (value === 'txt') return todos.sort((a, b) => a[value].localeCompare(b[value]))
    return todos.sort((a, b) => a[value] - b[value])
}

function _setTodosOrder(todoId, isUp) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.order += isUp ? -1.5 : 1.5
    gTodos.sort((a, b) => a.order - (b.order))
    return gTodos.map((todo, idx) => todo.order = idx)
}


function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    return gTodos.filter(todo => !todo.isDone).length
}

function _isSort() {
    return gSortBy ? true : false;
}


function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)

    if (!todos || !todos.length) {
        todos = [
            {
                id: 't101',
                txt: 'Learn HTML',
                isDone: true,
                importance: 1,
                order: 0,
                createdAt: Date.now()
            },
            {
                id: 't102',
                txt: 'Master JS',
                isDone: false,
                importance: 1,
                order: 1,
                createdAt: Date.now()
            },
            {
                id: 't103',
                txt: 'Study CSS',
                isDone: false,
                importance: 1,
                order: 2,
                createdAt: Date.now()
            },
        ]
    }

    gTodos = todos
    _saveTodosToStorage()
}


function _createTodo(txt, importance) {
    const order = gTodos.length > 0 ? (gTodos[length - 1].order) + 1 : 0
    const todo = {
        id: _makeId(),
        txt,
        isDone: false,
        createdAt: Date.now(),
        order: order + 1,
        importance
    }
    return todo
}


function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function _makeId(length = 5) {
    var txt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}