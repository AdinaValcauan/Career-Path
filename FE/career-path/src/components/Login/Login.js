import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Login.css";
import {loginService} from "../../services/loginService";

function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrMsg("");

        if (!userEmail || !userPassword) {
            setErrMsg("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        const {userRole, error} = await loginService(userEmail, userPassword);

        sessionStorage.setItem('userRole', userRole);

        if (error) {
            setErrMsg(error);
        } else if (userRole === "admin") {
            navigate("/mainpageadmin");
        } else {
            navigate("/mainpage");
        }

        setIsLoading(false);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-all">
            {/* <section className="login-container">
           <h2>Welcome</h2>
        <p>We're glad to see you again!</p>
    </section> */}

            <section className="login-form">
                <h1 className="h1-login">Autentificare</h1>
                <br></br>
                <br></br>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <input
                            className="input-login"
                            type="email"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <label htmlFor="password">
                        <div className="password-wrapper">
                            <input
                                className="input-login"
                                type={showPassword ? "text" : "password"}
                                placeholder="Parola"
                                id="password"
                                name="password"
                                value={userPassword}
                                onChange={(e) => {
                                    setUserPassword(e.target.value);
                                    setPasswordTouched(true);
                                }}
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <button type="button" onClick={handleShowPassword} className="toggle-password-visibility">
                                {showPassword ? <i className="fa-regular fa-eye-slash"></i> :
                                    <i className="fa-regular fa-eye"></i>}
                            </button>
                            </div>
                    </label>
                    <br></br>
                    <button className="login-button" type="submit">Autentifică-te</button>
                </form>
                <br></br>

                <p className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>

            </section>
        </div>
    );
}

export default Login;
