import { Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import "./ChatStyle.css";
import { RiSendPlaneFill } from "react-icons/ri";
import NavBar from "../navbar/navBar";
import { ChatMessage } from "../../model/models";
import { Badge } from "react-bootstrap";
import { BsBellFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
var stompClient: any = null;
const ChatClient: React.FC = () => {
  const SOCKET_URL = "https://localhost:8433/Carmen/socket";
  const [tab, setTab] = useState<string>("CHATROOM");
  const [checkNotif, setCheckNotif] = useState<boolean>(false);
  const [checkChatRoom, setCheckChatRoom] = useState<boolean>(false);
  const username = sessionStorage.getItem("user_name");
  const [message, setMessage] = useState<string>(" ");
  const [privateMessages, setprivateMessages] = useState<
    Map<string, ChatMessage[]>
  >(new Map());
  const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
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
    let list: ChatMessage[] = [];
    privateMessages.set(admin, list);
    setprivateMessages(new Map(privateMessages));
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
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
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
    } else {
      let list: ChatMessage[] = [];
      list.push(payloadData);
      privateMessages.set(payloadData.senderName, list);
      setprivateMessages(new Map(privateMessages));
      setCheckNotif(true);
    }
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMessage(value);
    var chatMessage = {
      senderName: username,
      receiverName: admin,
      message: "typing",
      status: "MESSAGE",
    };
    stompClient.send("/app/private-typing", {}, JSON.stringify(chatMessage));
  };

  const sendPublicMessage = () => {
    setMessage(" ");

    if (stompClient) {
      var chatMessage = {
        senderName: username,
        message: message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }
  };

  const sendPrivateMessage = () => {
    setMessage(" ");
    if (stompClient) {
      var chatMessage = {
        senderName: username,
        receiverName: tab,
        message: message,
        status: "MESSAGE",
      };

      if (username !== tab) {
        privateMessages.get(tab).push(chatMessage);
        setprivateMessages(new Map(privateMessages));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      stompClient.subscribe("/chatuser/" + tab + "/seen", messageSeen);
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
  const messageTyping = (payload: any) => {
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData.senderName);
    toast.info("Admin typing", {
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
  const seen = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: tab,
        receiverName: username,
      };
      console.log(chatMessage);
      stompClient.send("/app/private-seen", {}, JSON.stringify(chatMessage));
      setCheckNotif(false);
    }
  };

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <div className="container-client">
        <div className="display-list-client">
          <div className="member-list">
            <ul style={{ listStyleType: "none" }}>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                  setCheckChatRoom(false);
                }}
                className={`member ${tab == "CHATROOM" && "active"}`}
              >
                {checkChatRoom ? (
                  <div style={{ display: "block" }}>
                    <Badge bg="danger" pill>
                      <BsBellFill />
                    </Badge>
                    ChatRoom
                  </div>
                ) : (
                  <div>ChatRoom</div>
                )}
              </li>
              <li
                onClick={() => {
                  setTab(admin);
                  setCheckNotif(false);
                }}
                className={`member ${tab == admin && "active"}`}
              >
                {checkNotif ? (
                  <div style={{ display: "block" }}>
                    <Badge bg="danger" pill>
                      <BsBellFill />
                    </Badge>
                    Admin
                  </div>
                ) : (
                  <div>Admin</div>
                )}
              </li>
            </ul>
          </div>
        </div>
        {tab == "CHATROOM" && (
          <div className="chat-content-client">
            <footer className="chat-messages-client">
              {publicChats.map((chat, index) => (
                <ul>
                  {username == chat.senderName && (
                    <div className="message-chat-sender" key={index}>
                      <div className="message-text-sender">{chat.message}</div>
                      <div className="sent-by">
                        {"Sent by " + chat.senderName}
                      </div>
                    </div>
                  )}
                  {username != chat.senderName && (
                    <div className="message-chat-receiver" key={index}>
                      <div className="message-text-receiver">
                        {chat.message}
                      </div>
                      <div className="sent-by">
                        {"Sent by " + chat.senderName}
                      </div>
                    </div>
                  )}
                </ul>
              ))}
            </footer>
            <footer className="display-text-area-client">
              <input
                type="text"
                value={message}
                className="text-area"
                onChange={handleMessage}
              ></input>
              <span className="icon-display">
                <RiSendPlaneFill onClick={sendPublicMessage} id="send" />
              </span>
            </footer>
          </div>
        )}
        {tab != "CHATROOM" && (
          <div className="chat-content-client">
            <footer className="chat-messages-client" onClick={seen}>
              {[...privateMessages.get(tab)]?.map((chat, index) => (
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
                        <div className="message-text-sender">
                          {chat.message}
                        </div>
                        <div className="sent-by">
                          {"Sent by " + chat.senderName}
                        </div>
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
            <footer className="display-text-area-client">
              <input
                type="text"
                value={message}
                className="text-area"
                id="my_text"
                onChange={handleMessage}
                onClick={seen}
              ></input>
              <span className="icon-display">
                <RiSendPlaneFill onClick={sendPrivateMessage} id="send" />
              </span>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatClient;
