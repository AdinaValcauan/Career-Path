import React from "react";
import Menu from "../../components/Menu/Menu.jsx";
import {MenuItemsUser} from "../../components/Menu/MenuItemsUser.js";
import ContactUsForm from "../../components/ContactForm/ContactForm.jsx";
import {MenuItemsAdmin} from "../../components/Menu/MenuItemsAdmin";
import Footer from "../../components/Footer/Footer";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ContactUs.css";

function ContactUsPage() {
    const userRole = sessionStorage.getItem('userRole');
    const isAdmin = userRole === 'admin';

    return (
        <div className="main-container">
            <ToastContainer/>
            <Menu menuItems={isAdmin ? MenuItemsAdmin : MenuItemsUser}/>
            <ContactUsForm/>
            <Footer/>
        </div>
    );
}

export default ContactUsPage;