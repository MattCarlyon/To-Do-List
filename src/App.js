import React, {useState, useEffect, useRef} from "react";
import {v4 as uuidv4} from "uuid";
import './App.css'

function App() {
  const firstRender = useRef(true);

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] =useState("");

  const addToDo = (e) => {
    e.preventDefault();

    if(inputValue.trim() ==="") return;

    setTodos([
      ...todos,
      {
        text:inputValue,
        id:uuidv4(),
      },
    ]);

    setInputValue("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  useEffect(() => {
    if (firstRender.current) {
      console.log("true"); 
      firstRender.current = false;
    } else {
      localStorage.setItem("Todo",
      JSON.stringify([...todos]));
      console.log("This is not the first page load")
    }
  }, [todos]);

  useEffect(() => {
    if (localStorage.getItem ("Todo") !== null) {
      const newTodos = localStorage.getItem("Todo");
      setTodos(JSON.parse([...todos, newTodos]));
    }
  }, []);

  return (
    <div className="container">
      <h1>To Do Example</h1>
      <form onSubmit={addToDo}>
        <input
        autoFocus
        type="text"
        placeholder="Add a ToDo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}

        />
        <button>Add ToDo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <p>{todo.text}</p>
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </div>
      ))};
    </div>
  );
};

export default App;