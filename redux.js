const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
    localStorage.setItem("todos", JSON.stringify(state));
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    state = JSON.parse(storedTodos);
  } else {
    dispatch({});
  }

  return { getState, dispatch, subscribe };
};

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

const addTodoAction = (text, username) => ({
  type: ADD_TODO,
  text,
  username,
});

const deleteTodoAction = (index) => ({
  type: DELETE_TODO,
  index,
});

const editTodoAction = (index, newText) => ({
  type: EDIT_TODO,
  index,
  newText,
});

const toggleTodoAction = (index) => ({
  type: TOGGLE_TODO,
  index,
});

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { text: action.text, completed: false, username: action.username },
      ];
    case DELETE_TODO:
      return state.filter((todo, index) => index !== action.index);
    case EDIT_TODO:
      return state.map((todo, index) =>
        index === action.index ? { ...todo, text: action.newText } : todo
      );
    case TOGGLE_TODO:
      return state.map((todo, index) =>
        index === action.index ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

const store = createStore(todosReducer);
