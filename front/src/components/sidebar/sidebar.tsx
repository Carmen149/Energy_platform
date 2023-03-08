import React, { useState } from "react";
import { menuItem } from "./menuItem";
import { FaBars } from "react-icons/fa";
import "./sidebar.css";
import { MdOutlineFlashAuto } from "react-icons/md";
const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="container-sidebar">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            <MdOutlineFlashAuto />
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <li
            key={index}
            className="link"
            id={window.location.pathname === item.path ? "active" : ""}
            onClick={() => {
              window.location.pathname = item.path;
            }}
          >
            <div className="icon">
              <item.icon />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
