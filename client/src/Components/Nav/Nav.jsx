import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Nav({ onSearch }) {
  return (
    <nav className="nav">
      <NavLink to="/">
        <span className="titulo">
          <div className="foodhub">FoodHub</div>
          <div className="inicio">Entry</div>
        </span>
      </NavLink>
      <SearchBar />
    </nav>
  );
}

export default Nav;
