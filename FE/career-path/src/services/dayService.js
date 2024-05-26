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

// export const getDayByIdService = async () => {
//     try {
//         const token = sessionStorage.getItem('token');
//
//
//         const response = await api.get(`/getDayById/${id}`, {headers: {Authorization: `Bearer ${token}`}});
//
//         console.log(response);
//         return response;
//     } catch (error) {
//         console.error('Error fetching the day', error);
//         throw error;
//     }
// };

export const addDayService = async (dayNumber, dayText) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.post('/addDay', {
            dayNumber,
            dayText
        }, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to add the day'};
    }
};

export const deleteDayService = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const id = sessionStorage.getItem('dayId');

        const response = await api.delete(`/deleteDay/${id}`, {headers: {Authorization: `Bearer ${token}`}});

        return response.data;
    } catch (error) {
        console.error('Error deleting the day', error);
        throw error;
    }
};

export const updateDayService = async (updatedDay) => {
    try {
        const token = sessionStorage.getItem('token');

        let dayId = updatedDay.dayId;
        let dayNumber = updatedDay.dayNumber;
        let dayText = updatedDay.dayText;

        const day = {dayId, dayNumber, dayText};

        const response = await api.put(`/updateDay/${day.dayId}`, day, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
}