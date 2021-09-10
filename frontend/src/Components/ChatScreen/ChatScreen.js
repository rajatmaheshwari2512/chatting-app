import React, { useEffect, useState } from "react";
import { Row, Input } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ChatScreen.css";

const ChatScreen = ({ socket, currentRoom, currentName }) => {
  const history = useHistory();
  const [messages, setMessages] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const handleMessage = (e) => {
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
        var date = new Date();
        var time = date.toLocaleTimeString();
        temp.push({ sent_by: username, content: message, createdAt: time });
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
          for (var i = 0; i < resp.data.length; i++) {
            resp.data[i].createdAt = new Date(resp.data[i].createdAt);
            resp.data[i].createdAt =
              resp.data[i].createdAt.toLocaleTimeString();
          }
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
          <Row
            style={{
              width: "100%",
              height: "75vh",
              overflowY: "scroll",
              display: "inline-block",
            }}
          >
            {messages &&
              messages.map((message) => {
                return (
                  <div
                    style={{
                      border: "1px solid #1c1c1c",
                      borderRadius: "10px",
                      marginTop: "4%",
                      width: "25%",
                      backgroundColor: "#1c1c1c",
                    }}
                    key={message.createdAt}
                    className="message-container"
                  >
                    <p
                      style={{ paddingLeft: "5%", paddingTop: "3%" }}
                      className="message-sender"
                    >
                      <b>
                        <u>{message.sent_by}</u>
                      </b>
                    </p>
                    <div style={{ display: "flex" }}>
                      <p
                        style={{
                          float: "left",
                          width: "50%",
                          wordWrap: "break-word",
                          paddingLeft: "5%",
                        }}
                        className="message-text"
                      >
                        {message.content}
                      </p>
                      <p
                        style={{
                          float: "right",
                          width: "50%",
                          textAlign: "right",
                          paddingRight: "5%",
                        }}
                        className="message-timestamp"
                      >
                        {message.createdAt}
                      </p>
                    </div>
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
