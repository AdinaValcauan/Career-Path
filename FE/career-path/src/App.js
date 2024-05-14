import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AdminMainPageWithRole from "./components/HigherOrderComponents/AdminMainPageWithRole";
import UserMainPageWithRole from "./components/HigherOrderComponents/UserMainPageWithRole";
import UserProfileWithRole from "./components/HigherOrderComponents/UserProfileWithRole";
import ManageUsersAdminWithRole from "./components/HigherOrderComponents/ManageUsersAdminWithRole";
import DiaryMainWithRole from "./components/HigherOrderComponents/DiaryMainWithRole";
import DiaryDays from "./components/DiaryDays/DiaryDays";
import UserContext from "./contexts/UserContext";
import {useState} from "react";
import LoginRegister from "./views/LoginRegister/LoginRegister";

function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={user}>
        <Router>
            <Routes>
                <Route path="/" element={<LoginRegister/>}/>
                <Route path="/mainpage" element={<UserMainPageWithRole/>}/>
                <Route path="/users" element={<ManageUsersAdminWithRole/>}/>
                <Route path="/profile" element={<UserProfileWithRole/>}/>
                <Route path="/mainpageadmin" element={<AdminMainPageWithRole/>}/>
                <Route path="/diary" element={<DiaryMainWithRole/>}/>
                {/*<Route path="/diary" element={<DiaryDays/>}/>*/}

            </Routes>
        </Router>
        </UserContext.Provider>
    );
}

export default App;
