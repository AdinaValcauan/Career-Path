import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminMainPageWithRole from "./components/HigherOrderComponents/AdminMainPageWithRole";
import UserMainPageWithRole from "./components/HigherOrderComponents/UserMainPageWithRole";
import UserProfileWithRole from "./components/HigherOrderComponents/UserProfileWithRole";
import ManageUsersAdminWithRole from "./components/HigherOrderComponents/ManageUsersAdminWithRole";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                {/*<Route path="/login" element={<Login/>}/>*/}
                <Route path="/register" element={<Register/>}/>
                <Route path="/mainpage" element={<UserMainPageWithRole/>}/>
                <Route path="/users" element={<ManageUsersAdminWithRole/>}/>
                <Route path="/profile" element={<UserProfileWithRole/>}/>
                <Route path="/mainpageadmin" element={<AdminMainPageWithRole/>}/>

            </Routes>
        </Router>
    );
}

export default App;
