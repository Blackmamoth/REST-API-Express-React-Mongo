const Todo = require("./Todo");

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/tododb", { useNewUrlParser: true }, () =>
  console.log("connected")
);

const getTodos = async () => {
  const todos = await Todo.find();
  return todos;
};

const getTodo = async (id) => {
  const todo = await Todo.findOne({ _id: id });
  return todo;
};

const addTodo = async (title) => {
  try {
    const todo = new Todo({ title, complete: false });
    await todo.save();
    return todo;
  } catch (error) {
    console.log(error.message);
  }
};

const updateTodo = async (id, todoObj) => {
  try {
    const { title, complete } = todoObj;
    const todo = await Todo.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          complete: complete,
        },
      }
    );
    return todo;
  } catch (err) {
    console.log(err.message);
  }
};

const deleteTodo = async (id) => {
  try {
    const todo = await Todo.deleteOne({ _id: id });
    return todo;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getTodos, getTodo, addTodo, updateTodo, deleteTodo };
