import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { Row, Col } from "antd";

import Sidebar from "../Sidebar/Sidebar";
import ChatScreen from "../ChatScreen/ChatScreen";

let socket;

const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;

const Chat = ({ location }) => {
  const history = useHistory();

  const [rooms, setRooms] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentName, setCurrentName] = useState(null);

  useEffect(() => {
    socket = io(ENDPOINT);
    const username = JSON.parse(localStorage.getItem("user")).username;
    socket.emit("join", { username }, (error) => {
      if (error) {
        history.push("/");
      }
    });
  }, [location.search, history]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios
        .get(process.env.REACT_APP_API_URL + "/rooms", config)
        .then((resp) => {
          setRooms(resp.data);
        })
        .catch((err) => {
          history.push("/");
          console.log(err);
        });
    } else {
      history.push("/");
    }
  }, [history]);
  return (
    <Row>
      <Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={1} />
      <Col xxl={5} xl={5} lg={5} md={5} sm={5} xs={5}>
        <Sidebar
          socket={socket}
          rooms={rooms}
          setRooms={setRooms}
          setCurrentRoom={setCurrentRoom}
          setCurrentName={setCurrentName}
        />
      </Col>
      <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2} />
      <Col xxl={15} xl={15} lg={15} md={15} sm={15} xs={15}>
        <ChatScreen
          socket={socket}
          currentRoom={currentRoom}
          currentName={currentName}
        />
      </Col>
      <Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={1} />
    </Row>
  );
};
export default Chat;
