import React from "react";
import "./AdminMainPage.css";

import Menu from "../../components/Menu/Menu.js";
import Hero from "../../components/Hero/Hero.js";
import Footer from "../../components/Footer/Footer.js";
import {MenuItemsAdmin} from "../../components/Menu/MenuItemsAdmin.js";
import coverb from "../../assets/coverb.jpg";

function AdminMainPage() {
    return (
        <div className="main-container">
            <Menu menuItems={MenuItemsAdmin}/>
            <Hero
                hname="user-hero"
                image={coverb}
                title="Jurnal de Călătorie în carieră"
                subtitle="visează departe, planifică răbdător, acționează încrezător"
                buttonText="Find out more"
                link="/details"/>
            <Footer/>
        </div>
    );
}

export default AdminMainPage;
