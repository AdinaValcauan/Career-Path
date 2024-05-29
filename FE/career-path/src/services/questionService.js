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

export const addQuestionService = async (dayId, questionText, order) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.post('/addQuestion', {
            dayId,
            questionText,
            order
        }, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to add the question'};
    }
};

export const deleteQuestionService = async (questionId) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.delete(`/deleteQuestion/${questionId}`, {headers: {Authorization: `Bearer ${token}`}});

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

        let questionId = updatedQuestion.questionId;
        let questionText = updatedQuestion.questionText;
        let dayId = updatedQuestion.dayId;
        let order = updatedQuestion.order;

        const question = {questionId, questionText, dayId, order};

        const response = await api.put(`/updateQuestion/${question.questionId}`, question, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
}