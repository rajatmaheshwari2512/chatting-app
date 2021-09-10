import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ChatScreen = ({ currentRoom }) => {
  const history = useHistory();
  const [messages, setMessages] = useState(null);
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
          console.log(resp.data);
          setMessages(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);
  return (
    <>
      {messages &&
        messages.map((message) => {
          return (
            <div className="message-container">
              <p className="message-sender">{message.sent_by}</p>
              <p className="message-text">{message.content}</p>
            </div>
          );
        })}
    </>
  );
};

export default ChatScreen;
