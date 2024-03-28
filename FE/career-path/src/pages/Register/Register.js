import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Register.css";
import {registerService} from "../../services/registerService";
import PasswordChecklist from "react-password-checklist";

function Register() {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const emailRef = useRef();
    const errRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState("");
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [errMsg, setErrMsg] = useState(""); // error message to display
    const [succes, setSucces] = useState(false); // true if form is valid

    const navigate = useNavigate();

    // check if email is valid
    useEffect(() => {
        if (!email) {
            setValidEmail(false);
        } else if (EMAIL_REGEX.test(email)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    }, [email]);

    // check if password is valid
    useEffect(() => {
        if (!password) {
            setValidPassword(false);
        } else if (PASSWORD_REGEX.test(password)) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrMsg("");

        if (!email || !password || !firstName || !lastName) {
            setErrMsg("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (!validEmail && !validPassword) {
            setErrMsg("Please enter a valid email and password");
            setIsLoading(false);
            return;
        } else if (!validEmail) {
            setErrMsg("Please enter a valid email");
            setIsLoading(false);
            return;
        } else if (!validPassword) {
            setErrMsg("Please enter a valid password");
            setIsLoading(false);
            return;
        }

        // try {
        //     const response = await fetch("http://localhost:8080/api/register", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({firstName, lastName, email, password}),
        //     });
        //
        //     console.log(response);
        //
        //     if (response.ok == true) {
        //         setSucces(true);
        //         navigate("/login");
        //     }
        // } catch (error) {
        //     console.log(error);
        //     setErrMsg("Failed to register");
        // } finally {
        //     setIsLoading(false);
        // }

        const {success, error} = await registerService(firstName, lastName, email, password);

        if (error) {
            setErrMsg(error);
        } else if (success) {
            navigate("/login");
        }
    };

    return (
        <div className="register-all">
            <section className="register-form">
                <h1>Register</h1>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first-name">
                        <input
                            type="text"
                            placeholder="First Name"
                            id="first-name"
                            name="firstname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                        />
                    </label>
                    <br></br>
                    <label htmlFor="last-name">
                        <input
                            type="text"
                            placeholder="Last Name"
                            id="last-name"
                            name="lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                        />
                    </label>
                    <br></br>
                    <label htmlFor="email">
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            ref={emailRef}
                        />
                    </label>
                    <br></br>
                    <label htmlFor="password">
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordTouched(true);
                            }}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />

                        {passwordTouched && !validPassword && (
                            <PasswordChecklist
                                rules={["minLength", "specialChar", "number", "capital"]}
                                minLength={8}
                                value={password}
                                onChange={(isValid) => {
                                    setValidPassword(isValid);
                                }}
                            />
                        )}
                    </label>
                    <br></br>
                    <button type="submit">Register</button>
                </form>
                <p className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <br></br>
                <p>
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </section>
        </div>
    );
}

export default Register;
