import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { UserCreate, User } from "../../../../model/models";
import Sidebar from "../../../sidebar/sidebar";
import "../page.css";
import Error from "../../../modal/error";
import CustomModal from "../../../modal/modal";
import UserUpdate from "./userUpdate";
import { FieldValid } from "../../../validators/validatorsUser";
import ListDevices from "./listDevices";
import history from "../../../../utils/history";
import axios from "axios";

export interface ValidField {
  name: string;
  value: string;
  users: User[];
  setNameE: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordE: React.Dispatch<React.SetStateAction<boolean>>;
  setUsernameE: React.Dispatch<React.SetStateAction<boolean>>;
  setRoleE?: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserCrud: React.FC = () => {
  const [userCreate, setUserCreate] = useState<UserCreate>({
    name: "",
    username: "",
    password: "",
    role: "",
  });
  const [userUpdate, setUserUpdate] = useState<User>({
    id: 0,
    name: "",
    username: "",
    role: "",
  });

  const [error, setError] = useState<string>("");
  const [idDevices, setIdDevices] = useState<number>(0);
  const [modalGet, setModalGet] = useState<boolean>(false);
  const [modalError, setModalError] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [modalDevice, setModalDevice] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [nameE, setNameE] = useState<boolean>(false);
  const [usernameE, setUsernameE] = useState<boolean>(false);
  const [roleE, setRoleE] = useState<boolean>(false);
  const [passwordE, setPasswordE] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [id: string]: string }>({});
  let headers = {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setUserCreate({
      ...userCreate,
      [e.currentTarget.id]: e.currentTarget.value,
    });
    console.log(e.currentTarget.value);
    setUserUpdate({
      ...userUpdate,
      [e.currentTarget.id]: e.currentTarget.value,
    });
    let name: string = e.currentTarget.id;
    let value: string = e.currentTarget.value;
    setErrors(
      FieldValid({
        name,
        value,
        users: users,
        setNameE,
        setPasswordE,
        setRoleE,
        setUsernameE,
      })
    );
    setToggle(false);
  };

