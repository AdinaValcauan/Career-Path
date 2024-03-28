import React, { useState } from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

import "./Menu.css";
import logo from "../../assets/logo.png";

class Menu extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="menu">
        {/* <i className="fas fa-brain"></i> */}
        {/* <h1 className="logo">Jurnal de Călătorie în carieră</h1> */}

        <img
          src={logo}
          alt="Jurnal de călătorie în carieră"
          className="logoc"
        />

        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {this.props.menuItems.map((item, index) => {
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
  }
}

export default Menu;
