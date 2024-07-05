import api from "./axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const addAnswerService = async (answerText, questionId, userId) => {
    try {
        const token = sessionStorage.getItem("token");

        const response = await api.post(
            "/addAnswer",
            {
                answerText,
                questionId,
                userId,
            },
            {headers: {Authorization: `Bearer ${token}`}}
        );

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: "Failed to add the answer"};
    }
};

export const deleteAnswerService = async (answerId) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.delete(`/deleteAnswer/${answerId}`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        return {success: false, error: "Failed to delete the answer"};
    }
};

export const updateAnswerService = async (updatedAnswer) => {
    try {
        const token = sessionStorage.getItem("token");

        let answerId = updatedAnswer.answerId;
        let answerText = updatedAnswer.answerText;
        let questionId = updatedAnswer.questionId;
        let userId = updatedAnswer.userId;

        const answer = {answerId, answerText, questionId, userId};

        const response = await api.put(`/updateAnswer/${answer.answerId}`, answer, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
};

export const getAnswersByQuestionAndUserService = async (
    questionId,
    userId
) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.get(
            `/getAnswerByQuestionAndUser/${questionId}/${userId}`,
            {headers: {Authorization: `Bearer ${token}`}}
        );
        return response;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return {data: []};
        } else {
           toast.error("Eroare la aducerea raspunsurilor");
        }
    }
};
