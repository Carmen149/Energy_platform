import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { User } from "../../../../model/models";
import "./userUpdate.css";
interface Props {
  user: User;
  users: User[];
}
const UserUpdate: React.FC<Props> = ({ user, users }) => {
  const [userUpdate, setUserUpdate] = useState<User>(user);
  const [toggle, setToggle] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [id: string]: string }>({});
  let headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^([A-Z][a-z]{2,}[ '-]?([a-z][ -])?)*$/;

    setUserUpdate({
      ...userUpdate,
      name: e.target.value,
    });
    console.log(e.target.value);
    if (e.target.value != "") {
      if (e.target.value.length < 3) {
        setErrors({
          ...errors,
          ["name"]:
            "Name is to short. Name should contain at least 3 characters",
        });
        setToggle(true);
      } else {
        if (e.target.value.match(regex) == null) {
          setErrors({
            ...errors,
            ["name"]: "Name should start with a capital letter",
          });
          setToggle(true);
        } else {
          setErrors({
            ...errors,
            ["name"]: "",
          });
          setToggle(false);
        }
      }
    }
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9\\\\._\\\\-]{3,}$/;

    setUserUpdate({
      ...userUpdate,
      username: e.target.value,
    });
    console.log(e.target.value);
    if (e.target.value != "") {
      if (e.target.value.length < 3) {
        setErrors({
          ...errors,
          ["username"]:
            "Username is to short. Name should contain at least 3 characters",
        });
        setToggle(true);
      } else {
        if (e.target.value.match(regex) == null) {
          setErrors({
            ...errors,
            ["username"]:
              "Username should contain letters, cifres, points, dashes or underscores",
          });
          setToggle(true);
        } else {
          var ok: boolean = false;
          for (var i = 0; i < users.length; i++) {
            if (
              e.target.value == users[i].username &&
              e.target.value != user.username
            ) {
              errors["username"] = "Username is already used!";
              ok = true;
              setToggle(true);
              break;
            }
          }
          if (!ok) {
            setErrors({
              ...errors,
              ["username"]: "",
            });
            setToggle(false);
          }
        }
      }
    }
  };
  const handleChangeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdate({
      ...userUpdate,
      role: e.target.value,
    });

    if (e.target.value != "") {
      if (
        !(
          e.target.value.toUpperCase() == "CLIENT" ||
          e.target.value.toUpperCase() == "ADMINISTRATOR"
        )
      ) {
        errors["role"] = "Role must be CLIENT or ADMINISTRATOR";
        setToggle(true);
      } else {
        setErrors({
          ...errors,
          ["role"]: "",
        });
        setToggle(false);
      }
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(userUpdate);
    axios
      .put("https://localhost:8433/Carmen/api/user/admin", userUpdate, headers)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Form>
        <Form.Group onChange={handleChangeName}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name *"
            name="name"
            required
            defaultValue={user.name}
          />
          {errors["name"] && <p className="paragraph">{errors["name"]}</p>}
        </Form.Group>
        <br></br>
        <Form.Group onChange={handleChangeUsername}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username *"
            name="username"
            defaultValue={user.username}
            required
          />
          <p className="paragraph">{errors["username"]}</p>
        </Form.Group>
        <br></br>
        <Form.Group onChange={handleChangeRole}>
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Role *"
            name="role"
            defaultValue={user.role}
            required
          />
          <p className="paragraph">{errors["role"]}</p>
        </Form.Group>
        <br></br>
        <Button
          variant="success"
          type="submit"
          disabled={toggle}
          className="display-b"
          onClick={handleSubmit}
        >
          Edit user
        </Button>
      </Form>
    </div>
  );
};

export default UserUpdate;
