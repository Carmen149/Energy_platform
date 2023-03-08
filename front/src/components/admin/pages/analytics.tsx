import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./page.css";
import history from "../../../utils/history";
import { DeviceGet } from "../../../model/models";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
const Analytics: React.FC = () => {
  const [devicesA, setDevicesA] = useState<DeviceGet[]>([]);
  const [devicesNa, setDevicesNa] = useState<DeviceGet[]>([]);
  const [id, setId] = useState<number>();
  let headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const back = (e: React.MouseEvent) => {
    history.push("/user");
    window.location.reload();
  };
  const add = (e: React.MouseEvent, idDevice: number) => {
    axios
      .get(
        "https://localhost:8433/Carmen/api/user/add/" + id + "/" + idDevice,
        headers
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://localhost:8433/Carmen/api/user/list/" + id, headers)
      .then((res) => {
        console.log(res.data);
        setDevicesA(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://localhost:8433/Carmen/api/user/list/1", headers)
      .then((res) => {
        console.log(res.data);
        setDevicesNa(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const remove = (e: React.MouseEvent, idDevice: number) => {
    axios
      .get("https://localhost:8433/Carmen/api/user/remove/" + idDevice, headers)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://localhost:8433/Carmen/api/user/list/" + id, headers)
      .then((res) => {
        console.log(res.data);
        setDevicesA(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://localhost:8433/Carmen/api/user/list/1", headers)
      .then((res) => {
        console.log(res.data);
        setDevicesNa(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    let id: number = Number(sessionStorage.getItem("client_id"));
    setId(id);
    axios
      .get("https://localhost:8433/Carmen/api/user/list/" + id, headers)
      .then((res) => {
        console.log(res.data);
        setDevicesA(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://localhost:8433/Carmen/api/user/list/1", headers)
      .then((res) => {
        console.log(res.data);
        setDevicesNa(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container_page_list">
      <div className="display-item-b">
        <BiArrowBack
          onClick={(e) => {
            back(e);
          }}
        ></BiArrowBack>
      </div>

      <div className="page">
        <div className="title-style-1">Devices associated with the client </div>
        <div className="tableContainer-list-1">
          <Table striped bordered hover size="sm" variant="light">
            <thead>
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center" style={{ width: "70px" }}>
                  Name
                </th>
                <th className="text-center">Description</th>
                <th className="text-center">Address</th>
                <th className="text-center" style={{ width: "70px" }}>
                  Max Energy
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {devicesA.map((device, i) => (
                <tr key={i}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{device.description}</td>
                  <td>{device.address}</td>
                  <td>{device.maxEnergy}</td>
                  <td className="display-item">
                    <AiFillMinusCircle
                      onClick={(e) => {
                        remove(e, device.id);
                      }}
                    ></AiFillMinusCircle>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="title-style-1">
          Devices that are not associated with a client
        </div>
        <div className="tableContainer-list-1">
          <Table striped bordered hover size="sm" variant="light">
            <thead>
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center" style={{ width: "70px" }}>
                  Name
                </th>
                <th className="text-center">Description</th>
                <th className="text-center">Address</th>
                <th className="text-center" style={{ width: "70px" }}>
                  Max Energy
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {devicesNa.map((device, i) => (
                <tr key={i}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{device.description}</td>
                  <td>{device.address}</td>
                  <td>{device.maxEnergy}</td>
                  <td className="display-item">
                    <AiFillPlusCircle
                      onClick={(e) => {
                        add(e, device.id);
                      }}
                    ></AiFillPlusCircle>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
