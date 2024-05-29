import api from "./axiosConfig";

export const addParagraphService = async (paragraphText, dayId, order) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.post('/addParagraph', {
            paragraphText,
            dayId,
            order
        }, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to add the paragraph'};
    }
};

export const deleteParagraphService = async (paragraphId) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.delete(`/deleteParagraph/${paragraphId}`, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to delete the paragraph'};
    }
}

export const updateParagraphService = async (updatedParagraph) => {
    try {
        const token = sessionStorage.getItem('token');

        let paragraphId = updatedParagraph.paragraphId;
        let paragraphText = updatedParagraph.questionText;
        let dayId = updatedParagraph.dayId;
        let order = updatedParagraph.order;

        const paragraph = {paragraphId, paragraphText, dayId, order};

        const response = await api.put(`/updateParagraph/${paragraph.paragraphId}`, paragraph, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
}