import React, {useContext, useEffect, useState} from "react";
import {getUserByIdService, updateUserService} from "../../services/userService";
import Menu from "../../components/Menu/Menu";
import {MenuItemsAdmin} from "../../components/Menu/MenuItemsAdmin";
import {MenuItemsUser} from "../../components/Menu/MenuItemsUser";
import {useEffectValidation} from "../../hooks/useEffectValidation";
import {createHandleUpdateUser} from "../../utils/createHandleUpdateUser";
import "./UserProfile.css";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const [user, setUser] = useState(null);
    const [updateFirstName, setUpdateFirstName] = useState("");
    const [updateLastName, setUpdateLastName] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");
    const [validUpdateEmail, setValidUpdateEmail] = useState(false);
    const [updatePassword, setUpdatePassword] = useState("");
    const [validUpdatePassword, setValidUpdatePassword] = useState(false);
    const [updateRoles, setUpdateRoles] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUser().then(r => console.log("User fetched"));
    }, []);

    useEffectValidation(updateEmail, EMAIL_REGEX, setValidUpdateEmail);
    useEffectValidation(updatePassword, PASSWORD_REGEX, setValidUpdatePassword);

    const fetchUser = async () => {
        const fetchedUser = await getUserByIdService();
        setUser(fetchedUser);
        setUpdateFirstName(fetchedUser.firstName || "");
        setUpdateLastName(fetchedUser.lastName || "");
        setUpdateEmail(fetchedUser.email || "");
        setUpdatePassword("");
        setUpdateRoles(fetchedUser.role.name || "");
    };

    const handleUpdateUser = createHandleUpdateUser(setErrMsg, setSuccessMsg, setIsLoading, fetchUser, updateUserService);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ToastContainer />
        <div className="profile-container">
            <div className="top">
                <Menu menuItems={user.role.name === 'admin' ? MenuItemsAdmin : MenuItemsUser}/>
            </div>

            <div className="profile-content">
                <h1 className="h1-profile">Profilul meu</h1>
                <form className="profile-form" onSubmit={() => handleUpdateUser(user.id, updateEmail, validUpdateEmail, updatePassword, validUpdatePassword, updateFirstName, updateLastName, updateRoles)}>
                    <label>
                        {/*Prenume:*/}
                        <input className="input-profile" type="text" value={updateFirstName}
                                   onChange={e => setUpdateFirstName(e.target.value)}/>
                    </label>
                    <label>
                        {/*Nume de familie:*/}
                        <input className="input-profile" type="text" value={updateLastName}
                        onChange={e => setUpdateLastName(e.target.value)}/>
                </label>
                <label>
                    {/*Email:*/}
                    <input className="input-profile" type="text" value={updateEmail}
                           onChange={e => setUpdateEmail(e.target.value)}/>
                </label>
                <label>
                    {/*Parola:*/}
                    <input className="input-profile" type="text" placeholder="Password" value={updatePassword}
                               onChange={e => setUpdatePassword(e.target.value)}/>
                    </label>
                    <label>
                        {/*Rol:*/}
                        <input className="input-profile" type="text" value={updateRoles} readOnly={true}/>
                    </label>
                    <button className="editButton" type="submit">Update</button>
                </form>
                {errMsg && <p>{errMsg}</p>}
                {successMsg && <p>{successMsg}</p>}
            </div>
        </div>
            <Footer/>

        </div>
    );
}

export default UserProfile;