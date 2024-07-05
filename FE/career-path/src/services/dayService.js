import api from "./axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getDaysService = async () => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.get("/getAllDays", {
            headers: {Authorization: `Bearer ${token}`},
        });

        return response;
    } catch (error) {
        toast.error("Eroare la aducerea zilelor");
    }
};

export const getDayByIdService = async (id) => {
    try {
        const token = sessionStorage.getItem("token");

        const response = await api.get(`/dayById/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        toast.error("Eroare la aducerea zilei");
    }
};

export const addDayService = async (newDay) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.post("/addDay", newDay, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: "Failed to add the day"};
    }
};

export const deleteDayService = async (id) => {
    try {
        const token = sessionStorage.getItem("token");

        const response = await api.delete(`/deleteDay/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        return response;
    } catch (error) {
        toast.error("Eroare la ștergerea zilei");
    }
};

export const updateDayService = async (updatedDay) => {
    try {
        const token = sessionStorage.getItem("token");

        let dayId = updatedDay.dayId;
        let dayNumber = updatedDay.dayNumber;
        let dayText = updatedDay.dayText;
        let orderDay = updatedDay.orderDay;

        const day = {dayId, dayNumber, dayText, orderDay};

        const response = await api.put(`/updateDay/${day.dayId}`, day, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
};
