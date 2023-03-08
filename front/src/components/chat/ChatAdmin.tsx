import * as React from "react";
import "./ChatStyle.css";
import avatar from "../../avatar/avatar.jpg";
import { Badge, ListGroup } from "react-bootstrap";
import Sidebar from "../sidebar/sidebar";
import { Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import "./ChatStyle.css";
import { RiSendPlaneFill } from "react-icons/ri";
import { ChatMessage } from "../../model/models";
import { BsBellFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
var stompClient: any = null;
const ChatAdmin: React.FC = () => {
  const SOCKET_URL = "https://localhost:8433/Carmen/socket";
  const [tab, setTab] = useState<string>("CHATROOM");
  const [senderNotif, setSenderNotif] = useState<string>("");
  const notif: string = "Unread message";
  const [checkNotif, setCheckNotif] = useState<boolean>(false);
  const [checkBell, setCheckBell] = useState<boolean>(false);
  const username = sessionStorage.getItem("user_name");
  const [message, setMessage] = useState<string>("");
  const [checkChatRoom, setCheckChatRoom] = useState<boolean>(false);
  const [privateMessages, setprivateMessages] = useState<
    Map<string, ChatMessage[]>
  >(new Map());
  const [publicMessages, setPublicMessages] = useState<ChatMessage[]>([]);
  const admin: string = "wanna_12";
  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    console.log("Connecting...");
    var socket = new SockJS(SOCKET_URL);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
    stompClient.subscribe(
      "/chatuser/" + username + "/private",
      onPrivateMessageReceived
    );
    stompClient.subscribe("/chatuser/" + username + "/typing", messageTyping);
    userJoin();
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onPublicMessageReceived = (payload: any) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateMessages.get(payloadData.senderName)) {
          privateMessages.set(payloadData.senderName, []);
          setprivateMessages(new Map(privateMessages));
        }
        break;
      case "MESSAGE":
        publicMessages.push(payloadData);
        setPublicMessages([...publicMessages]);
        if (payloadData.senderName != username) {
          setCheckChatRoom(true);
        }
        break;
      default:
        break;
    }
  };

  const onPrivateMessageReceived = (payload: any) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateMessages.get(payloadData.senderName)) {
      privateMessages.get(payloadData.senderName).push(payloadData);
      setprivateMessages(new Map(privateMessages));
      setCheckNotif(true);
      setCheckBell(true);
      setSenderNotif(payloadData.senderName);
    } else {
      let list: ChatMessage[] = [];
      list.push(payloadData);
      privateMessages.set(payloadData.senderName, list);
      setprivateMessages(new Map(privateMessages));
      setCheckNotif(true);
      setCheckBell(true);
      setSenderNotif(payloadData.senderName);
    }
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const value = event.target.value;
    setMessage(value);
    var chatMessage = {
      senderName: username,
      receiverName: tab,
      message: "typing",
      status: "MESSAGE",
    };
    console.log(chatMessage);
    stompClient.send("/app/private-typing", {}, JSON.stringify(chatMessage));
  };

  const sendPublicMessage = (event: React.MouseEvent) => {
    if (stompClient) {
      var chatMessage = {
        senderName: username,
        message: message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setMessage(" ");
    }
  };

  const sendPrivateMessage = (event: React.MouseEvent) => {
    console.log(admin);
    if (stompClient) {
      var chatMessage = {
        senderName: username,
        receiverName: tab,
        message: message,
        status: "MESSAGE",
      };
      console.log(message);
      if (username != tab) {
        privateMessages.get(tab).push(chatMessage);
        setprivateMessages(new Map(privateMessages));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      stompClient.subscribe("/chatuser/" + tab + "/seen", messageSeen);
      setMessage("");
    }
  };

  const messageSeen = (payload: any) => {
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData.receiverName);
    console.log(privateMessages.get(payloadData.receiverName));
    privateMessages
      .get(payloadData.receiverName)
      .map((chat, index) => (chat.status = "SEEN"));
    setprivateMessages(new Map(privateMessages));
  };
  const seen = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: tab,
        receiverName: username,
      };
      console.log(chatMessage);
      stompClient.send("/app/private-seen", {}, JSON.stringify(chatMessage));
      setCheckBell(false);
      setCheckChatRoom(false);
    }
  };
  const messageTyping = (payload: any) => {
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData.receiverName);
    toast.info(payloadData.senderName + " typing", {
      position: "top-center",
      autoClose: 200,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="container-list">
      <Sidebar />
      <div className="display-list">
        <ListGroup as="ol">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            action={true}
            onClick={() => {
              setTab("CHATROOM");
              setCheckChatRoom(false);
            }}
          >
            {checkChatRoom ? (
              <div style={{ display: "block" }}>
                <Badge bg="danger" pill>
                  <BsBellFill />
                </Badge>
                ChatRoom
              </div>
            ) : (
              <div> ChatRoom</div>
            )}
          </ListGroup.Item>
          {[...privateMessages.keys()].map((user, index) =>
            user != admin ? (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                action={true}
                onClick={() => {
                  setTab(user);
                  setCheckNotif(false);
                  console.log(user);
                }}
                key={index}
              >
                <img src={avatar} className="avatar-display" />
                <div className="content-display">
                  <div className="fw-bold">{user}</div>
                  {user == senderNotif ? (
                    checkNotif ? (
                      <div>{notif}</div>
                    ) : (
                      <div></div>
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
                {user == senderNotif ? (
                  checkBell ? (
                    <Badge bg="danger" pill>
                      <BsBellFill />
                    </Badge>
                  ) : (
                    <div></div>
                  )
                ) : (
                  <div></div>
                )}
              </ListGroup.Item>
            ) : (
              <></>
            )
          )}
        </ListGroup>
      </div>

      {tab == "CHATROOM" && (
        <div className="chat-content">
          <footer className="chat-messages">
            {publicMessages.map((chat, index) => (
              <ul>
                {username == chat.senderName && (
                  <div>
                    <div className="message-chat-receiver" key={index}>
                      <div className="message-text-receiver">
                        {chat.message}
                      </div>
                      <div className="sent-by">
                        {"Sent by " + chat.senderName}
                      </div>
                    </div>
                  </div>
                )}
                {username != chat.senderName && (
                  <div>
                    <div className="message-chat-sender" key={index}>
                      <div className="message-text-sender">{chat.message}</div>
                      <div className="sent-by">
                        {"Sent by " + chat.senderName}
                      </div>
                    </div>
                  </div>
                )}
              </ul>
            ))}
          </footer>
          <footer className="display-text-area">
            <input
              type="text"
              value={message}
              className="text-area"
              onChange={handleMessage}
            ></input>
            <span className="icon-display">
              <RiSendPlaneFill onClick={sendPublicMessage} />
            </span>
          </footer>
        </div>
      )}
      {tab != "CHATROOM" && (
        <div className="chat-content">
          <footer className="chat-messages" onClick={seen}>
            {[...privateMessages.get(tab)]?.map((chat, index) => (
              <ul>
                {username == chat.senderName && (
                  <div className="message-chat-receiver" key={index}>
                    <div className="message-text-receiver">{chat.message}</div>
                    <div className="sent-by">
                      {"Sent by " + chat.senderName}
                    </div>
                  </div>
                )}
                {username != chat.senderName && (
                  <div className="message-chat-sender" key={index}>
                    <div className="message-text-sender">{chat.message}</div>
                    <div className="sent-by">
                      {"Sent by " + chat.senderName}
                    </div>
                  </div>
                )}
                {chat.senderName !== tab ? (
                  chat.status == "SEEN" ? (
                    <div className="seen">Seen</div>
                  ) : (
                    <div></div>
                  )
                ) : (
                  <div></div>
                )}
              </ul>
            ))}
          </footer>
          <footer className="display-text-area">
            <input
              type="text-area"
              value={message}
              className="text-area"
              onChange={handleMessage}
              onClick={seen}
            ></input>
            <span className="icon-display">
              <RiSendPlaneFill onClick={sendPrivateMessage} />
            </span>
          </footer>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ChatAdmin;
