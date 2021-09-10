import React from "react";
import { Row } from "antd";
import "./Sidebar.css";

const Sidebar = ({ rooms, setCurrentRoom, setCurrentName }) => {
  const handleClick = (e) => {
    setCurrentRoom(e.target.className.split(" ")[1]);
    setCurrentName(e.target.innerText);
  };
  return (
    <Row style={{ marginTop: "20%" }}>
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
                {room.name}
              </h3>
            </div>
          );
        })}
    </Row>
  );
};

export default Sidebar;
