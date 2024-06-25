import React, { Component } from "react";
import { useState, useEffect } from "react";
import "./Menu.css";
import log_reg1 from "../../assets/log_reg1.png";

const Menu = (props) => {
  const [clicked, setClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuClass = isMenuOpen ? "menu open" : "menu";

  return (
    <nav className={menuClass} onClick={handleMenuClick}>
      <img
        src={log_reg1}
        alt="Jurnal de călătorie în carieră"
        className="logoc"
      />

      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {props.menuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                <i className={item.icon}></i>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
