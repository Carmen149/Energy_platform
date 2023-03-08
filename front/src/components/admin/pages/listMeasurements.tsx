import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { MeasurementGet } from "../../../model/models";

export interface Props {
  id: number;
}
let headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  },
};
const ListMeasurements: React.FC<Props> = ({ id: id }) => {
  const [measurements, setMeasurements] = useState<MeasurementGet[]>([]);
  useEffect(() => {
    axios
      .get(
        "https://localhost:8433/Carmen/api/device/measurements/" + id,
        headers
      )
      .then((res) => {
        setMeasurements(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {measurements.length ? (
        <div className="tableContainer-device">
          <Table striped bordered hover size="sm">
            <thead className="thead-device">
              <tr>
                <th>Id</th>
                <th>Time</th>
                <th>Energy</th>
                <th>Device id</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((measurement, i) => (
                <tr key={i}>
                  <td>{measurement.id}</td>
                  <td>{measurement.time}</td>
                  <td>{measurement.energy}</td>
                  <td>{measurement.device.id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No measurements for this device</p>
      )}
    </div>
  );
};

export default ListMeasurements;
