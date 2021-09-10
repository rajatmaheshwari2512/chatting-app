import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Row, Modal, notification } from "antd";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = ({
  socket,
  rooms,
  setRooms,
  setCurrentRoom,
  setCurrentName,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomName, setRoomName] = useState("");
  const history = useHistory();
  const handleClick = (e) => {
    setCurrentRoom(e.target.className.split(" ")[1]);
    setCurrentName(e.target.innerText);
  };
  const handleCreate = () => {
    if (localStorage.getItem("token")) {
      const data = {
        roomid: null,
        name: roomName,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios
        .post(process.env.REACT_APP_API_URL + "/users/room", data, config)
        .then((resp) => {
          var temp = rooms.slice(0);
          temp.push(resp.data.room);
          setRooms(temp);
          socket.emit("room", { roomid: resp.data.room.roomid });
        })
        .catch((err) => {
          console.log(err);
        });
      setIsModalVisible(false);
    } else {
      history.push("/");
      notification.error({
        message: "Please Login First",
        description: "You are not logged in",
      });
    }
  };
  const handleOpen = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Row style={{ marginTop: "20%" }}>
      <div
        onClick={handleOpen}
        className="create-room"
        style={{
          height: "60px",
          width: "100%",
          borderTop: "1px solid gray",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <h3>
          <b>Create a new Chat Room</b>
        </h3>
      </div>
      <Modal
        title="Name your room"
        visible={isModalVisible}
        onOk={handleCreate}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Name your Chatroom"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </Modal>
      {rooms &&
        rooms.map((room) => {
          return (
            <div
              onClick={handleClick}
              className={"room-names " + room.roomid}
              key={room.roomid}
              style={{
                height: "60px",
                width: "100%",
                borderTop: "1px solid gray",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <h3
                style={{ height: "100%", width: "100%" }}
                className={"room-names " + room.roomid}
              >
                <b>{room.name}</b>
              </h3>
            </div>
          );
        })}
    </Row>
  );
};

export default Sidebar;
