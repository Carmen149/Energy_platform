import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { User } from "../../model/models";
import { axiosInstance } from "../../utils/axios";
import Success from "../modal/success";
import "./signupForm.css";
import { Validation } from "../validators/validatorsUser";
import history from "../../utils/history";
export interface Values {
  name: string;
  username: string;
  password: string;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const SignupForm: React.FC = () => {
  const [errors, setErrors] = useState<{ [id: string]: string }>({});
  const [toggle, setToggle] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [values, setValues] = useState<Values>({
    name: "",
    username: "",
    password: "",
    users: [],
    setUsers: setUsers,
  });
  const handleFormSubmit = (e: React.MouseEvent) => {
    console.log(Object.keys(errors).length);
    e.preventDefault();
    if (
      Object.keys(errors).length === 0 &&
      values.name != "" &&
      values.name != "" &&
      values.password != ""
    ) {
      axiosInstance
        .post("api/auth/register", {
          name: values.name,
          username: values.username,
          password: values.password,
          role: "User",
        })
        .then((res) => {
          console.log(res.data);
          let user: User = res.data;
          setUsers([...users, user]);
        })
        .catch((error) => {
          console.log(error);
        });
      setMessage("Register with succes");
      setModalSuccess(true);
      setValues({ ...values, name: "", username: "", password: "" });
    } else {
      if (values.name == "" && values.name == "" && values.password == "") {
        setError(true);
      }
      setToggle(true);
    }
  };
  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setValues({
      ...values,
      users: users,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    setErrors(
      Validation({
        ...values,
        [e.currentTarget.name]: e.currentTarget.value,
      })
    );
    setToggle(false);
    setError(false);
  };
  const handleLogIn = (e: React.MouseEvent) => {
    history.push("/");
    window.location.reload();
  };
  useEffect(() => {
    axiosInstance
      .get("api/user")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container-form">
      <div className="app-wrapper">
        <div>
          <h2 className="title">Create Account</h2>
        </div>
        <form className="form-wrapper">
          <div className="name">
            <label className="label">Name</label>
            <input
              className="input"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder={"Name"}
            />
            {errors["name"] && <p className="error-p">{errors["name"]}</p>}
            {error && <p className="error-p">Name is required</p>}
          </div>
          <div className="username">
            <label className="label">Username</label>
            <input
              className="input"
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder={"Username"}
            />
            {errors["username"] && (
              <p className="error-p">{errors["username"]}</p>
            )}
            {error && <p className="error-p">Username is required</p>}
          </div>
          <div className="password">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder={"Password"}
            />
            {errors["password"] && (
              <p className="error-p">{errors["password"]}</p>
            )}
            {error && <p className="error-p">Password is required</p>}
          </div>
          <div>
            <Button
              className="submit"
              disabled={toggle}
              onClick={handleFormSubmit}
            >
              Sign up
            </Button>
            <br></br>
            <Button className="submit" onClick={handleLogIn}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
      {modalSuccess && (
        <Success setModalSuccess={setModalSuccess} message={message} />
      )}
    </div>
  );
};

export default SignupForm;
