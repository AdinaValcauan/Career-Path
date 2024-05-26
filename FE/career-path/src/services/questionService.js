import api from "./axiosConfig";

export const getQuestionsByDayService = async (dayId) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.get(`/getQuestionsByDay/${dayId}`, {headers: {Authorization: `Bearer ${token}`}});

        return response;
    } catch (error) {
        console.error('Error fetching questions', error);
        throw error;
    }
}

export const addQuestionService = async (dayId, questionText) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.post('/addQuestion', {
            dayId,
            questionText
        }, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to add the question'};
    }
};

export const deleteQuestionService = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.delete(`/deleteQuestion/${id}`, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to delete the question'};
    }
}

export const updateQuestionService = async (updatedQuestion) => {
    try {
        const token = sessionStorage.getItem('token');

        let questionId = updatedQuestion.id;
        let questionText = updatedQuestion.questionText;
        let dayId = updatedQuestion.dayId;

        const question = {questionId, questionText, dayId};

        const response = await api.put(`/updateQuestion/${question.questionId}`, question, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
}