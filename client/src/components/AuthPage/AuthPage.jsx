import "./AuthPage.scss";
import React, { useState } from "react";
import { useHttp } from "../Hooks/Http.hook";

const AuthPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const {loading, request, error} = useHttp();
  const changeHandler = ev => {
    setForm({...form, [ev.target.name]: ev.target.value});
  }

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
            <button className="auth_form-btn btn waves-effect waves-light">
              Login
            </button>
            <button className="auth_form-btn btn waves-effect waves-light">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
