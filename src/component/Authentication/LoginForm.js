import React, { useState } from "react";
import { login } from "../../services/AuthService";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import "./LoginForm.css";

const LoginForm = () => {
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmployeeCode = async (e) => {
    setEmployeeCode(e.target.value);
  };

  const onChangePassword = async (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (employeeCode == "") {
      return toast.error("  کد پرسنلی را وارد کنید.");
    }
    if (password == "") {
      return toast.error("  کلمه عبور را وارد کنید.");
    }

    let params = {
      employeeCode: employeeCode,
      password: password,
    };

    const result = await login(params);
    toast.loading("در حال بارگذاری ...");
    setTimeout(() => {
      window.location = "/";
    }, 5000);
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="login text-center">
          <div className="form">
            <h2>سیستم برنامه ریزی تولید</h2>
            <div className="form-field">
              <label htmlFor="login-mail">
                <i className="fa fa-user" />
              </label>
              <input
                type="text"
                placeholder=" کد پرسنلی"
                name="employeeCode"
                value={employeeCode}
                onChange={(e) => onChangeEmployeeCode(e)}
                autoComplete="off"
              />
            </div>
            <div className="form-field">
              <label htmlFor="login-password">
                <i className="fa fa-lock" />
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="کلمه عبور"
                name="password"
                value={password}
                onChange={(e) => onChangePassword(e)}
                autoComplete="off"
              />
            </div>
            <button type="submit" className="button">
              <div className="arrow-wrapper">
                <span className="arrow" />
              </div>
              <p className="button-text">ورود</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
