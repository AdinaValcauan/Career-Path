import React from "react";
import "./UserMainPage.css";

import Menu from "../../components/Menu/Menu.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import {MenuItemsUser} from "../../components/Menu/MenuItemsUser.js";
import Footer from "../../components/Footer/Footer.jsx";

import coverb from "../../assets/coverb.jpg";
import GeneralInfoSection from "../../components/GeneralInfoSection/GeneralInfoSection";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserMainPage() {
    return (
        <div className="main-container">
            <ToastContainer/>
            <Menu menuItems={MenuItemsUser}/>
            <Hero
                hname="user-hero"
                image={coverb}
                title="Jurnal de Călătorie în carieră"
                subtitle="visează departe, planifică răbdător, acționează încrezător"
                buttonText="Find out more"
                link="/details"
            />
            <GeneralInfoSection/>
            <Footer/>
        </div>
    );
}

export default UserMainPage;
