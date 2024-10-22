import api from "./axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const addParagraphService = async (paragraphText, orderForm, dayId) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.post(
            "/addParagraph",
            {
                paragraphText,
                orderForm,
                dayId,
            },
            {headers: {Authorization: `Bearer ${token}`}}
        );

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: "Failed to add the paragraph"};
    }
};

export const deleteParagraphService = async (paragraphId) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.delete(`/deleteParagraph/${paragraphId}`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: "Failed to delete the title"};
    }
};

export const updateParagraphService = async (updatedParagraph) => {
    try {
        const token = sessionStorage.getItem("token");

        let paragraphId = updatedParagraph.paragraphId;
        let paragraphText = updatedParagraph.paragraphText;
        let dayId = updatedParagraph.dayId;
        let orderForm = updatedParagraph.orderForm;

        const paragraph = {paragraphId, paragraphText, dayId, orderForm};

        const response = await api.put(
            `/updateParagraph/${paragraph.paragraphId}`,
            paragraph,
            {headers: {Authorization: `Bearer ${token}`}}
        );

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
};

export const getParagraphsByDayService = async (dayId) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.get(`/getParagraphsByDay/${dayId}`, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response;
    } catch (error) {
       toast.error("Eroare la aducerea paragrafelor");
    }
};
