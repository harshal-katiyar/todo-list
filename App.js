import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id, e) => {
    e.preventDefault();
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>To-do List</h1>
      <form id="form" onSubmit={addTodo}>
        <input
          type="text"
          className="input"
          id="input"
          placeholder="Enter your todo"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <ul className="todos" id="todos">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={todo.completed ? 'completed' : ''}
              onClick={() => toggleComplete(todo.id)}
              onContextMenu={(e) => deleteTodo(todo.id, e)}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      </form>
      <small>
        Left click to toggle completed. <br />
        Right click to delete todo
      </small>
    </div>
  );
}

export default App;