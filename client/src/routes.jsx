import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import AuthPage from "./components/AuthPage/AuthPage";
import CreatePage from "./components/CreatePage/CreatePage";
import Detail from "./components/Detail/Detail";
import Links from "./components/Links/Links";

export const useRoutes = (isAuth) => {
    //if false
  if (isAuth) {
    return (
      <Routes>
        <Route path="/links" element={<Links />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/" element={<Navigate replace to="/create/" />} />
      </Routes>
    );
  }
  //if true
  return (
    <Routes>
      <Route path="/" exact element={<AuthPage />} />
      <Route path="/" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
