import "./Components/todo/todo.css";
import TodoData from "./Components/todo/TodoData";
import TodoNew from "./Components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import Header from "./Components/layout/header";
import Footer from "./Components/layout/footer";
import { useState } from "react";
const App = () => {
  const [todoList, setTodoList] = useState([
    // { id: 1, name: "Learning React" },
    // { id: 2, name: "Watching Youtube" },
  ]);
  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 10000),
      name: name,
    };
    setTodoList([...todoList, newTodo]);
  };
  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const deleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(updatedTodoList);
  };
  return (
    <>
      <Header />
      <div className="todo-container">
        <div className="todo-title">Todo List</div>
        <TodoNew addNewTodo={addNewTodo} />
        {todoList.length > 0 ? (
          <TodoData todoList={todoList} deleteTodo={deleteTodo} />
        ) : (
          <div className="todo-image">
            <img src={reactLogo} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
