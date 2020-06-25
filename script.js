var todoList = {
    todos : [],
    addTodo: function (todoName) {
        this.todos.push({
            todoName: todoName,
            isComplete: false
        })
        console.log(this.todos)
    },
    changeTodo: function(position, todoName) {
        this.todos[position].todoName = todoName
        console.log(this.todos)
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1)
    },
    toggleComplete: function(position) {
        
        var todo = this.todos[position]
        todo.isComplete = !todo.isComplete;
        console.log(this.todos)
        
    },
    toggleAllComplete: function() {
        var totalTodos = this.todos.length
        var completedTodos = 0

        this.todos.forEach(function(todo) {
            if(todo.isComplete === true) {
                completedTodos++
            }
        })
        this.todos.forEach(function(todo) {
            if(completedTodos === totalTodos) {
                todo.isComplete = false
            } else {
                todo.isComplete = true
            }
        })
    }
}


var handlers = {
    addTodo: function() {
        var newTodo = document.getElementById('newTodo')
        todoList.addTodo(newTodo.value)
        newTodo.value = ""
        view.displayTodos()
    },
    toggleComplete: function(position) {
        todoList.toggleComplete(position)
        view.displayTodos()
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position)
        view.displayTodos()
    },
    changeTodo: function(position) {
        var todoName = document.getElementById('renameTodo')
        todoList.changeTodo(position, todoName.value)
        todoName.value = ""
        
        view.displayTodos()
    }
}

var view = {
    displayTodos: function() {
        var listOfTodos = document.querySelector('ul')
        listOfTodos.innerHTML = ""

        todoList.todos.forEach(function(todo, position) {
            var todoContainer = document.createElement('div')
            todoContainer.className = "todoContainer"
            var todoListItem = document.createElement('li')
            
            todoListItem.id = position
            if(todo.isComplete) {
                todoListItem.innerHTML = `${todo.todoName.strike()}<br>`
            } else {
            todoListItem.innerHTML = `${todo.todoName}<br>`
            }

            todoListItem.appendChild(this.createRenameButton())
            todoListItem.appendChild(this.createCompleteButton())
            todoListItem.appendChild(this.createDeleteButton())
            

            todoContainer.appendChild(todoListItem)

            listOfTodos.appendChild(todoContainer)
        }, this)
    },
    createCompleteButton: function() {
        var completeButton = document.createElement('button')
        completeButton.className = 'completeButton'
        completeButton.textContent = "✔"
        return completeButton
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button')
        deleteButton.className = 'deleteButton'
        deleteButton.textContent = "✘"
        return deleteButton
    },
    createRenameButton: function() {
        var renameButton = document.createElement('button')
        renameButton.textContent = "✎"
        renameButton.className = 'renameButton'
        return renameButton
    },
    setUpEventListeners: function() {
        var listOfTodos = document.querySelector('ul')
        listOfTodos.addEventListener('click', function(event) {
            var elementClicked = event.target

            if(elementClicked.className === 'completeButton') {
                handlers.toggleComplete(parseInt(elementClicked.parentNode.id))
            }

            if(elementClicked.className === 'deleteButton') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id))
            }
            if(elementClicked.className === 'renameButton') {
                
                handlers.changeTodo(parseInt(elementClicked.parentNode.id))
            }
        })
    }
}
view.setUpEventListeners()

