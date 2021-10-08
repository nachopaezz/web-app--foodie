import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing">
      <div className="acomodar">
          <div className="title"><b>FoodHub</b></div>
        <NavLink to="/home">
          <button className="boton">✔</button>
        </NavLink>
        <div className="SubTitle"><b>Let's cook!</b></div>
      </div>
    </div>
  );
}

export default LandingPage;
