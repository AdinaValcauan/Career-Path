import api from "./axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getQuestionsByDayService = async (dayId) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.get(`/getQuestionsByDay/${dayId}`, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response;
    } catch (error) {
        toast.error("Eroare la aducerea întrebărilor");
    }
};

export const addQuestionService = async (questionText, dayId, orderForm) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.post(
            "/addQuestion",
            {
                questionText,
                dayId,
                orderForm,
            },
            {headers: {Authorization: `Bearer ${token}`}}
        );

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: "Failed to add the question"};
    }
};

export const deleteQuestionService = async (questionId) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await api.delete(`/deleteQuestion/${questionId}`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: "Failed to delete the title"};
    }
};

export const updateQuestionService = async (updatedQuestion) => {
    try {
        const token = sessionStorage.getItem("token");

        let questionId = updatedQuestion.questionId;
        let questionText = updatedQuestion.questionText;
        let dayId = updatedQuestion.dayId;
        let orderForm = updatedQuestion.orderForm;

        const question = {questionId, questionText, dayId, orderForm};

        const response = await api.put(
            `/updateQuestion/${question.questionId}`,
            question,
            {headers: {Authorization: `Bearer ${token}`}}
        );

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        toast.error("Eroare la modificarea întrebării");
    }
};
