import api from "./axiosConfig";

export const getUsersService = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.get('/getUsers', {headers: {Authorization: `Bearer ${token}`}});

        return response;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};

export const updateUserService = async (user) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.put(`/updateUser/${user.id}`, user, {headers: {Authorization: `Bearer ${token}`}});

        return response;
    } catch (error) {
        console.error('Error updating user', error);
        throw error;
    }
};

export const addUserService = async (firstName, lastName, email, password, roles) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.post('/addUser', {firstName, lastName, email, password, roles},  {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to add the user'};
    }
};