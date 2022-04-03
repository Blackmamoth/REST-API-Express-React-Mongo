import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpdateTodo from "./UpdateTodo";

const Button = ({ setShowForm }) => {
  return (
    <button
      className="btn btn-danger"
      onClick={() => {
        setShowForm(false);
      }}
    >
      Close
    </button>
  );
};

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [todo, setTodo] = useState({});

  const emptyTodo = (
    <div>
      <h1>Seems like you don't have anything to do</h1>
      <Link className="btn btn-link" to="/addTodo">
        Add Todo
      </Link>
    </div>
  );

  const getTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {todos.length > 0 ? (
        <table className="table mb-4">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Todo item</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => {
              return (
                <tr key={todo._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{todo.title}</td>
                  <td>{todo.complete ? "Complete" : "Incomplete"}</td>
                  <td>
                    <button
                      type="submit"
                      className="btn btn-danger"
                      onClick={() => {
                        deleteTodo(todo._id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-success ms-1"
                      onClick={() => {
                        setShowForm(true);
                        setTodo(todo);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        emptyTodo
      )}

      {showForm && (
        <UpdateTodo todo={todo} getTodos={getTodos} setShowForm={setShowForm} />
      )}
      {showForm && <Button setShowForm={setShowForm} />}
    </div>
  );
};

export default Home;
