import React from "react";
import { Button } from "react-bootstrap";
import "./modal.css";
interface Props {
  setModalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}
const Success: React.FC<Props> = ({ setModalSuccess, message }) => {
  return (
    <div className="overlay">
      <div className="error">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalSuccess(false);
            }}
          >
            X
          </button>
        </div>
        <p className="body_success">{message}</p>
      </div>
    </div>
  );
};

export default Success;
