import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { DeviceGet } from "../../../../model/models";
import { axiosInstanceAuth } from "../../../../utils/axios";

export interface Props {
  id: number;
}
const ListDevices: React.FC<Props> = ({ id: id }) => {
  const [devices, setDevices] = useState<DeviceGet[]>([]);
  let headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  useEffect(() => {
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
    <div>
      {devices.length ? (
        <div className="tableContainer-device">
          <Table striped bordered hover size="sm">
            <thead className="thead-device">
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Address</th>
                <th>Maximum energy</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device, i) => (
                <tr key={i}>
                  <td>{device.id}</td>
                  <td>{device.description}</td>
                  <td>{device.address}</td>
                  <td>{device.maxEnergy}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No devices for this user</p>
      )}
    </div>
  );
};

export default ListDevices;
