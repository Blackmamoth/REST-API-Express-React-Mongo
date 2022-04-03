import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddTodo from "./pages/AddTodo";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <div className="container text-center mb-5">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<AddTodo />} path="/addTodo" />
        </Routes>
      </div>
    </>
  );
}

export default App;
