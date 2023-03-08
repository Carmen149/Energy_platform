import React, { useState, useEffect } from "react";
import "./signupForm.tsx";
import history from "../../utils/history";
import Error from "../modal/error";
import axios from "axios";
export interface Authentification {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<Authentification>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const handleLogIn = (e: React.MouseEvent) => {
    console.log(user);
    e.preventDefault();
    axios
      .put("https://localhost:8433/Carmen/api/auth/log-in", user)
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("role", res.data.role);
        console.log(sessionStorage.getItem("role"));
        sessionStorage.setItem("user_id", res.data.id);
        sessionStorage.setItem("user_name", res.data.username);
        sessionStorage.setItem("token", res.data.token);
        history.push("/user");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setUser({
          username: "",
          password: "",
        });
      });
  };
  const handleRegister = (e: React.MouseEvent) => {
    history.push("/register");
    window.location.reload();
  };
  return (
    <div className="container-form">
      <div className="app-wrapper">
        <div>
          <h2 className="title-log-in">Log in</h2>
        </div>
        <form className="form-wrapper">
          <div className="username">
            <label className="label">Username</label>
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="password">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Passsword"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="submit" onClick={handleLogIn}>
              Log in
            </button>
          </div>
          <p className="message">Don't have an account? Register here!</p>
          <div>
            <button className="submit" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
      {error && (
        <Error
          setModalError={setError}
          message={"Credential are not correct. Please try again"}
        />
      )}
    </div>
  );
};

export default Login;
