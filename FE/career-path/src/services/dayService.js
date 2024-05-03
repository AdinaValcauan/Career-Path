import api from "./axiosConfig";

export const getDaysService = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.get('/getAllDays', {headers: {Authorization: `Bearer ${token}`}});

        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching days', error);
        throw error;
    }
};

export const getDayByIdService = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const id = sessionStorage.getItem('userId');

        const response = await api.get(`/getDayById/${id}`, {headers: {Authorization: `Bearer ${token}`}});

        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching the day', error);
        throw error;
    }
}