  const handleAdd = (e: React.MouseEvent) => {
    if (nameE && passwordE && roleE && usernameE) {
      axios
        .post("https://localhost:8433/Carmen/api/user", userCreate, headers)
        .then((res) => {
          console.log(res.data);
          let user: User = res.data;
          setUsers([...users, user]);
          setUserCreate({
            name: "",
            role: "",
            username: "",
            password: "",
          });
        })
        .catch((error) => {
          console.log(error);
          setModalError(true);
          setError(error.response.data);
        });
    } else {
      if (!nameE) {
        setModalError(true);
        setError("Name is required");
        setToggle(true);
      } else {
        if (!usernameE) {
          setModalError(true);
          setError("Username is required");
          setToggle(true);
        } else {
          if (!roleE) {
            setModalError(true);
            setError("Role is required");
            setToggle(true);
          } else {
            if (!passwordE) {
              setModalError(true);
              setError("Password is required");
              setToggle(true);
            }
          }
        }
      }
      if (errors["name"]) {
        console.log(errors["name"]);
        setModalError(true);
        setError(errors["name"]);
        setToggle(true);
      } else {
        if (errors["username"]) {
          setModalError(true);
          setError(errors["username"]);
          setToggle(true);
        } else {
          if (errors["password"]) {
            setModalError(true);
            setError(errors["password"]);
            setToggle(true);
          } else {
            if (errors["role"]) {
              setModalError(true);
              setError(errors["role"]);
              setToggle(true);
            }
          }
        }
      }
    }
  };
  const handleAddRemove = (e: React.MouseEvent, id: number) => {
    sessionStorage.setItem("client_id", id.toString());
    history.push("/analytics");
    window.location.reload();
  };
  const handleUpdate = (e: React.MouseEvent, id: number) => {
    setModalUpdate(true);
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        setUserUpdate(users[i]);
        break;
      }
    }
  };
  const closeModalUpdate = () => {
    setModalUpdate(false);
    setUserUpdate({
      ...userUpdate,
      id: 0,
    });
    axios
      .get("https://localhost:8433/Carmen/api/user", headers)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const closeModalDevice = () => {
    setModalDevice(false);
  };
  const handleGet = (e: React.MouseEvent) => {
    let id: number;

    if (userUpdate.id > 0) {
      id = userUpdate.id;
      axios
        .get("https://localhost:8433/Carmen/api/user/" + id, headers)
        .then((res) => {
          console.log(res.data);
          setUserUpdate(res.data);
          setModalGet(true);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setModalError(true);
          setError(error.response.data.message);
        });
    } else {
      setError("You must enter an id");
      setModalError(true);
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete("https://localhost:8433/Carmen/api/user/" + id, headers)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.reload();
  };
  const handleDevices = (id: number) => {
    setModalDevice(true);
    setIdDevices(id);
  };
  useEffect(() => {
    axios
      .get("https://localhost:8433/Carmen/api/user", headers)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container_page">
      <Sidebar />
      <div className="page">
        <div className="title-style">User</div>
        <div className="tableContainer">
          <Table striped bordered size="lg" hover variant="dark">
            <thead className="thead">
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center">Name</th>
                <th className="text-center">Username</th>
                <th className="text-center">Role</th>
                <th className="text-center">Password</th>
                <th className="text-center" style={{ width: "70px" }}>
                  Actions
                </th>
              </tr>

              <tr>
                <td>
                  <input
                    type="text"
                    id="id"
                    style={{ width: "30px" }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="name"
                    style={{ width: "130px" }}
                    value={userCreate.name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="username"
                    style={{ width: "130px" }}
                    value={userCreate.username}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="role"
                    style={{ width: "130px" }}
                    value={userCreate.role}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="password"
                    id="password"
                    style={{ width: "130px" }}
                    value={userCreate.password}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </td>

                <td className="display-button">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={(e) => {
                      handleAdd(e);
                    }}
                    className="button-style-2"
                    disabled={toggle}
                  >
                    Add
                  </Button>
                  <div>|</div>
                  <Button
                    size="sm"
                    variant="info"
                    data-toggle="modal"
                    className="button-style-2"
                    onClick={(e) => {
                      handleGet(e);
                    }}
                  >
                    Get
                  </Button>
                </td>
              </tr>
            </thead>

            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>******************</td>
                  {user.id == 1 ? (
                    <td></td>
                  ) : (
                    <td className="display-button">
                      <Button
                        size="sm"
                        variant="primary"
                        className="button-style"
                        onClick={(e) => {
                          handleUpdate(e, user.id);
                        }}
                      >
                        Update
                      </Button>
                      <div>|</div>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          handleDelete(user.id);
                        }}
                        className="button-style"
                      >
                        Delete
                      </Button>
                      <div>|</div>
                      <Button
                        size="sm"
                        variant="warning"
                        className="button-style"
                        onClick={() => {
                          handleDevices(user.id);
                        }}
                      >
                        Devices
                      </Button>
                      <div>|</div>

                      <Button
                        size="sm"
                        variant="light"
                        className="button-style-3"
                        onClick={(e) => {
                          handleAddRemove(e, user.id);
                        }}
                      >
                        Add/Remove devices
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      {modalGet && <CustomModal setModalGet={setModalGet} user={userUpdate} />}
      {modalError && <Error setModalError={setModalError} message={error} />}
      <Modal
        className="modal-style"
        show={modalUpdate}
        onHide={() => {
          closeModalUpdate();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="title-modal-update">Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserUpdate user={userUpdate} users={users} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              closeModalUpdate();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="modal-style-device"
        show={modalDevice}
        onHide={() => {
          closeModalDevice();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="title-modal-device">Devices</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ListDevices id={idDevices} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              closeModalDevice();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserCrud;
