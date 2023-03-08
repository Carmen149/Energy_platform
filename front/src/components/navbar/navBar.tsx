import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { MdManageAccounts } from "react-icons/md";
import { navItems } from "./navItems";
import history from "../../utils/history";
const NavBar: React.FC = () => {
  const logout = (e: React.MouseEvent) => {
    sessionStorage.clear();
    history.push("/");
    window.location.reload();
  };
  return (
    <>
      <nav className="navbar-store">
        <Link to="" className="navbar-logo">
          Energy
          <MdManageAccounts />
        </Link>
        <ul className="nav-items">
          {navItems.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.title}
                  <span className="item-icon">
                    <item.icon />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* <div className="notif">4</div> */}
        <button
          className="btn-store"
          onClick={(e) => {
            logout(e);
          }}
        >
          LogOut
        </button>
      </nav>
    </>
  );
};

export default NavBar;
