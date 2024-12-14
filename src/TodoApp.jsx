import { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaTrash, FaUndo } from "react-icons/fa";

export const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add or update a todo item
  const handleAddOrUpdate = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      setTodos(
        todos.map((todo, index) =>
          index === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, { text: input, completed: false }]);
    }
    setInput("");
  };

  // Delete a todo
  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Mark a todo as completed or not
  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit a todo
  const handleEdit = (index) => {
    setInput(todos[index].text);
    setEditId(index);
  };

  // Clear all todos
  const clearAllTasks = () => {
    setTodos([]);
  };

  return (
    <>
      <div className="todo-app">
        <h1>Todo List</h1>
        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a todo..."
          />
          <button onClick={handleAddOrUpdate}>
            {editId !== null ? "Update" : "Add"}
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? "completed" : ""}>
              <span>{todo.text}</span>
              <button
                className="check-btn"
                onClick={() => toggleComplete(index)}
              >
                {todo.completed ? <FaUndo /> : <FaCheck />}
              </button>
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <button className="clear-btn" onClick={clearAllTasks}>
          Clear All
        </button>
      </div>
    </>
  );
};
