import api from "./axiosConfig"

export const getAllDiaryEntries = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.get('/getAllDiaryEntrys', {headers: {Authorization: `Bearer ${token}`}});

        return response;
    } catch (error) {
        console.error('Error fetching diary entries', error);
        throw error;
    }
};

export const getDiaryEntryById = async () => {
    try{
        const token = sessionStorage.getItem('token');
        const id = sessionStorage.getItem('diaryEntryId');

        const response = await api.get(`/getDiaryEntryById/${id}`, {headers: {Authorization: `Bearer ${token}`}});

        return response.data;
    } catch (error) {
        console.error('Error fetching diary entry', error);
        throw error;
    }
};

export const addDiaryEntry = async (diaryEntry) => {
    const response = await api.post(API_URL, diaryEntry);
    return response.data;
};

export const updateDiaryEntry = async (id, diaryEntry) => {
    const response = await api.put(`${API_URL}/${id}`, diaryEntry);
    return response.data;
};

export const deleteDiaryEntry = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
};
