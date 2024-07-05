import api from "./axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getAllInfoService = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.get('/getAllInfo', {headers: {Authorization: `Bearer ${token}`}});

        return response;
    } catch (error) {
       toast.error("Eroare la aducerea informațiilor generale");
    }
};

export const addInfoService = async (infoText, type) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.post(
            "/addInfo",
            {
                infoText,
                type
            },
            {headers: {Authorization: `Bearer ${token}`}}
        );

        if (response.status === 200) {
            return {success: "Succes", error: null};
        }
    } catch (error) {
        return {success: false, error: "Failed to add the info"};
    }
};

export const deleteInfoService = async (infoId) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.delete(`/deleteInfo/${infoId}`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: "Failed to delete the info"};
    }
};

export const updateInfoService = async (updatedInfo) => {
    try {
        const token = sessionStorage.getItem("token");

        let infoId = updatedInfo.infoId;
        let infoText = updatedInfo.infoText;
        let type = updatedInfo.type;

        const info = {infoId, infoText, type};

        const response = await api.put(`/updateInfo/${info.infoId}`, info, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
};