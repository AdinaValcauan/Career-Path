import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserMainPage from "./pages/UserMainPage/UserMainPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import AdminMainPage from "./pages/AdminMainPage/AdminMainPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminMainPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/mainpage" element={<UserMainPage/>}/>
                <Route path="/profile" element={<UserProfile/>}/>
                <Route path="/mainpageadmin" element={<AdminMainPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
