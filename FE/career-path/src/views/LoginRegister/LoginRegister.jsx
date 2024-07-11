import React, {useState} from 'react';
import './LoginRegister.css';
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginRegister() {
    const [isRegister, setIsRegister] = useState(false);

    const switchForm = async (register) => {
        await new Promise(resolve => setTimeout(resolve, 250));
        setIsRegister(register);
    }

    return (
        <div>
            <ToastContainer/>
            <div className={`lr-container ${isRegister ? '' : 'lr-container-reverse'}`}>
                <div className={`image ${isRegister ? 'image-move-right' : 'image-move-left'}`}>
                </div>
                {isRegister ? (
                    <div className="register-form">
                        <div className="inside-form">
                            <Register setIsRegister={setIsRegister}/>
                            <div className="footer-register">
                                <p className="login-text">
                                    Ai deja un cont?
                                </p>
                                <button className="switch-button" onClick={() => switchForm(false)}>Autentificare
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="login-form">
                        <div className="inside-form">
                            <Login/>
                            <div className="login-text">
                                <br></br>
                                <p>
                                    Nu ai un cont?
                                </p>
                                <button className="switch-button" onClick={() => switchForm(true)}>Înregistrare</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginRegister;