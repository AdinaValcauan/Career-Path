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
                        <div className="hrefs">
                            <p className="footer-text"> Str. Memorandumului nr. 28, Cluj-Napoca, jud. Cluj,
                                România <br/>
                                Telefon: 0264 401 547</p>
                            <a href="https://www.facebook.com/consiliereuniversitateatehnica/">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="https://consiliere.utcluj.ro">
                                <i className=" fa-solid fa-globe"></i>
                            </a>
                        </div>
                    </div>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.700601548295!2d23.582424511496118!3d46.7707976451993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490f3e2c7053b7%3A0xb75fa0da9a05d205!2sCCOC%20-%20Centrul%20de%20Consiliere%20%C8%99i%20Orientare%20%C3%AEn%20Carier%C4%83!5e0!3m2!1sro!2sro!4v1720203115182!5m2!1sro!2sro"
                            style={{border: 0}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
                <div className="right-part">

                </div>
            </div>
        </footer>
    );
};

export default Footer;
