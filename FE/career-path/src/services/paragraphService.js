import api from "./axiosConfig";

export const addParagraphService = async (paragraphText, orderForm, dayId) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.post('/addParagraph', {
            paragraphText,
            orderForm,
            dayId
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
        let paragraphText = updatedParagraph.paragraphText;
        let dayId = updatedParagraph.dayId;
        let orderForm = updatedParagraph.orderForm;

        const paragraph = {paragraphId, paragraphText, dayId, orderForm};

        console.log(paragraph);
        const response = await api.put(`/updateParagraph/${paragraph.paragraphId}`, paragraph, {headers: {Authorization: `Bearer ${token}`}});

        console.log(response);
        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
}

export const getParagraphsByDayService = async (dayId) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.get(`/getParagraphsByDay/${dayId}`, {headers: {Authorization: `Bearer ${token}`}});
        return response;
    } catch (error) {
        console.error('Error fetching paragraphs', error);
        throw error;
    }
}