import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { DeviceGet } from "../../model/models";
import NavBar from "../navbar/navBar";
import "../admin/pages/page.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Devices: React.FC = () => {
  const [devices, setDevices] = useState<DeviceGet[]>([]);
  let headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  useEffect(() => {
    var id = sessionStorage.getItem("user_id");
    axios
      .get("https://localhost:8433/Carmen/api/user/list/" + id, headers)
      .then((res) => {
        setDevices(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container_page_list">
      <NavBar />
      <div className="page">
        <div className="title-client">List of divices</div>
        <div className="tableContainer-list">
          <Table striped bordered hover size="sm" variant="light">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Max Energy</th>
                <th>Address</th>
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
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Devices;
