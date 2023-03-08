import React from "react";
import { Table } from "react-bootstrap";
import { DeviceGet, User } from "../../model/models";
import "./modal.css";
interface Props {
  setModalGet: React.Dispatch<React.SetStateAction<boolean>>;
  user?: User;
  device?: DeviceGet;
}
const CustomModal: React.FC<Props> = ({ setModalGet, user, device }) => {
  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalGet(false);
            }}
          >
            X
          </button>
        </div>
        {user ? (
          <div>
            <div className="title">Get user by id</div>
            <div className="body">
              <Table striped bordered hover variant="dark">
                <tbody>
                  <tr>
                    <td>Id</td>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>{user.role}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {device ? (
          <div>
            <div className="titleDevice">Get device by id</div>
            <div className="body">
              <Table striped bordered hover variant="dark">
                <tbody>
                  <tr>
                    <td>Id</td>
                    <td>{device.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{device.name}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{device.description}</td>
                  </tr>
                  <tr>
                    <td>Max energy</td>
                    <td>{device.maxEnergy}</td>
                  </tr>
                  <tr>
                    <td>User</td>
                    {device.user ? <td>{device.user.username}</td> : <td>-</td>}
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="footer">
          <button
            onClick={() => {
              setModalGet(false);
            }}
            id="cancelBtn"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
