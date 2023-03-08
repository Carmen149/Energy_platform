import React, { useEffect, useState } from "react";
import { Message, User } from "../../model/models";
import { axiosInstanceAuth } from "../../utils/axios";
import axios from "axios";
import NavBar from "../navbar/navBar";
import "../admin/pages/page.css";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home: React.FC = () => {
  const [user, setUser] = useState<User>();
  let headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  useEffect(() => {
    let id: number = Number(sessionStorage.getItem("user_id"));

    axios
      .get("https://localhost:8433/Carmen/api/user/" + id, headers)

      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
    connect();
  }, []);
  const connect = () => {
    console.log("In Connect");
    const URL = "https://localhost:8433/Carmen/socket";
    const websocket = new SockJS(URL);

    const stompClient = Stomp.over(websocket);
    stompClient.connect({}, function (frame: string) {
      console.log("Conectat la " + frame);
      stompClient.subscribe("/topic/socket/notif", (notification) => {
        let id: number = Number(sessionStorage.getItem("user_id"));
        let notif: Message = JSON.parse(notification.body);
        if (notif.userId == id) {
          let message: String =
            notif.message + " for device with id: " + notif.deviceId;
          console.log(message);
          notify(message);
        }
      });
    });
  };
  const notify = (message: String) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <div>
      <NavBar />
      <div className="title-style-2">Welcome!</div>
      <p className="paragraph-style">
        We are happy to see you again. Please stay connected with us because we
        want you to have a good experience.
      </p>
      <ToastContainer />
    </div>
  );
};
export default Home;
