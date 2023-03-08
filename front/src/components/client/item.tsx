import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";
interface Props {}
export default function TodoItem() {
  return (
    <div
      className={true ? "todo-row complete" : "todo-row"}
      style={true ? { background: "orange" } : {}}
    >
      aici
      <div className="iconsContainer">
        <button className="important-btn">!</button>
        <RiCloseCircleLine style={{ marginRight: 5 }} />
        <BiCheckCircle />
      </div>
    </div>
  );
}
