import "./AuthPage.scss";
import React, { useEffect, useState } from "react";
import { useHttp } from "../Hooks/Http.hook";
import { useMessage } from "../Hooks/Message.hook";

const AuthPage = () => {
  const message = useMessage();
  const { loading, request, error,clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      message(data.message);
    } catch(er) {}
  }

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (er) {}
  };

  return (
    <div className="auth_form row">
      <div className="col s6 offset-s3 ">
        <div className="card grey lighten-2">
          <div className="card-content black-text">
            <p className="card-title">Авторизация</p>
            <div className="input-field">
              <input
                name="email"
                id="email"
                type="email"
                className="auth_inp validate"
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                name="password"
                id="password"
                type="password"
                className="auth_inp validate"
                onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="card-action ">
            <button
              disabled={loading}
              onClick={loginHandler}
              className="auth_form-btn btn waves-effect waves-light"
            >
              Login
            </button>
            <button
              disabled={loading}
              onClick={registerHandler}
              className="auth_form-btn btn waves-effect waves-light"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
