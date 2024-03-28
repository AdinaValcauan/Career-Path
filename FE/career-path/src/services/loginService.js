import {jwtDecode} from "jwt-decode";
import api from "./axiosConfig";

export const loginService = async (userEmail, userPassword) => {
    try {
        // const response = await fetch("http://localhost:8080/api/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ userEmail, userPassword }),
        // });

        const response = await api.post('/login', {userEmail, userPassword});

        if (response.status === 200) {
            const token = await response.data;
            sessionStorage.setItem("token", token);

            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.roles;

            return {userRole, error: null};
        }
    } catch (error) {
        return {userRole: null, error: "Failed to login"};
    }
};