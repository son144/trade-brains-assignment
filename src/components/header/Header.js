import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <div className="header">
        <h2>Screen</h2>
      </div>
      <ul className="navbar">
        <li>
          <NavLink activeClassName="label" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="label" to="/watchlist">
            Watchlist
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
