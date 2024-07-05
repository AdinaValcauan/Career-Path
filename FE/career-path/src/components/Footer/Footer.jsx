import "./Footer.css";
import React from "react";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer>
            <div className="footer">
                <div className="top-part">
                    <div>
                        <h1>Jurnal de călătorie în carieră</h1>
                    </div>
                    <div className="hrefs">
                        <a href="https://www.facebook.com/consiliereuniversitateatehnica/">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="https://consiliere.utcluj.ro">
                            <i className=" fa-solid fa-globe"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
