import React, { useState } from "react";

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  // State to track the currently editing todo's ID
  const [editingTodoId, setEditingTodoId] = useState(null);
  // State to store the edited content
  const [editedContent, setEditedContent] = useState("");

  // Function to handle updating a todo
  const handleUpdate = async (id) => {
    // Call the updateTodo function with the todo ID and updated content
    await updateTodo(id, { content: editedContent });
    // Clear the editing state after updating
    setEditingTodoId(null);
  };

  // Function to handle deleting a todo
  const handleDelete = async (id) => {
    // Call the deleteTodo function with the todo ID
    await deleteTodo(id);
  };

  // Function to handle toggling the completion status of a todo
  const handleToggleStatus = async (id, isCompleted) => {
    // Calculate the new completion status
    const newStatus = !isCompleted;
    // Call the updateTodo function with the todo ID and updated completion status
    await updateTodo(id, { isCompleted: newStatus });
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-semibold mb-4">Todo List</h1>
      {todos.length > 0 ? (
        <ul className="grid gap-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className={`bg-white p-4 rounded shadow-md flex justify-between items-center ${
                todo.isCompleted ? "line-through text-gray-500" : ""
              }`}
            >
              <div>
                {editingTodoId === todo._id ? (
                  // If editing, show an input field for editing content
                  <input
                    type="text"
                    className="border-b border-gray-300 w-full"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                ) : (
                  // If not editing, display the todo content
                  <p className="text-lg font-semibold">{todo.content}</p>
                )}
                <p className="text-sm text-gray-500">
                  Created: {new Date(todo.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                {editingTodoId === todo._id ? (
                  // If editing, show a button to save changes
                  <button
                    className="text-green-500"
                    onClick={() => handleUpdate(todo._id)}
                  >
                    Save
                  </button>
                ) : (
                  // If not editing, display checkbox, delete, and edit buttons
                  <>
                    <input
                      type="checkbox"
                      className="form-checkbox h-6 w-6 text-indigo-500"
                      checked={todo.isCompleted}
                      onChange={() =>
                        handleToggleStatus(todo._id, todo.isCompleted)
                      }
                    />
                    <button
                      className="ml-4 text-red-500"
                      onClick={() => handleDelete(todo._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="ml-4 text-blue-500"
                      onClick={() => {
                        // Set the current todo as the one being edited
                        setEditingTodoId(todo._id);
                        // Set the edited content to the current todo's content
                        setEditedContent(todo.content);
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No todos available.</p>
      )}
    </div>
  );
};

export default TodoList;
