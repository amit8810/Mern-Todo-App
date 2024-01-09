import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import "./App.css";

function App() {
  // State to store the list of todos
  const [items, setItems] = useState([]);
  // State to store the input value for adding a new todo
  const [input, setInput] = useState("");

  // Fetch todos when the component mounts
  useEffect(() => {
    getTodos();
  }, []);

  // Handle input change for adding a new todo
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Fetch all todos from the server
  const getTodos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/todos/get-all`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      // Parse the response JSON and update the state with todos data
      const data = await response.json();
      setItems(data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Update a todo on the server
  const updateTodo = async (id, data) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/todos/update/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      // After updating, fetch the updated list of todos
      await getTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo on the server
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/todos/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      // After deleting, fetch the updated list of todos
      await getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Add a new todo on the server
  const addTodo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/todos/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: input,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      // After adding, fetch the updated list of todos
      await getTodos();
      setInput("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <div className="bg-blue-200 flex flex-col h-screen w-screen items-center">
        <div className="mt-12 text-2xl font-bold">TODO LIST</div>

        <div className="flex justify-center items-center mt-7">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="rounded-l-lg px-44 py-5"
            placeholder="Create a new Todo"
          ></input>
          <button onClick={addTodo} className="bg-yellow-500 rounded-r-lg py-5 px-4 font-bold">
            Add Item
          </button>
        </div>

        {/* Render the TodoList component with todos data and update/delete functions */}
        <TodoList todos={items} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      </div>
    </>
  );
}

export default App;
