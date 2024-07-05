import React, {useEffect, useState} from 'react';
import './ContactForm.css';
import emailjs from '@emailjs/browser';
import {getUserByIdService} from "../../services/userService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactForm() {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUser().then(r => console.log("User fetched"));
    }, []);

    const fetchUser = async () => {
        const fetchedUser = await getUserByIdService();
        setName(fetchedUser.firstName + ' ' + fetchedUser.lastName || "");
        setEmail(fetchedUser.email || "");
    };

    const sendEmail = (e) => {
        e.preventDefault();

        try {
            emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_PUBLIC_KEY);
            toast.success('Email trimis cu succes!');
        }
        catch (error) {
            toast.error('A apărut o eroare în trimitea emailului! Vă rugăm să reîncercați!');
        }
    }

    return (

        <div className="contactus-container">
            <div className="contactus-content">
                <h1 className="h1-contactus">Contactează-ne</h1>
                <form className="contactus-form" onSubmit={sendEmail}>
                    <label>
                        {/*Nume:*/}
                        <input type="text" className="input-contactus" name="name_from" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </label>
                    <label>
                        {/*Email:*/}
                        <input type="email" className="input-contactus" name="email_from" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                               required/>
                    </label>
                    <label>
                        {/*Mesaj:*/}
                        <textarea className="input-contactus" name="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required/>
                    </label>
                    <input type="submit" className="send-button" value="Trimite"/>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;