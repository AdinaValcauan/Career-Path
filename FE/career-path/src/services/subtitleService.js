import api from "./axiosConfig";

export const addSubtitleService = async (dayId, subtitleText, order) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.post('/addSubtitle', {
            dayId,
            subtitleText,
            order
        }, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to add the subtitle'};
    }
};

export const deleteSubtitleService = async (subtitleId) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.delete(`/deleteSubtitle/${subtitleId}`, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to delete the question'};
    }
}

export const updateSubtitleService = async (updatedSubtitle) => {
    try {
        const token = sessionStorage.getItem('token');

        let subtitleId = updatedSubtitle.subtitleId;
        let subtitleText = updatedSubtitle.subtitleText;
        let dayId = updatedSubtitle.dayId;
        let order = updatedSubtitle.order;

        const subtitle = {subtitleId, subtitleText, dayId, order};

        const response = await api.put(`/updateSubtitle/${subtitle.subtitleId}`, subtitle, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
}