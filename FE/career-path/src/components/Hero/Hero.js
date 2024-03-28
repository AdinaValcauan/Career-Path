import "./Hero.css";
import coerb1 from "../../assets/coerb1.jpg";

function Hero(props) {
    return (
        <>
            <div className={props.hname}>
                <img src={coerb1} alt="Hero Image" className="hero-image"/>

                <div className="text">
                    <h1 className="hero-title">Jurnal de Călătorie în carieră</h1>
                    <p className="hero-subtitle">
                        visează departe, planifică răbdător, acționează încrezător
                    </p>
                    <a href="details" className="buttonDetails">
                        Find out more
                    </a>
                </div>
            </div>
        </>
    );
}

export default Hero;
