import React, {useContext} from "react";
import Menu from "../../components/Menu/Menu";
import {MenuItemsAdmin} from "../../components/Menu/MenuItemsAdmin";
import {MenuItemsUser} from "../../components/Menu/MenuItemsUser";
import DiaryDays from "../../components/DiaryDays/DiaryDays";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import coverb from "../../assets/coverb.jpg";
import UserContext from "../../contexts/UserContext";

const DiaryMain = () => {
    // const user = useContext(UserContext);
    const userRole = sessionStorage.getItem('userRole');
    const isAdmin = userRole === 'admin';

    return (
        <div>
            <div className="top-diary">
                <Menu menuItems={isAdmin ? MenuItemsAdmin : MenuItemsUser}/>
                <Hero
                    hname="user-hero"
                    image={coverb}
                    title="Colțul tău de scris"
                    // subtitle="scrie-ți gândurile în fiecare zi"
                    buttonText="Start"
                    link="/diary-main"
                />
            </div>
            {/*<div className="content-part">*/}
            <DiaryDays/>
            {/*</div>*/}
            <Footer/>
        </div>
    );
};

export default DiaryMain;