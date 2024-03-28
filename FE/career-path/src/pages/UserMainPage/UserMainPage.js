import React from "react";
import "./UserMainPage.css";

import Menu from "../../components/Menu/Menu.js";
import Hero from "../../components/Hero/Hero.js";
import {MenuItemsUser} from "../../components/Menu/MenuItemsUser.js";
import Footer from "../../components/Footer/Footer.js";

function UserMainPage() {
    return (
        <div className="container">
            <Menu menuItems={MenuItemsUser}/>
            <Hero/>
            {/*<div className="content">*/}
            {/*  <h1>câteva repere</h1>*/}
            {/*  <p>Acest jurnal a fost creat pentru a-ți fi un ghid</p>*/}
            {/*</div>*/}
            <Footer/>
        </div>
    );
}

export default UserMainPage;
