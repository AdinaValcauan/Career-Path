import React from "react";
import "./AdminMainPage.css";

import Menu from "../../components/Menu/Menu.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {MenuItemsAdmin} from "../../components/Menu/MenuItemsAdmin.js";
import coverb from "../../assets/coverb.jpg";
import GeneralInfoSection from "../../components/GeneralInfoSection/GeneralInfoSection";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminMainPage() {
    return (
        <div className="main-container">
            <ToastContainer/>
            <Menu menuItems={MenuItemsAdmin}/>
            <Hero
                hname="user-hero"
                image={coverb}
                title="Jurnal de Călătorie în carieră"
                subtitle="visează departe, planifică răbdător, acționează încrezător"
                buttonText="Find out more"
                link="/details"/>
            <GeneralInfoSection/>
            <Footer/>
        </div>
    );
}

export default AdminMainPage;
