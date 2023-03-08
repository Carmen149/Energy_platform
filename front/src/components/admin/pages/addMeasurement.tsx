import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Dayjs } from "dayjs";
import BasicDateTimePicker from "./dateTimePicker";
import axios from "axios";
interface Props {
  id: number;
}
const AddMeasurement: React.FC<Props> = ({ id: id }) => {
  const [energy, setEnergy] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [time, setTime] = useState<Dayjs | null>();
  const [toggle, setToggle] = useState<boolean>(false);
  let headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const handleChangeEnergy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnergy(Number(e.target.value));
    if (!e.target.value) {
      setError("Max energy is required");
      setToggle(true);
    } else {
      if (!(Number(e.target.value) > 0)) {
        setError("Energy should be a positive number greater than 0");
        setToggle(true);
      } else {
        setError("");
        setToggle(false);
      }
    }
  };
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(time.format("DD-MM-YYYY hh:mm"));
    console.log(energy);
    axios
      .post(
        "https://localhost:8433/Carmen/api/measurements",
        {
          time: time.format("DD-MM-YYYY hh:mm"),
          energy: energy,
          deviceId: id,
        },
        headers
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        <Form>
          <Form.Group onChange={handleChangeEnergy}>
            <Form.Label>Energy</Form.Label>
            <Form.Control
              type="number"
              placeholder="Energy *"
              name="energy"
              defaultValue={energy}
              required
            />
            <p className="paragraph">{error}</p>
          </Form.Group>
          <br></br>
          <Form.Group>
            <BasicDateTimePicker setTime={setTime} />
          </Form.Group>
          <br></br>
          <Button
            variant="success"
            type="submit"
            disabled={toggle}
            className="display-b-m"
            onClick={handleSubmit}
          >
            Add measurement
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddMeasurement;
