import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.scss";
import AddDone from "./page/add-done/AddDone";
import Login from "./page/login/Login";
import Main from "./page/main/Main";

const App = () => {
  // login check -> redirect login
  return (
    <div className={styles.container}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Main />}></Route>
        <Route path="/add-done" element={<AddDone />}></Route>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
