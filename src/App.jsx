import "./Components/todo/todo.css";
import TodoData from "./Components/todo/TodoData";
import TodoNew from "./Components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import Header from "./Components/layout/header";
import Footer from "./Components/layout/footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />

      <Outlet />
      <Footer />
    </>
  );
};

export default App;
