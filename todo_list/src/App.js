import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  //load Todos from local storage
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  //save Todos to local storage
  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);
  
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
        setTodo("");
    
    } else {
        
        alert("Enter Valid Task");
        setTodo("");
    }
  }
  
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos)
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos)
  }

  
  function submitEdits(id) {
    //go through every item in todos, for each todo...
    const updatedTodos = [...todos].map((todo) => {
      //if the id matches
      if(todo.id === id) {
        //update the todos text to whatever is in 'editingText'
        todo.text = editingText;
      }
      return todo;
    });
    //set our new Todos and clear the editing text
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  
  return(
    <div id="todo-list">
        <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
        />
        <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => <div className="todo" key={todo.id}>
            <div>
            {/* display completion checkbox */}
            <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>
            
            {/* ternary: if, we're editing-- show text input; if we're not-- show text */}
            {todo.id === todoEditing ?(
            <input type = "text" onChange={(e) => setEditingText(e.target.value)}/>
            ) : (
            todo.text
            )}
            </div> <br></br>
            <div className = "todo-actions">
            
            {/* ternary: show edit button or submit edit button*/}
            {todo.id === todoEditing ? (
            <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
            <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
        </div>)}
        </div>
  );
};
export default App;
