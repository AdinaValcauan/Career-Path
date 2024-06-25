import api from "./axiosConfig";

export const getRolesService = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.get('/getRoles', {headers: {Authorization: `Bearer ${token}`}});

        return response;
    } catch (error) {
        console.error('Error fetching roles', error);
        throw error;
    }
};