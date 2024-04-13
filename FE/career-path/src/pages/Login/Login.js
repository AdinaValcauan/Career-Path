import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Login.css";
import {loginService} from "../../services/loginService";

function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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

    return (
        <div className="login-all">
            {/* <section className="login-container">
           <h2>Welcome</h2>
        <p>We're glad to see you again!</p>
    </section> */}

            <section className="login-form">
                <h1>Login</h1>
                <br></br>
                <br></br>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <input
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
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <br></br>
                    <button className="loginButton" type="submit">Login</button>
                </form>
                <p className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <br></br>
                <br></br>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </section>
        </div>
    );
}

export default Login;
