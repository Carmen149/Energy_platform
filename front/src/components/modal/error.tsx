import React from "react";
import "./modal.css";
interface Props {
  setModalError: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}
const Error: React.FC<Props> = ({ setModalError, message }) => {
  return (
    <div className="overlay">
      <div className="error">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalError(false);
            }}
          >
            X
          </button>
        </div>
        <p className="body_error">{message}</p>
      </div>
    </div>
  );
};

export default Error;
