import React, { useEffect, useState } from "react";

const UpdateTodo = ({ todo, getTodos, setShowForm }) => {
  const [title, setTitle] = useState(todo.title);
  const [complete, setComplete] = useState(todo.complete);
  const [showAlert, setShowAlert] = useState(false);
  const [todoExists, setTodoExists] = useState(false);

  useEffect(() => {
    setTitle(todo.title);
    setComplete(todo.complete);
  }, [todo]);

  const updateTodo = async () => {
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, complete }),
    });
    return res.status;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } else {
      const res = await updateTodo();
      if (res === 200) {
        getTodos();
        setShowForm(false);
      } else if (res === 409) {
        setTodoExists(true);
        setTimeout(() => {
          setTodoExists(false);
        }, 5000);
      }
    }
  };

  return (
    <div>
      {showAlert && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Title cannot be blank
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {todoExists && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Todo already exists
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="form-outline mb-4">
        <label className="form-label h2" htmlFor="form3Example3">
          Todo Title
        </label>
        <input
          type="text"
          id="form3Example3"
          className="form-control border-dark"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-outline mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          checked={complete}
          onChange={(e) => {
            setComplete(e.target.checked);
          }}
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          <span className="ms-2">Complete</span>
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block mb-4"
        onClick={handleSubmit}
      >
        Update Todo
      </button>
    </div>
  );
};

export default UpdateTodo;
