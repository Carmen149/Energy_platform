import React, { useEffect, useState } from "react";
import NavBar from "../navbar/navBar";
import "../admin/pages/page.css";
import BasicDateTimePicker from "../admin/datePicker";
import dayjs, { Dayjs } from "dayjs";
import { DeviceUpdate, Measurement } from "../../model/models";
import { Button } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import BasicDatePicker from "../admin/datePicker";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Energy: React.FC = () => {
  const [time1, setTime1] = useState<Dayjs | null>(dayjs(1668031200000));
  const [time2, setTime2] = useState<Dayjs | null>(dayjs(1668117599000));
  const [devices, setDevices] = useState<DeviceUpdate[]>([]);
  const [device, setDevice] = useState<string>("");
  const [id, setId] = useState<number>();
  const [meas, setMeas] = useState<Measurement[]>([]);
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];
  let headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  useEffect(() => {
    var id = sessionStorage.getItem("user_id");
    setId(Number(id));
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
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setDevice(event.target.value);
  };
  const handleClick = (e: React.MouseEvent) => {
    console.log(device);
    axios
      .get(
        "https://localhost:8433/Carmen/api/measurements/time/" +
          device +
          "/" +
          time1 +
          "/" +
          time2,
        headers
      )
      .then((res) => {
        console.log(res);
        setMeas(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container_page_list">
      <NavBar />
      <div className="container-box">
        <div className="title-chart">Energy consumption</div>
        <div className="display-line">
          <div className="display-date">
            <BasicDateTimePicker setTime={setTime1} />
          </div>
          <div className="display-date">
            <BasicDatePicker setTime={setTime2} />
          </div>
          <div className="display-menu">
            <FormControl variant="standard" sx={{ m: 0, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Device
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={device}
                onChange={handleChange}
                label="Age"
              >
                {devices.map((device, i) => (
                  <MenuItem value={device.id} key={i}>
                    {device.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button className="submit-c" onClick={handleClick}>
            Generate
          </Button>
        </div>
        <div className="display_chart">
          <BarChart width={600} height={300} data={meas}>
            <XAxis dataKey="time" stroke="#8884d8" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
            <Legend
              width={100}
              wrapperStyle={{
                top: 40,
                right: 20,
                backgroundColor: "#f5f5f5",
                border: "1px solid #d5d5d5",
                borderRadius: 3,
                lineHeight: "40px",
              }}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="energy" fill="#8884d8" barSize={30} />
          </BarChart>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Energy;
