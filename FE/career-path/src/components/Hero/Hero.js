import "./Hero.css";
import coerb1 from "../../assets/coerb1.jpg";

function Hero(props) {
    return (
        <>
            <div className={props.hname}>
                <img src={props.image} alt="Hero Image" className="hero-image"/>

                <div className="hero-text">
                    <h1 className="hero-title">{props.title}</h1>
                    <p className="hero-subtitle">{props.subtitle}</p>
                    <a href={props.link} className="buttonDetails">
                        {props.buttonText}
                    </a>
                </div>
            </div>
        </>
    );
}

export default Hero;
