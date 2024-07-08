import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Register.css";
import {registerService} from "../../services/registerService";
import PasswordChecklist from "react-password-checklist";
import {useEffectValidation} from "../../hooks/useEffectValidation";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(props) {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
    const [showPassword, setShowPassword] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    useEffectValidation(email, EMAIL_REGEX, setValidEmail);
    useEffectValidation(password, PASSWORD_REGEX, setValidPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrMsg("");

        if (!email || !password || !firstName || !lastName) {
            setErrMsg("Completează toate câmpurile!");
            setIsLoading(false);
            return;
        }

        if (!validEmail && !validPassword) {
            setErrMsg("Introduceți un email și o parolă valide!");
            setIsLoading(false);
            return;
        } else if (!validEmail) {
            setErrMsg("Introduceți un email valid!");
            setIsLoading(false);
            return;
        } else if (!validPassword) {
            setErrMsg("Introduceți o parolă validă!");
            setIsLoading(false);
            return;
        }

        const {success, error} = await registerService(firstName, lastName, email, password);

        if (error) {
            setErrMsg(error);
        } else if (success) {
            navigate("/");
            toast.success("Contul a fost creat cu succes!");
            props.setIsRegister(false);
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="register-all">
            <section className="register-form">
                <h1 className="h1-register">Înregistrare</h1>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first-name">
                        <input
                            className="input-register"
                            type="text"
                            placeholder="Prenume"
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
                            className="input-register"
                            type="text"
                            placeholder="Nume de familie"
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
                            className="input-register"
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
                        <div className="password-wrapper">
                            <input
                                className="input-register"
                                type={showPassword ? "text" : "password"}
                                placeholder="Parola"
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
                            <button type="button" onClick={handleShowPassword} className="toggle-password-visibility">
                                {showPassword ? <i className="fa-regular fa-eye-slash"></i> :
                                    <i className="fa-regular fa-eye"></i>}
                            </button>
                        </div>
                        {validPassword ? null : <div className="password-checklist">
                            {passwordFocus && passwordTouched && !validPassword && (
                                <PasswordChecklist
                                    rules={["minLength", "specialChar", "number", "capital"]}
                                    minLength={8}
                                    value={password}
                                    onChange={(isValid) => {
                                        setValidPassword(isValid);
                                    }}
                                />
                            )}
                        </div>
                        }
                    </label>
                    <br></br>
                    <button className="register-button" type="submit">Înregistrează-te</button>
                </form>
                <br></br>
                <p className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>

            </section>
        </div>
    );
}

export default Register;
