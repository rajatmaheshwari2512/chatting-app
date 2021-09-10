import React from "react";

const Sidebar = ({ rooms, setCurrentRoom }) => {
  const handleClick = (e) => {
    setCurrentRoom(e.target.class);
  };
  return (
    <>
      {rooms &&
        rooms.map((room) => {
          return (
            <div
              onClick={handleClick}
              className={room.roomid}
              key={room.roomid}
              style={{ width: "100%" }}
            >
              <h3>{room.name}</h3>
            </div>
          );
        })}
    </>
  );
};

export default Sidebar;
