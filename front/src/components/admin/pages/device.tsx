import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { DeviceGet, DeviceUpdate } from "../../../model/models";
import Sidebar from "../../sidebar/sidebar";
import "../pages/page.css";
import { ValidateCreate } from "../../validators/validatorsDevice";
import CustomModal from "../../modal/modal";
import Error from "../../modal/error";
import UpdateDevice from "./deviceUpdate";
import ListMeasurements from "./listMeasurements";
import AddMeasurement from "./addMeasurement";
import axios from "axios";

export interface ValidDeviceCreate {
  name: string;
  value: string | number;
  devices: DeviceGet[];
  setNameE: React.Dispatch<React.SetStateAction<boolean>>;
  setDescriptionE: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressE: React.Dispatch<React.SetStateAction<boolean>>;
  setMaxEnergyE: React.Dispatch<React.SetStateAction<boolean>>;
  setUserIdE: React.Dispatch<React.SetStateAction<boolean>>;
}
const Device: React.FC = () => {
  const [devices, setDevices] = useState<DeviceGet[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [nameE, setNameE] = useState<boolean>(false);
  const [descriptionE, setDescriptionE] = useState<boolean>(false);
  const [addressE, setAddressE] = useState<boolean>(false);
  const [maxEnergyE, setMaxEnergyE] = useState<boolean>(false);
  const [userIdE, setUserIdE] = useState<boolean>(false);
  const [modalGet, setModalGet] = useState<boolean>(false);
  const [modalError, setModalError] = useState<boolean>(false);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [viewMeasurements, setMeasurements] = useState<boolean>(false);
  const [addMeasurements, setAddMeasurements] = useState<boolean>(false);
  const [idMeasurements, setIdMeasurements] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [errors, setErrors] = useState<{ [id: string]: string }>({});
  let headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const [deviceUpdate, setDeviceUpdate] = useState<DeviceUpdate>({
    id: 0,
    name: "",
    description: "",
    address: "",
    maxEnergy: 0,
    userId: 0,
  });
  const [deviceGet, setDeviceGet] = useState<DeviceGet>({
    id: 0,
    name: "",
    description: "",
    address: "",
    maxEnergy: 0,
    user: {
      id: 0,
      name: "",
      username: "",
      role: "",
    },
  });
  useEffect(() => {
    axios
      .get("https://localhost:8433/Carmen/api/device", headers)
      .then((res) => {
        setDevices(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const closeMeasurements = () => {
    setMeasurements(false);
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    setDeviceUpdate({
      ...deviceUpdate,
      [e.currentTarget.id]: e.currentTarget.value,
    });

    console.log(e.currentTarget.value);
    setErrors({
      ...errors,
      [e.currentTarget.id]: ValidateCreate({
        name: e.currentTarget.id,
        value: e.currentTarget.value,
        devices: devices,
        setNameE: setNameE,
        setDescriptionE: setDescriptionE,
        setAddressE: setAddressE,
        setMaxEnergyE: setMaxEnergyE,
        setUserIdE: setUserIdE,
      }),
    });
    setToggle(false);
  };
  const handleDelete = (id: number) => {
    axios
      .delete("https://localhost:8433/Carmen/api/device/" + id, headers)
      .then((res) => {
        console.log(res.data);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGet = (e: React.MouseEvent) => {
    e.preventDefault();
    let id: number;

    if (deviceUpdate.id > 0) {
      id = deviceUpdate.id;
      axios
        .get("https://localhost:8433/Carmen/api/device/" + id, headers)
        .then((res) => {
          console.log(res.data);
          setDeviceGet(res.data);
          setModalGet(true);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setModalError(true);
          setError(error.response);
        });
    } else {
      setError("You must enter an id");
      setModalError(true);
    }
  };
  const closeModalUpdate = () => {
    setModalUpdate(false);
    setDeviceUpdate({
      id: 0,
      name: "",
      description: "",
      address: "",
      maxEnergy: 0,
      userId: 0,
    });
    axios
      .get("https://localhost:8433/Carmen/api/device", headers)
      .then((res) => {
        setDevices(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const closeAddMeasurements = () => {
    setAddMeasurements(false);
  };
  const handleUpdate = (e: React.MouseEvent, id: number) => {
    setModalUpdate(true);
    let user_id: number = 0;
    for (var i = 0; i < devices.length; i++) {
      if (devices[i].id == id) {
        if (devices[i].user) {
          user_id = devices[i].user.id;
        }
        setDeviceUpdate({
          id: devices[i].id,
          name: devices[i].name,
          description: devices[i].description,
          address: devices[i].address,
          maxEnergy: devices[i].maxEnergy,
          userId: user_id,
        });
        break;
      }
    }
  };
  const handleMeasurements = (e: React.MouseEvent, id: number) => {
    console.log(id);
    setIdMeasurements(id);
    setMeasurements(true);
  };
  const handleAddMeasurements = (e: React.MouseEvent, id: number) => {
    console.log(id);
    setIdMeasurements(id);
    setAddMeasurements(true);
  };
  const handleAdd = (e: React.MouseEvent) => {
    console.log(nameE);
    console.log(Object.keys(errors).length);
    if (nameE && descriptionE && addressE && maxEnergyE && userIdE) {
      console.log(deviceUpdate);

      axios
        .post("https://localhost:8433/Carmen/api/device", deviceUpdate, headers)
        .then((res) => {
          console.log(res.data);
          let device: DeviceGet = res.data;
          setDevices([...devices, device]);
          setDeviceUpdate({
            id: 0,
            name: "",
            description: "",
            address: "",
            maxEnergy: 0,
            userId: 0,
          });
        })
        .catch((error) => {
          console.log(error);
          setModalError(true);
          setError(error.response.data);
        });
    } else {
      if (!nameE) {
        console.log("here");
        setModalError(true);
        setError("Name is required");
        setToggle(true);
      } else {
        if (!descriptionE) {
          setModalError(true);
          setError("Description is required");
          setToggle(true);
        } else {
          if (!addressE) {
            setModalError(true);
            setError("Address is required");
            setToggle(true);
          } else {
            if (!maxEnergyE) {
              console.log(maxEnergyE);
              setModalError(true);
              setError("Energy is required");
              setToggle(true);
            } else {
              if (!userIdE) {
                setModalError(true);
                setError("User id is required");
                setToggle(true);
              }
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
        if (errors["description"]) {
          setModalError(true);
          setError(errors["description"]);
          setToggle(true);
        } else {
          if (errors["maxEnergy"]) {
            setModalError(true);
            setError(errors["maxEnergy"]);
            setToggle(true);
          } else {
            if (errors["address"]) {
              setModalError(true);
              setError(errors["address"]);
              setToggle(true);
            } else {
              if (errors["userId"]) {
                setModalError(true);
                setError(errors["userId"]);
                setToggle(true);
              }
            }
          }
        }
      }
    }
  };

  return (
    <div className="container_page">
      <Sidebar />
      <div className="page">
        <div className="title-style">Device</div>
        <div className="tableContainer_device">
          <Table striped bordered size="lg" hover variant="dark">
            <thead className="thead">
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center" style={{ width: "70px" }}>
                  Name
                </th>
                <th className="text-center">Description</th>
                <th className="text-center" style={{ width: "190px" }}>
                  Address
                </th>
                <th className="text-center" style={{ width: "70px" }}>
                  Max Energy
                </th>
                <th className="text-center">Username</th>
                <th className="text-center">UserId</th>
                <th className="text-center" style={{ width: "70px" }}>
                  Actions
                </th>
              </tr>

              <tr>
                <td className="text-center">
                  <input
                    type="number"
                    id="id"
                    style={{ width: "50px" }}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="name"
                    style={{ width: "150px" }}
                    value={deviceUpdate.name}
                    onChange={handleChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="text"
                    id="description"
                    style={{ width: "140px" }}
                    value={deviceUpdate.description}
                    onChange={handleChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="text"
                    id="address"
                    style={{ width: "200px" }}
                    value={deviceUpdate.address}
                    onChange={handleChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    id="maxEnergy"
                    style={{ width: "150px" }}
                    value={deviceUpdate.maxEnergy}
                    onChange={handleChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="text"
                    id="username"
                    style={{ width: "150px" }}
                    onChange={handleChange}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    id="userId"
                    style={{ width: "130px" }}
                    value={deviceUpdate.userId}
                    onChange={handleChange}
                  />
                </td>

                <td className="display-button">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={handleAdd}
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
                    onClick={handleGet}
                  >
                    Get
                  </Button>
                </td>
              </tr>
            </thead>

            <tbody>
              {devices.map((device, i) => (
                <tr key={i}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{device.description}</td>
                  <td>{device.address}</td>
                  <td>{device.maxEnergy}</td>
                  {device.user ? <td>{device.user.username}</td> : <td>-</td>}
                  {device.user ? <td>{device.user.id}</td> : <td>-</td>}

                  <td className="display-button">
                    <Button
                      size="sm"
                      variant="primary"
                      className="button-style"
                      onClick={(e) => {
                        handleUpdate(e, device.id);
                      }}
                    >
                      Update
                    </Button>
                    <div>|</div>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        handleDelete(device.id);
                      }}
                      className="delete"
                    >
                      Delete
                    </Button>
                    <div>|</div>
                    <Button
                      size="sm"
                      variant="warning"
                      className="button-style"
                      onClick={(e) => {
                        handleMeasurements(e, device.id);
                      }}
                    >
                      Measurements
                    </Button>
                    <div>|</div>
                    <Button
                      size="sm"
                      variant="light"
                      className="button-style"
                      onClick={(e) => {
                        handleAddMeasurements(e, device.id);
                      }}
                    >
                      AddMeasurement
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      {modalGet && <CustomModal setModalGet={setModalGet} device={deviceGet} />}
      {modalError && <Error setModalError={setModalError} message={error} />}
      <Modal
        className="modal-style_device"
        show={modalUpdate}
        onHide={closeModalUpdate}
      >
        <Modal.Header closeButton>
          <Modal.Title className="title-modal_device">Edit device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateDevice device={deviceUpdate} devices={devices} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalUpdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="modal-style-device"
        show={viewMeasurements}
        onHide={closeMeasurements}
      >
        <Modal.Header closeButton>
          <Modal.Title className="title-modal-measurements">
            Measurements
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ListMeasurements id={idMeasurements} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeMeasurements}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="modal-style-measurements"
        show={addMeasurements}
        onHide={closeAddMeasurements}
      >
        <Modal.Header closeButton>
          <Modal.Title className="title-modal-addmeasurements">
            Add measurement
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddMeasurement id={idMeasurements} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddMeasurements}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Device;
