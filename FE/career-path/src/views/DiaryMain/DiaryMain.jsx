import React from "react";
import Menu from "../../components/Menu/Menu";
import {MenuItemsAdmin} from "../../components/Menu/MenuItemsAdmin";
import {MenuItemsUser} from "../../components/Menu/MenuItemsUser";
import DiaryDays from "../../components/DiaryDays/DiaryDays";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import colt_de_scris from "../../assets/colt_de_scris1.jpg";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DiaryMain = () => {
    const userRole = sessionStorage.getItem('userRole');
    const isAdmin = userRole === 'admin';

    return (
        <div>
            <ToastContainer/>
            <div className="top-diary">
                <Menu menuItems={isAdmin ? MenuItemsAdmin : MenuItemsUser}/>
                <Hero
                    hname="user-hero"
                    image={colt_de_scris}
                    title="Colțul tău de scris"
                    buttonText="Începe să scrii"
                    scrollToSelector="#day-part"
                    link="/diary-main"
                />
            </div>
            <DiaryDays id="day-part"/>
            <Footer/>
        </div>
    );
};

export default DiaryMain;