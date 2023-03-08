import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { DeviceGet, DeviceUpdate } from "../../../model/models";
import Error from "../../modal/error";
import "./page.css";
interface Props {
  device: DeviceUpdate;
  devices: DeviceGet[];
}

const UpdateDevice: React.FC<Props> = ({ device, devices }) => {
  const [deviceUpdate, setDeviceUpdate] = useState<DeviceUpdate>(device);
  const [toggle, setToggle] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [id: string]: string }>({});
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  let headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  useEffect(() => {
    setDeviceUpdate({
      id: device.id,
      name: device.name,
      description: device.description,
      address: device.address,
      maxEnergy: device.maxEnergy,
      userId: device.userId ? device.userId : 0,
    });
  }, []);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9\\\\._\\\\-]{3,}$/;
    console.log(e.target.value);
    setDeviceUpdate({ ...deviceUpdate, name: e.target.value });
    setToggle(false);
    if (!e.target.value) {
      setErrors({
        ...errors,
        ["name"]: "Name is required",
      });
      setToggle(true);
    } else {
      if (e.target.value.length < 3) {
        setErrors({
          ...errors,
          ["name"]: "Name is to short. should contains at least 3 characters. ",
        });
        setToggle(true);
      } else {
        if (e.target.value.match(regex) == null) {
          setErrors({
            ...errors,
            ["name"]:
              "Name should contain letters, cifres, points, dashes or underscores",
          });
          setToggle(true);
        } else {
          for (var i = 0; i < devices.length; i++) {
            if (
              devices[i].name == e.target.value &&
              devices[i].name != device.name
            ) {
              setErrors({
                ...errors,
                ["name"]: "Name already exist. Name should be unique",
              });
              setToggle(true);
              break;
            } else {
              setErrors({
                ...errors,
                ["name"]: "",
              });
              setToggle(false);
              break;
            }
          }
        }
      }
    }
  };
  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceUpdate({ ...deviceUpdate, description: e.target.value });
    if (!e.target.value) {
      setErrors({
        ...errors,
        ["description"]: "Description is required",
      });
      setToggle(true);
    } else {
      setErrors({
        ...errors,
        ["description"]: "",
      });
      setToggle(false);
    }
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceUpdate({ ...deviceUpdate, address: e.target.value });
    if (!e.target.value) {
      setErrors({
        ...errors,
        ["address"]: "Address is required",
      });
      setToggle(true);
    } else {
      setErrors({
        ...errors,
        ["address"]: "",
      });
      setToggle(false);
    }
  };
  const handleChangeMaxEnergy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceUpdate({ ...deviceUpdate, maxEnergy: Number(e.target.value) });
    if (!e.target.value) {
      setErrors({
        ...errors,
        ["maxEnergy"]: "Max energy is required",
      });
      setToggle(true);
    } else {
      if (!(Number(e.target.value) > 0)) {
        setErrors({
          ...errors,
          ["maxEnergy"]: "Energy should be a positive number greater than 0",
        });
        setToggle(true);
      } else {
        setErrors({
          ...errors,
          ["maxEnergy"]: "",
        });
        setToggle(false);
      }
    }
  };
  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceUpdate({ ...deviceUpdate, userId: Number(e.target.value) });
    if (!e.target.value) {
      setErrors({
        ...errors,
        ["userId"]: "User id is required",
      });
      setToggle(true);
    } else {
      if (!(Number(e.target.value) >= 0)) {
        setErrors({
          ...errors,
          ["userId"]: "User id should be a postive number",
        });
        setToggle(true);
      } else {
        setErrors({
          ...errors,
          ["userId"]: "",
        });
        setToggle(false);
      }
    }
  };
  const handleSubmit = (e: React.MouseEvent) => {
    console.log(deviceUpdate);
    e.preventDefault();
    axios
      .put("https://localhost:8433/Carmen/api/device", deviceUpdate, headers)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert("User with id " + deviceUpdate.userId + " doesn't exist");
        // setMessage(error.response.data);
        // setError(true);
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
            defaultValue={device.name}
          />
          <p className="paragraph">{errors["name"]}</p>
        </Form.Group>

        <Form.Group onChange={handleChangeDescription}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description *"
            name="description"
            required
            defaultValue={device.description}
          />
          <p className="paragraph">{errors["description"]}</p>
        </Form.Group>

        <Form.Group onChange={handleChangeAddress}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address *"
            name="address"
            required
            defaultValue={device.address}
          />
          <p className="paragraph">{errors["address"]}</p>
        </Form.Group>

        <Form.Group onChange={handleChangeMaxEnergy}>
          <Form.Label>Max Energy</Form.Label>
          <Form.Control
            type="number"
            placeholder="Max Energy *"
            name="maxEnergy"
            required
            defaultValue={device.maxEnergy}
          />
          <p className="paragraph">{errors["maxEnergy"]}</p>
        </Form.Group>

        <Form.Group onChange={handleChangeUserId}>
          <Form.Label>User id</Form.Label>
          <Form.Control
            type="number"
            placeholder="User id *"
            name="userId"
            required
            defaultValue={device.userId}
          />
          <p className="paragraph">{errors["userId"]}</p>
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          disabled={toggle}
          className="display-b-d"
          onClick={handleSubmit}
        >
          Edit device
        </Button>
      </Form>
      {error && <Error setModalError={setError} message={message} />}
    </div>
  );
};

export default UpdateDevice;
