import React, {Component} from "react";
import {useState, useEffect} from "react";
import "./Menu.css";
import logo from "../../assets/logo.png";


const Menu = (props) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
        const isScroll = window.scrollY > 50;
        setIsScrolling(isScroll);

    };

    document.addEventListener("scroll", handleScroll);
    return () => {
    document.removeEventListener("scroll", handleScroll);
};
}, []);

    const handleClick = () => {
        setClicked(!clicked);
    };

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the isMenuOpen state variable when the menu is clicked
    };

    const menu = isScrolling ? 'menu small' : 'menu';
    const menuClass = isMenuOpen ? `${menu} open` : menu;

        return (
            <nav className={menuClass} onClick={handleMenuClick}>
                {/* <i className="fas fa-brain"></i> */}
                {/* <h1 className="logo">Jurnal de Călătorie în carieră</h1> */}

                <img
                    src={logo}
                    alt="Jurnal de călătorie în carieră"
                    className="logoc"
                />

                <div className="menu-icon" onClick={handleClick}>
                    <i
                        className={clicked ? "fas fa-times" : "fas fa-bars"}
                    ></i>
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

}

export default Menu;
