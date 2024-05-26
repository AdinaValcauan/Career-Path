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

export const updateUserService = async (updatedUser) => {
    try {
        const token = sessionStorage.getItem('token');

        let id = updatedUser.id;
        let firstName = updatedUser.updateFirstName;
        let lastName = updatedUser.updateLastName;
        let email = updatedUser.updateEmail;
        let password = updatedUser.updatePassword
        let roles = updatedUser.updateRoles;

        const user = {id, firstName, lastName, email, password, roles};

        const response = await api.put(`/updateUser/${user.id}`, user, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        throw error;
    }
};

export const addUserService = async (firstName, lastName, email, password, roles) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.post('/addUser', {
            firstName,
            lastName,
            email,
            password,
            roles
        }, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to add the user'};
    }
};

export const deleteUserService = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await api.delete(`/deleteUser/${id}`, {headers: {Authorization: `Bearer ${token}`}});

        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        return {success: false, error: 'Failed to delete the user'};
    }
};

export const getUserByIdService = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const id = sessionStorage.getItem('userId');

        const response = await api.get(`/getUserById/${id}`, {headers: {Authorization: `Bearer ${token}`}});

        return response.data;
    } catch (error) {
        console.error('Error fetching user', error);
        throw error;
    }
};
