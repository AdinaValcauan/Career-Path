import React from "react";
import "./AdminMainPage.css";

import Menu from "../../components/Menu/Menu.js";
import Hero from "../../components/Hero/Hero.js";
import Footer from "../../components/Footer/Footer.js";
import {MenuItemsAdmin} from "../../components/Menu/MenuItemsAdmin.js";

function AdminMainPage() {
    return (
        <div className="container">
            <Menu menuItems={MenuItemsAdmin}/>
            <Hero/>
            {/*<div className="content">*/}
            {/*  <h1>câteva repere</h1>*/}
            {/*  <p>Acest jurnal a fost creat pentru a-ți fi un ghid</p>*/}
            {/*</div>*/}
            <Footer/>
        </div>
    );
}

export default AdminMainPage;
