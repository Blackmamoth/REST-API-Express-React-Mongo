const express = require("express");
const {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("./models/todoModels");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/api/todos", async (req, res) => {
  const todos = await getTodos();
  res.status(200).json(todos);
});

app.get("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await getTodo(id);
  if (!todo) {
    return res
      .status(404)
      .json({ success: false, message: "Todo doesn't exists" });
  }
  res.status(200).json(todo);
});

app.post("/api/todos", async (req, res) => {
  const title = req.body.title;
  const todo = await addTodo(title);
  if (!todo) {
    return res
      .status(409)
      .json({ success: false, message: "Todo already exists" });
  }
  res.status(201).json(todo);
});

app.put("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todoObj = req.body;
  const todo = await updateTodo(id, todoObj);
  if (!todo) {
    return res
      .status(409)
      .json({ success: false, message: "Todo already exists" });
  }
  res.status(200).json(todo);
});

app.delete("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await deleteTodo(id);
  if (!todo) {
    return res.json({
      success: false,
      message: `Todo with id ${id} not found`,
    });
  }
  res.status(204).json(todo);
});

app.listen(5000, () => console.log("Server running on port 5000"));
