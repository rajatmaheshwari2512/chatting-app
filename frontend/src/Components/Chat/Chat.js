import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { Row, Col } from "antd";

import Sidebar from "../Sidebar/Sidebar";
import ChatScreen from "../ChatScreen/ChatScreen";

const Chat = ({ location }) => {
  const history = useHistory();

  const [rooms, setRooms] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

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
          console.log(resp.data);
          setRooms(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push("/");
    }
  }, []);
  return (
    <Row>
      <Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={1} />
      <Col xxl={5} xl={5} lg={5} md={5} sm={5} xs={5}>
        <Sidebar rooms={rooms} setCurrentRoom={setCurrentRoom} />
      </Col>
      <Col xxl={17} xl={17} lg={17} md={17} sm={17} xs={17}>
        <ChatScreen currentRoom={currentRoom} />
      </Col>
      <Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={1} />
    </Row>
  );
};
export default Chat;
