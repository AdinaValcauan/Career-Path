import React from "react";
import "./Hero.css";
import { scrollToElement} from "../../utils/scrollToElement";

function Hero({ scrollToSelector, ...props}) {
    const handleButtonClick = () => {
        scrollToElement(scrollToSelector);
    };

    return (
        <>
            <div className="hero-container">
                <div className={props.hname}>
                    <img src={props.image} alt="Hero Image" className="hero-image"/>

                    <div className="hero-text">
                        <h1 className="hero-title">{props.title}</h1>
                        <p className="hero-subtitle">{props.subtitle}</p>
                        <button onClick={handleButtonClick} className="buttonDetails">
                            {props.buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;
