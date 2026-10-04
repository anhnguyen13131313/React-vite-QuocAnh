import "./Components/todo/todo.css";
import TodoData from "./Components/todo/TodoData";
import TodoNew from "./Components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import Header from "./Components/layout/header";
import Footer from "./Components/layout/footer";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { AuthContext } from "./Components/context/auth.context";
import { Spin } from "antd";
const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };
  return (
    <>
      {isAppLoading === true ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {" "}
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
