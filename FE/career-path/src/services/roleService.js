import api from "./axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getRolesService = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.get('/getRoles', {headers: {Authorization: `Bearer ${token}`}});
console.log(response.data);
        return response;
    } catch (error) {
        toast.error("Eroare la aducerea rolurilor");
    }
};