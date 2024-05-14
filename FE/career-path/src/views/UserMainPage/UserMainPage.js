import React from "react";
import "./UserMainPage.css";

import Menu from "../../components/Menu/Menu.js";
import Hero from "../../components/Hero/Hero.js";
import {MenuItemsUser} from "../../components/Menu/MenuItemsUser.js";
import Footer from "../../components/Footer/Footer.js";

import coverb from "../../assets/coverb.jpg";

function UserMainPage() {
    return (
        <div className="main-container">
            <Menu menuItems={MenuItemsUser}/>
            <Hero
            hname="user-hero"
            image={coverb}
            title="Jurnal de Călătorie în carieră"
            subtitle="visează departe, planifică răbdător, acționează încrezător"
            buttonText="Find out more"
            link="/details"
            />
            {/*<div className="content">*/}
            {/*  <h1>câteva repere</h1>*/}
            {/*  <p>Acest jurnal a fost creat pentru a-ți fi un ghid</p>*/}
            {/*</div>*/}
            <Footer/>
        </div>
    );
}

export default UserMainPage;
