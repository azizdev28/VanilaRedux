const usernameInput = document.getElementById("usernameInput"); // Get username input field
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const searchInput = document.getElementById("searchInput");

const addTodo = () => {
  const text = todoInput.value.trim();
  if (text !== "") {
    store.dispatch(addTodoAction(text));
    todoInput.value = "";
  }
};

const deleteTodo = (index) => {
  store.dispatch(deleteTodoAction(index));
};

const editTodo = (index, newText) => {
  store.dispatch(editTodoAction(index, newText));
};

const render = (todos) => {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) {
      li.style.textDecoration = "line-through";
    }

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteBtn");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTodo(index);
    li.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.classList.add("editBtn");
    editButton.textContent = "Edit";
    editButton.onclick = () => {
      const newText = prompt("Enter new text for the todo:");
      if (newText !== null) {
        editTodo(index, newText.trim());
      }
    };
    li.appendChild(editButton);

    const doneButton = document.createElement("button");
    doneButton.classList.add("doneBtn");
    doneButton.textContent = "Done";
    doneButton.onclick = () => toggleTodo(index);
    li.appendChild(doneButton);
    todoList.appendChild(li);
  });
};

const searchTodos = () => {
  const searchText = searchInput.value.trim().toLowerCase();
  const filteredTodos = store
    .getState()
    .filter((todo) => todo.text.toLowerCase().includes(searchText));
  render(filteredTodos);
};

searchInput.addEventListener("input", searchTodos);

render(store.getState());

store.subscribe(() => {
  const searchText = searchInput.value.trim().toLowerCase();
  const todos = store.getState();
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchText)
  );
  render(filteredTodos);
});

render(store.getState());

// Todo toggling action
const toggleTodo = (index) => {
  store.dispatch(toggleTodoAction(index));
};
