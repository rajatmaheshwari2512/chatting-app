import React, { useEffect, useState } from "react";
import { Row, Input } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ChatScreen.css";

const ChatScreen = ({ socket, currentRoom, currentName }) => {
  const history = useHistory();
  const [messages, setMessages] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const handleMessage = () => {
    if (currentMessage.length > 0) {
      const username = JSON.parse(localStorage.getItem("user")).username;
      socket.emit("message", { currentMessage, currentRoom, username });
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    if (socket && messages) {
      socket.on("message", ({ message, username, roomid }) => {
        var temp = messages.slice(0);
        temp.push({ sent_by: username, content: message });
        setMessages(temp);
      });
    }
  }, [socket, messages]);
  useEffect(() => {
    if (currentRoom && localStorage.getItem("token")) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios
        .get(
          process.env.REACT_APP_API_URL + "/rooms/messages/" + currentRoom,
          config
        )
        .then((resp) => {
          setMessages(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, [currentRoom, history]);
  return (
    <>
      {currentRoom && currentName ? (
        <div style={{ height: "93vh" }}>
          <Row style={{ marginTop: "5%" }}>
            <h1>
              <b>{currentName}</b>
            </h1>
          </Row>
          <Row>
            {messages &&
              messages.map((message) => {
                return (
                  <div key={message.createdAt} className="message-container">
                    <p className="message-sender">{message.sent_by}</p>
                    <p className="message-text">{message.content}</p>
                  </div>
                );
              })}
          </Row>
          <Row>
            <Input
              bordered={false}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              style={{
                outline: "none",
                border: "1px solid gray",
                position: "absolute",
                bottom: "5%",
                height: "50px",
                width: "100%",
                borderRadius: "50px",
              }}
              onPressEnter={handleMessage}
              className="chat-input"
              placeholder="Your Message Here"
            />
          </Row>
        </div>
      ) : (
        <h1
          style={{
            marginTop: "10%",
          }}
        >
          Select a Room to send messages to, or create a room
        </h1>
      )}
    </>
  );
};

export default ChatScreen;
